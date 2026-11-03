/**
 * Butoane „trase de mână”: fiecare buton primește un fundal cu contur ușor neregulat și o linie
 * de cerneală care îl înconjoară, cu capetele suprapuse, în stilul ornamentelor din secțiuni.
 * Forma se calculează pentru dimensiunea reală a butonului, deci nu se deformează.
 * Fără JavaScript, butoanele rămân pastilele obișnuite.
 */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PAD = 14;
const HARMONICS = [2, 3, 5];
const WEIGHTS = [0.55, 0.3, 0.15];

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

type Phases = number[];
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

/** Abatere lină și periodică de la contur; t ∈ [0, 1] parcurge o dată conturul. */
function wave(t: number, phases: Phases) {
  return HARMONICS.reduce((sum, harmonic, i) => sum + WEIGHTS[i] * Math.sin(2 * Math.PI * harmonic * t + phases[i]), 0);
}

/** Punct pe conturul unei pastile w × h și normala spre exterior; pornește din stânga-sus, în sensul acelor de ceasornic. */
function stadium(w: number, h: number, t: number) {
  const r = h / 2;
  const straight = Math.max(w - h, 0);
  const arc = Math.PI * r;
  let s = (((t % 1) + 1) % 1) * (2 * straight + 2 * arc);

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

/** Curbă netedă (Catmull-Rom) prin puncte. */
function smoothPath(points: Point[], closed: boolean) {
  const n = points.length;
  const at = (i: number) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${format(points[0])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${format(c1)} ${format(c2)} ${format(p2)}`;
  }
  return closed ? `${d}Z` : d;
}

function samples(w: number, h: number) {
  const perimeter = 2 * Math.max(w - h, 0) + Math.PI * h;
  return Math.max(16, Math.min(48, Math.round(perimeter / 14)));
}

interface Shape {
  fill: Phases;
  ink: Phases;
}

/** Fundalul: o pastilă închisă, cu marginea ușor ondulată. */
function fillPath(w: number, h: number, rest: Phases, hover: Phases, mix: number) {
  const count = samples(w, h);
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const p = stadium(w, h, t);
    const offset = 1.6 * (wave(t, rest) * (1 - mix) + wave(t, hover) * mix);
    points.push([p.x + p.nx * offset, p.y + p.ny * offset]);
  }
  return smoothPath(points, true);
}

/** Linia de cerneală: puțin în afara butonului, ocolește o dată și puțin peste, ca trasă dintr-o mișcare. */
function inkPath(w: number, h: number, rest: Phases, hover: Phases, mix: number) {
  const overshoot = 1.07;
  const count = Math.round(samples(w, h) * overshoot) + 1;
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const progress = i / (count - 1);
    const t = 0.03 + overshoot * progress;
    const p = stadium(w, h, t);
    const offset = 5 + 2.2 * (wave(t, rest) * (1 - mix) + wave(t, hover) * mix) + 3 * (progress - 0.5);
    points.push([p.x + p.nx * offset, p.y + p.ny * offset]);
  }
  return smoothPath(points, false);
}

function enhance(button: HTMLElement, index: number) {
  const random = seededRandom(hash(button.textContent ?? '') + index);
  const phases = () => HARMONICS.map(() => random() * Math.PI * 2);
  const rest: Shape = { fill: phases(), ink: phases() };
  const hover: Shape = { fill: phases(), ink: phases() };

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.classList.add('btn-ink');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const fill = document.createElementNS(SVG_NS, 'path');
  fill.classList.add('btn-ink-fill');
  const line = document.createElementNS(SVG_NS, 'path');
  line.classList.add('btn-ink-line');
  line.setAttribute('pathLength', '1');
  svg.append(fill, line);
  button.prepend(svg);
  button.classList.add('has-ink');

  let width = 0;
  let height = 0;
  let mix = 0;
  let frame = 0;

  const render = () => {
    if (!width || !height) return;
    fill.setAttribute('d', fillPath(width, height, rest.fill, hover.fill, mix));
    line.setAttribute('d', inkPath(width, height, rest.ink, hover.ink, mix));
  };

  new ResizeObserver(() => {
    width = button.offsetWidth;
    height = button.offsetHeight;
    svg.setAttribute('viewBox', `${-PAD} ${-PAD} ${width + PAD * 2} ${height + PAD * 2}`);
    render();
  }).observe(button);

  // La hover forma „respiră” spre o altă variantă trasă de mână, apoi revine.
  const morphTo = (target: number) => {
    cancelAnimationFrame(frame);
    if (reducedMotion.matches) {
      mix = target;
      render();
      return;
    }
    const from = mix;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 600);
      mix = from + (target - from) * (1 - Math.pow(1 - progress, 3));
      render();
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
  };

  const redraw = () => {
    if (reducedMotion.matches || !button.classList.contains('is-drawn')) return;
    line.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], {
      duration: 750,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
  };

  const enter = () => {
    morphTo(1);
    redraw();
  };

  button.addEventListener('pointerenter', (event) => event.pointerType === 'mouse' && enter());
  button.addEventListener('pointerleave', (event) => event.pointerType === 'mouse' && morphTo(0));
  button.addEventListener('focus', () => button.matches(':focus-visible') && enter());
  button.addEventListener('blur', () => morphTo(0));
}

export function enhanceButtons() {
  const buttons = document.querySelectorAll<HTMLElement>('.btn:not(.btn-quiet)');

  // Linia se desenează o singură dată, când butonul apare pe ecran.
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-drawn');
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );

  buttons.forEach((button, index) => {
    enhance(button, index);
    observer.observe(button);
  });
}
