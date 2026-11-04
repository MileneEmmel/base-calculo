export type Point = { x: number; y: number };

export const originPoint: Point = { x: 0, y: 0 };

export type PointDrag = { anchor: Point; cursor: Point; last: Point; previousCursor: Point; shift: boolean; axis: keyof Point | null };

export function startPointDrag(point: Point, cursor: Point, shift: boolean): PointDrag {
  return { anchor: point, cursor, last: point, previousCursor: cursor, shift, axis: null };
}

export function movePointDrag(drag: PointDrag, cursor: Point, shift: boolean, unitsPerPixel: Point, constrain: (point: Point) => Point): PointDrag {
  const next = shift === drag.shift ? { ...drag } : startPointDrag(drag.last, drag.previousCursor, shift);
  const dx = cursor.x - next.cursor.x, dy = cursor.y - next.cursor.y;
  if (shift && !next.axis) {
    if (Math.hypot(dx, dy) < 3) return { ...next, previousCursor: cursor };
    next.axis = Math.abs(dx) >= Math.abs(dy) ? "x" : "y";
  }
  return { ...next, previousCursor: cursor, last: constrain({
    x: next.anchor.x + (next.axis === "y" ? 0 : dx * unitsPerPixel.x),
    y: next.anchor.y - (next.axis === "x" ? 0 : dy * unitsPerPixel.y),
  }) };
}

export function vectorMeasurement({ x, y }: Point) {
  const magnitude = Math.hypot(x, y);
  const angle = Math.atan2(y, x) * 180 / Math.PI;
  return { magnitude, inclination: magnitude === 0 ? null : angle < 0 ? angle + 360 : angle };
}

export function vectorOperations(u: Point, v: Point, scalar: number) {
  return {
    sum: { x: u.x + v.x, y: u.y + v.y },
    scaled: { x: scalar * u.x, y: scalar * u.y },
    dot: u.x * v.x + u.y * v.y,
    determinant: u.x * v.y - u.y * v.x,
    lengths: [Math.hypot(u.x, u.y), Math.hypot(v.x, v.y)],
  };
}

export function circleGeometry(center: Point, edge: Point) {
  const radius = Math.hypot(edge.x - center.x, edge.y - center.y);
  return {
    vertices: [center, edge], radius, area: Math.PI * radius ** 2, perimeter: 2 * Math.PI * radius,
    extent: [{ x: center.x - radius, y: center.y - radius }, { x: center.x + radius, y: center.y + radius }],
  };
}

export function ellipseGeometry(center: Point, horizontal: Point, vertical: Point) {
  const radiusX = Math.abs(horizontal.x - center.x);
  const radiusY = Math.abs(vertical.y - center.y);
  const sum = radiusX + radiusY;
  const focalDistance = Math.sqrt(Math.abs(radiusX - radiusY) * sum);
  const horizontalMajor = radiusX >= radiusY;
  const foci = [-focalDistance, focalDistance].map((offset): Point => {
    return horizontalMajor ? { x: center.x + offset, y: center.y } : { x: center.x, y: center.y + offset };
  });
  const h = sum > 0 ? ((radiusX - radiusY) / sum) ** 2 : 0;
  // Ramanujan's second approximation, with the exact limit when an axis collapses.
  const perimeter = radiusX && radiusY
    ? Math.PI * sum * (1 + 3 * h / (10 + Math.sqrt(4 - 3 * h)))
    : 4 * sum;
  return {
    vertices: [center, horizontal, vertical], radius: null, radiusX, radiusY,
    foci: radiusX > 0 && radiusY > 0 ? foci : [],
    area: Math.PI * radiusX * radiusY, perimeter,
    extent: [{ x: center.x - radiusX, y: center.y - radiusY }, { x: center.x + radiusX, y: center.y + radiusY }],
  };
}

function signedDoubleArea(vertices: Point[]) {
  const { x, y } = vertices[0];
  return vertices.reduce((area, a, i) => {
    const b = vertices[(i + 1) % vertices.length];
    return area + (a.x - x) * (b.y - y) - (a.y - y) * (b.x - x);
  }, 0);
}

export function polygonGeometry(vertices: Point[]) {
  const perimeter = vertices.reduce((total, a, i) => {
    const b = vertices[(i + 1) % vertices.length];
    return total + Math.hypot(b.x - a.x, b.y - a.y);
  }, 0);
  return { vertices, radius: null, area: Math.abs(signedDoubleArea(vertices)) / 2, perimeter, extent: vertices };
}

function vertexCenter(vertices: Point[]) {
  return {
    x: vertices.reduce((sum, p) => sum + p.x, 0) / vertices.length,
    y: vertices.reduce((sum, p) => sum + p.y, 0) / vertices.length,
  };
}

function fitVertices(template: Point[], vertices: Point[]) {
  const center = vertexCenter(vertices), templateCenter = vertexCenter(template);
  const radius = Math.max(...vertices.map((p) => Math.hypot(p.x - center.x, p.y - center.y))) || 2;
  const scale = radius / Math.max(...template.map((p) => Math.hypot(p.x - templateCenter.x, p.y - templateCenter.y)));
  return template.map((p) => ({
    x: center.x + (p.x - templateCenter.x) * scale,
    y: center.y + (p.y - templateCenter.y) * scale,
  }));
}

export function regularPolygon(vertices: Point[]) {
  const center = vertexCenter(vertices), first = vertices[0];
  const start = Math.atan2(first.y - center.y, first.x - center.x);
  const turn = (signedDoubleArea(vertices) < 0 ? -1 : 1) * 2 * Math.PI / vertices.length;
  return fitVertices(vertices.map((_, i) => ({ x: Math.cos(start + i * turn), y: Math.sin(start + i * turn) })), vertices);
}

const polygonTemplates = {
  equilateral: [[-1, -1], [1, -1], [0, Math.sqrt(3) - 1]],
  isosceles: [[-1, -0.6], [1, -0.6], [0, 0.9]],
  scalene: [[-1, -0.6], [1, -0.6], [-0.4, 0.9]],
  square: [[-1, -1], [1, -1], [1, 1], [-1, 1]],
  rhombus: [[-1, 0], [0, -0.6], [1, 0], [0, 0.6]],
  rectangle: [[-1, -0.6], [1, -0.6], [1, 0.6], [-1, 0.6]],
  trapezoid: [[-1, -0.6], [1, -0.6], [0.55, 0.6], [-0.55, 0.6]],
};

export type PolygonPreset = keyof typeof polygonTemplates;
export const maxPolygonVertices = 50;

export function presetPolygon(preset: PolygonPreset, vertices: Point[]) {
  return fitVertices(polygonTemplates[preset].map(([x, y]) => ({ x, y })), vertices);
}

export function insertPolygonVertex(vertices: Point[]) {
  if (vertices.length >= maxPolygonVertices) return vertices;
  let longest = 0, insertAfter = 0;
  vertices.forEach((a, i) => {
    const b = vertices[(i + 1) % vertices.length];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (length > longest) { longest = length; insertAfter = i; }
  });
  const a = vertices[insertAfter], b = vertices[(insertAfter + 1) % vertices.length];
  const point = longest > 0 ? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } : { x: a.x + 1, y: a.y };
  return [...vertices.slice(0, insertAfter + 1), point, ...vertices.slice(insertAfter + 1)];
}
export function geometryOf(p: Point, q: Point) {
  const dx = q.x - p.x, dy = q.y - p.y;
  const coincident = dx === 0 && dy === 0;
  const vertical = !coincident && dx === 0;
  const slope = coincident || vertical ? null : dy / dx;
  return { distance: Math.hypot(dx, dy), midpoint: { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 }, coincident, vertical, slope, intercept: slope === null ? null : p.y - slope * p.x };
}
