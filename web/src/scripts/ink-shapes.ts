/**
 * Forme „trase de mână”: contururi cu margini ondulate care curg încet, desenate în SVG
 * pentru dimensiunea reală a elementului (deci nu se deformează).
 *
 * - Butoanele (.btn) primesc un fundal ondulat; la hover undele se netezesc până la pastila obișnuită.
 * - Elementele cu data-ink-shape="line" sau "fill" primesc un contur, respectiv o pată plină.
 *   Un eveniment „ink:ripple” trimis elementului le agită scurt, apoi se liniștesc.
 *
 * Fără JavaScript, elementele își păstrează aspectul din CSS.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PAD = 14;
const STEP = 7;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

type Point = [number, number];

interface Motion {
  /** Amplitudinea undelor, în px. */
  amplitude: number;
  /** Viteza cu care curg undele, în radiani pe secundă. */
  speed: number;
}

interface ShapeKind {
  svgClass: string;
  pathClass: string;
  rest: Motion;
  /** Starea de hover, doar pentru butoane. */
  hover?: Motion;
  /** Amplitudinea de la apariție și de la „ripple”, din care forma se liniștește. */
  entry: number;
  /** Lungimile de undă (px) ale celor două valuri care se suprapun. */
  waves: [number, number];
  /** Cât de neregulată e forma de bază (o singură umflătură pe tot conturul). */
  irregularity: number;
}

const BUTTON: ShapeKind = {
  svgClass: 'btn-ink',
  pathClass: 'btn-ink-fill',
  rest: { amplitude: 2.1, speed: 0.7 },
  // La hover undele dispar: butonul revine lin la pastila obișnuită.
  hover: { amplitude: 0, speed: 0.7 },
  entry: 5.5,
  waves: [95, 48],
  irregularity: 0.35,
};

const KINDS: Record<string, ShapeKind> = {
  line: {
    svgClass: 'ink-shape',
    pathClass: 'ink-shape-line',
    rest: { amplitude: 2.2, speed: 0.5 },
    entry: 7,
    waves: [110, 55],
    irregularity: 0.6,
  },
  fill: {
    svgClass: 'ink-shape',
    pathClass: 'ink-shape-fill',
    rest: { amplitude: 3, speed: 0.4 },
    entry: 8,
    waves: [150, 70],
    irregularity: 2.2,
  },
};

function seededRandom(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Punct pe conturul unei pastile w × h (un cerc când w = h), la distanța s, cu normala spre exterior. */
function stadium(w: number, h: number, s: number) {
  const r = h / 2;
  const straight = Math.max(w - h, 0);
  const arc = Math.PI * r;

  if (s < straight) return { x: r + s, y: 0, nx: 0, ny: -1 };
  s -= straight;
  if (s < arc) {
    const a = -Math.PI / 2 + s / r;
    return { x: w - r + r * Math.cos(a), y: r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
  }
  s -= arc;
  if (s < straight) return { x: w - r - s, y: h, nx: 0, ny: 1 };
  s -= straight;
  const a = Math.PI / 2 + s / r;
  return { x: r + r * Math.cos(a), y: r + r * Math.sin(a), nx: Math.cos(a), ny: Math.sin(a) };
}

const format = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Curbă închisă și netedă (Catmull-Rom) prin puncte. */
function smoothClosedPath(points: Point[]) {
  const n = points.length;
  const at = (i: number) => points[(i + n) % n];
  let d = `M${format(points[0])}`;
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${format(c1)} ${format(c2)} ${format(p2)}`;
  }
  return `${d}Z`;
}

class InkShape {
  readonly element: HTMLElement;
  private readonly kind: ShapeKind;
  private readonly path: SVGPathElement;
  private readonly svg: SVGSVGElement;
  private readonly phases: number[];
  private width = 0;
  private height = 0;
  private time = 0;
  private amplitude: number;
  private speed: number;
  private target: Motion;
  private entering = true;
  visible = false;

  constructor(element: HTMLElement, kind: ShapeKind, index: number) {
    this.element = element;
    this.kind = kind;
    this.target = kind.rest;
    this.speed = kind.rest.speed;
    this.amplitude = reducedMotion.matches ? kind.rest.amplitude : kind.entry;

    const random = seededRandom(hash(element.textContent ?? '') + index);
    this.phases = [random(), random(), random()].map((value) => value * Math.PI * 2);

    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.classList.add(kind.svgClass);
    this.svg.setAttribute('aria-hidden', 'true');
    this.svg.setAttribute('focusable', 'false');
    this.path = document.createElementNS(SVG_NS, 'path');
    this.path.classList.add(kind.pathClass);
    this.svg.append(this.path);
    element.prepend(this.svg);
    element.classList.add('has-ink');

    if (kind.hover) {
      element.addEventListener('pointerenter', (event) => event.pointerType === 'mouse' && this.setHover(true));
      element.addEventListener('pointerleave', (event) => event.pointerType === 'mouse' && this.setHover(false));
      element.addEventListener('focus', () => element.matches(':focus-visible') && this.setHover(true));
      element.addEventListener('blur', () => this.setHover(false));
    }

    element.addEventListener('ink:ripple', () => {
      if (reducedMotion.matches) return;
      this.amplitude = kind.entry;
      this.entering = true;
    });
  }

  resize() {
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;
    this.svg.setAttribute('viewBox', `${-PAD} ${-PAD} ${this.width + PAD * 2} ${this.height + PAD * 2}`);
    this.render();
  }

  private setHover(active: boolean) {
    this.target = active && this.kind.hover ? this.kind.hover : this.kind.rest;
    this.entering = false;
    if (reducedMotion.matches) {
      this.amplitude = this.target.amplitude;
      this.render();
    }
  }

  /** Avansează animația cu dt secunde: undele curg, iar amplitudinea și viteza tind lin spre starea dorită. */
  tick(dt: number) {
    // La apariție forma se liniștește încet; trecerile de hover sunt rapide.
    if (this.entering && this.amplitude < this.target.amplitude + 0.2) this.entering = false;
    const duration = this.target === this.kind.hover ? 0.05 : this.entering ? 0.45 : 0.09;
    const ease = 1 - Math.exp(-dt / duration);
    this.amplitude += (this.target.amplitude - this.amplitude) * ease;
    this.speed += (this.target.speed - this.speed) * ease;
    this.time += dt * this.speed;
    this.render();
  }

  private render() {
    const { width: w, height: h } = this;
    if (!w || !h) return;

    const perimeter = 2 * Math.max(w - h, 0) + Math.PI * h;
    const count = Math.max(24, Math.round(perimeter / STEP));
    // Lungimile de undă se aleg astfel încât conturul să se închidă fără ruptură.
    const long = Math.max(2, Math.round(perimeter / this.kind.waves[0]));
    const short = Math.max(3, Math.round(perimeter / this.kind.waves[1]));
    const [p0, p1, p2] = this.phases;

    const points: Point[] = [];
    for (let i = 0; i < count; i++) {
      const s = (i / count) * perimeter;
      const u = (i / count) * Math.PI * 2;
      const p = stadium(w, h, s);
      const wave =
        0.62 * Math.sin(long * u + p0 + this.time) +
        0.38 * Math.sin(short * u + p1 - this.time * 0.8) +
        this.kind.irregularity * Math.sin(u + p2 + this.time * 0.15);
      const offset = this.amplitude * wave;
      points.push([p.x + p.nx * offset, p.y + p.ny * offset]);
    }
    this.path.setAttribute('d', smoothClosedPath(points));
  }
}

export function enhanceInkShapes() {
  const shapes = [
    ...[...document.querySelectorAll<HTMLElement>('.btn:not(.btn-quiet)')].map((element) => ({ element, kind: BUTTON })),
    ...[...document.querySelectorAll<HTMLElement>('[data-ink-shape]')]
      .map((element) => ({ element, kind: KINDS[element.dataset.inkShape ?? ''] }))
      .filter((shape) => shape.kind),
  ].map(({ element, kind }, index) => new InkShape(element, kind, index));

  const byElement = new Map(shapes.map((shape) => [shape.element, shape]));

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) byElement.get(entry.target as HTMLElement)?.resize();
  });

  // Animăm doar formele vizibile; cele din afara ecranului stau pe loc.
  const visibility = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const shape = byElement.get(entry.target as HTMLElement);
      if (shape) shape.visible = entry.isIntersecting;
    }
    start();
  });

  shapes.forEach((shape) => {
    resizeObserver.observe(shape.element);
    visibility.observe(shape.element);
  });

  let frame = 0;
  let last = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const active = shapes.filter((shape) => shape.visible);
    active.forEach((shape) => shape.tick(dt));
    frame = active.length ? requestAnimationFrame(loop) : 0;
  };

  function start() {
    if (frame || reducedMotion.matches || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(loop);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else {
      start();
    }
  });
}
