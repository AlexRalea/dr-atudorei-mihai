/**
 * Un mănunchi de linii ondulate care curg împreună, ca liniile palmei sau ale unei amprente.
 * Liniile se strâng și se depărtează de-a lungul lățimii; `time` (în secunde) le face să curgă încet.
 */

type Point = [number, number];

const format = ([x, y]: Point) => `${x.toFixed(1)} ${y.toFixed(1)}`;

/** Curbă deschisă și netedă (Catmull-Rom) prin puncte. */
function smoothPath(points: Point[]) {
  const n = points.length;
  const at = (i: number) => points[Math.max(0, Math.min(n - 1, i))];
  let d = `M${format(points[0])}`;
  for (let i = 0; i < n - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${format(c1)} ${format(c2)} ${format(p2)}`;
  }
  return d;
}

export function flowLinePath(index: number, count: number, width: number, height: number, time = 0) {
  const step = 24;
  const gap = height * 0.085;
  const offset = (index - (count - 1) / 2) * gap;
  const points: Point[] = [];

  for (let x = -24; x <= width + 24; x += step) {
    const u = x / width;
    // Mijlocul mănunchiului urcă ușor spre dreapta și se unduiește lent.
    const center = height * (0.62 - 0.22 * u) + height * 0.12 * Math.sin(Math.PI * 2 * u * 0.8 + time * 0.22);
    // Liniile se strâng și se depărtează, ca pliurile palmei.
    const squeeze = 0.45 + 0.55 * Math.abs(Math.sin(Math.PI * u + 0.6 + time * 0.08));
    // Fiecare linie are propria unduire mică, ca trasă de mână.
    const ripple = 4 * Math.sin(Math.PI * 2 * u * 2.6 + index * 0.7 + time * 0.55);
    points.push([x, center + offset * squeeze + ripple]);
  }

  return smoothPath(points);
}
