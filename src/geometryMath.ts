export type Point = { x: number; y: number };
export function geometryOf(p: Point, q: Point) {
  const dx = q.x - p.x, dy = q.y - p.y;
  const coincident = dx === 0 && dy === 0;
  const vertical = !coincident && dx === 0;
  const slope = coincident || vertical ? null : dy / dx;
  return { distance: Math.hypot(dx, dy), midpoint: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }, coincident, vertical, slope, intercept: slope === null ? null : p.y - slope * p.x };
}
