/**
 * Butoane „trase de mână”: forma butonului e desenată ca liniile ondulate din secțiuni.
 * Marginile sunt unde line care curg încet; la apariție forma se liniștește din unde mai mari,
 * iar la hover undele cresc și se mișcă mai repede. Forma se calculează pentru dimensiunea
 * reală a butonului, deci nu se deformează. Fără JavaScript, butoanele rămân pastile obișnuite.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PAD = 14;
const STEP = 7;

/** Amplitudinea undelor (px) și viteza cu care curg (radiani pe secundă). */
const REST = { amplitude: 2.1, speed: 0.7 };
const HOVER = { amplitude: 3.4, speed: 2.6 };
const ENTRY_AMPLITUDE = 5.5;

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

type Point = [number, number];

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

/** Punct pe conturul unei pastile w × h, la distanța s de-a lungul conturului, cu normala spre exterior. */
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

class InkButton {
  readonly button: HTMLElement;
  private readonly path: SVGPathElement;
  private readonly svg: SVGSVGElement;
  private readonly phases: number[];
  private width = 0;
  private height = 0;
  private time = 0;
  private amplitude = ENTRY_AMPLITUDE;
  private speed = REST.speed;
  private target = REST;
  visible = false;

  constructor(button: HTMLElement, index: number) {
    this.button = button;
    const random = seededRandom(hash(button.textContent ?? '') + index);
    this.phases = [random(), random(), random()].map((value) => value * Math.PI * 2);

    this.svg = document.createElementNS(SVG_NS, 'svg');
    this.svg.classList.add('btn-ink');
    this.svg.setAttribute('aria-hidden', 'true');
    this.svg.setAttribute('focusable', 'false');
    this.path = document.createElementNS(SVG_NS, 'path');
    this.path.classList.add('btn-ink-fill');
    this.svg.append(this.path);
    button.prepend(this.svg);
    button.classList.add('has-ink');

    if (reducedMotion.matches) this.amplitude = REST.amplitude;

    button.addEventListener('pointerenter', (event) => event.pointerType === 'mouse' && this.setHover(true));
    button.addEventListener('pointerleave', (event) => event.pointerType === 'mouse' && this.setHover(false));
    button.addEventListener('focus', () => button.matches(':focus-visible') && this.setHover(true));
    button.addEventListener('blur', () => this.setHover(false));
  }

  resize() {
    this.width = this.button.offsetWidth;
    this.height = this.button.offsetHeight;
    this.svg.setAttribute('viewBox', `${-PAD} ${-PAD} ${this.width + PAD * 2} ${this.height + PAD * 2}`);
    this.render();
  }

  setHover(active: boolean) {
    this.target = active ? HOVER : REST;
    if (reducedMotion.matches) {
      this.amplitude = this.target.amplitude;
      this.render();
    }
  }

  /** Avansează animația cu dt secunde: undele curg, iar amplitudinea și viteza tind lin spre starea dorită. */
  tick(dt: number) {
    const ease = 1 - Math.exp(-dt / (this.amplitude > this.target.amplitude + 0.5 ? 0.45 : 0.22));
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
    const long = Math.max(2, Math.round(perimeter / 95));
    const short = Math.max(3, Math.round(perimeter / 48));
    const [p0, p1, p2] = this.phases;

    const points: Point[] = [];
    for (let i = 0; i < count; i++) {
      const s = (i / count) * perimeter;
      const u = (i / count) * Math.PI * 2;
      const p = stadium(w, h, s);
      const wave =
        0.62 * Math.sin(long * u + p0 + this.time) +
        0.38 * Math.sin(short * u + p1 - this.time * 0.8) +
        0.35 * Math.sin(u + p2);
      const offset = this.amplitude * wave;
      points.push([p.x + p.nx * offset, p.y + p.ny * offset]);
    }
    this.path.setAttribute('d', smoothClosedPath(points));
  }
}

export function enhanceButtons() {
  const buttons = [...document.querySelectorAll<HTMLElement>('.btn:not(.btn-quiet)')].map(
    (button, index) => new InkButton(button, index),
  );
  const byElement = new Map(buttons.map((ink) => [ink.button, ink]));

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) byElement.get(entry.target as HTMLElement)?.resize();
  });

  // Animăm doar butoanele vizibile; cele din afara ecranului stau pe loc.
  const visibility = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const ink = byElement.get(entry.target as HTMLElement);
      if (ink) ink.visible = entry.isIntersecting;
    }
    start();
  });

  buttons.forEach((ink) => {
    resizeObserver.observe(ink.button);
    visibility.observe(ink.button);
  });

  let frame = 0;
  let last = 0;
  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const active = buttons.filter((ink) => ink.visible);
    active.forEach((ink) => ink.tick(dt));
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
