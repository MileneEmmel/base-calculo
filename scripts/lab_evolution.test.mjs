import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { convertTrigUnit, curvePath, curveRoots, derivative, derivativeFormula, evaluate, exponentialRate, functionProperties, geometricArea, integral, limitAt, riemannSum, symmetryAxis, trigProperties } from "../src/labMath.ts";
import { circleGeometry, geometryOf, insertPolygonVertex, movePointDrag, polygonGeometry, presetPolygon, regularPolygon, startPointDrag, vectorMeasurement, vectorOperations } from "../src/geometryMath.ts";
import { experiments, prerequisites, topicExperiment } from "../src/learningExperiments.ts";

const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
const square = { kind: "quadratic", a: 1, b: 0, c: 0 };

test("propriedades cobrem os três discriminantes e a quadrática degenerada", () => {
  const upward = { kind: "quadratic", a: 1, b: -4, c: 3 };
  const rows = functionProperties(upward);
  assert.equal(rows.find(r => r.label === "Δ = b² − 4ac").value, "4");
  assert.equal(rows.find(r => r.label === "Raízes reais (Bhaskara)").value, "1 e 3");
  assert.equal(rows.find(r => r.label === "Vértice").value, "(2; -1)");
  assert.equal(symmetryAxis(upward), 2);
  assert.equal(functionProperties(square).find(r => r.label === "Raízes reais (Bhaskara)").value, "0");
  assert.match(functionProperties({ ...square, c: 1 }).find(r => r.label === "Raízes reais (Bhaskara)").value, /Não possui/);
  const degenerate = functionProperties({ kind: "quadratic", a: 0, b: 0, c: 4 });
  assert.equal(symmetryAxis({ ...square, a: 0 }), null);
  assert.ok(degenerate.some(r => /deixou de ser quadrática/.test(r.value)));
  assert.doesNotMatch(JSON.stringify(degenerate), /NaN|Infinity/);
});

test("três somas de Riemann convergem a 9 e preservam a orientação", () => {
  for (const [method, expected] of [["left", 7.695], ["right", 10.395], ["midpoint", 8.9775]]) {
    near(riemannSum(square, 0, 3, 10, method), expected);
    near(riemannSum(square, 3, 0, 10, method), -expected);
    assert.ok(Math.abs(riemannSum(square, 0, 3, 100, method) - 9) < Math.abs(expected - 9));
  }
  assert.equal(integral(square, 0, 3), 9);
  const line = { kind: "affine", a: 1, b: 0, c: 0 };
  assert.equal(integral(line, -1, 1), 0);
  assert.equal(geometricArea(line, -1, 1), 1);
  assert.equal(geometricArea(line, 1, -1), 1);
});

test("trigonometria mantém os modelos antigos e converte fase, eixo e derivada", () => {
  const old = { kind: "sine", a: 2, b: 3, c: 5 };
  near(evaluate(old, 0.4), 2 * Math.sin(1.2) + 5);
  const rad = { kind: "sine", a: 2, b: 2, c: 3, phase: Math.PI / 2, angleUnit: "rad" };
  const deg = convertTrigUnit(rad, "deg"), x = 0.7;
  near(deg.phase, 90);
  near(evaluate(rad, x), evaluate(deg, x * 180 / Math.PI));
  near(derivative(rad, x), derivative(deg, x * 180 / Math.PI) * 180 / Math.PI);
  assert.match(derivativeFormula(deg), /π\/180/);
  near(integral(rad, 0, 1) * 180 / Math.PI, integral(deg, 0, 180 / Math.PI));
  const props = trigProperties(rad);
  assert.equal(props.amplitude, 2);
  near(props.period, Math.PI);
  near(props.shift, -Math.PI / 4);
  assert.equal(trigProperties({ ...rad, a: 0 }).period, null);
  assert.equal(trigProperties({ ...rad, b: 0 }).frequency, null);
  near(integral({ ...rad, b: 0 }, 0, 2), 10);
});

test("raízes trigonométricas incluem fase e graus", () => {
  const roots = curveRoots({ kind: "sine", a: 1, b: 1, c: 0, phase: 90, angleUnit: "deg" }, -360, 360);
  assert.deepEqual(roots.map(x => Math.round(x)), [-270, -90, 90, 270]);
});

test("exponenciais de base q equivalem ao modelo natural sem reinterpretar os antigos", () => {
  const base = { kind: "exponential", a: 3, b: 99, c: 2, exponentialModel: "base", base: 2 };
  const natural = { kind: "exponential", a: 3, b: Math.log(2), c: 2 };
  near(exponentialRate(base), Math.log(2));
  for (const x of [-2, 0, 3]) { near(evaluate(base, x), evaluate(natural, x)); near(derivative(base, x), derivative(natural, x)); }
  near(integral(base, -1, 2), integral(natural, -1, 2));
  assert.equal(evaluate({ ...base, base: 1 }, 100), 5);
  assert.equal(derivative({ ...base, base: 1 }, 100), 0);
  assert.ok(Number.isNaN(evaluate({ ...base, base: -1 }, 1)));
});

test("continuidade, salto e ponto removível mantêm limites e traços distintos", () => {
  const continuous = { kind: "piecewise", a: 1, b: 0, c: 2, example: "continuous" };
  assert.deepEqual(limitAt(continuous, 2), { left: 4, right: 4 });
  assert.equal(evaluate(continuous, 2), 4);
  assert.equal(derivative(continuous, 2), 4);
  const jump = { ...continuous, example: "jump" };
  assert.deepEqual(limitAt(jump, 2), { left: 2, right: 3 });
  assert.ok(Number.isNaN(derivative(jump, 2)));
  const hole = { ...continuous, example: "removable" };
  assert.deepEqual(limitAt(hole, 2), { left: 2, right: 2 });
  assert.ok(Number.isNaN(evaluate(hole, 2)));
  assert.ok((curvePath(jump, { x: 2, y: 0, span: 5 }).match(/M/g) ?? []).length >= 2);
  near(integral(jump, 0, 3), 5.5);
});

test("geometria trata distâncias, retas verticais e pontos coincidentes", () => {
  const result = geometryOf({ x: 2, y: 3 }, { x: 7, y: 8 });
  near(result.distance, Math.sqrt(50));
  assert.deepEqual(result.midpoint, { x: 4.5, y: 5.5 });
  assert.equal(result.slope, 1);
  assert.equal(result.intercept, 1);
  const vertical = geometryOf({ x: 2, y: 1 }, { x: 2, y: 7 });
  assert.equal(vertical.vertical, true);
  assert.equal(vertical.slope, null);
  const same = geometryOf({ x: 2, y: 1 }, { x: 2, y: 1 });
  assert.equal(same.coincident, true);
  assert.equal(same.distance, 0);
  assert.equal(same.slope, null);
});

test("mapa usa o catálogo real e forma uma rede de pré-requisitos sem ciclos", () => {
  const catalog = JSON.parse(readFileSync(new URL("../public/data/questions.json", import.meta.url), "utf8"));
  const known = new Set(catalog.topics.map(t => t.slug));
  assert.deepEqual(new Set(Object.keys(prerequisites)), known);
  const visit = (slug, path = []) => {
    assert.ok(!path.includes(slug), `Ciclo: ${[...path, slug].join(" → ")}`);
    for (const parent of prerequisites[slug]) { assert.ok(known.has(parent), parent); visit(parent, [...path, slug]); }
  };
  for (const slug of known) visit(slug);
  for (const [topic, preset] of Object.entries(topicExperiment)) { assert.ok(known.has(topic)); assert.ok(experiments[preset]); }
  const questionIds = new Set(catalog.questions.map(q => q.id));
  for (const id of Object.keys(experiments).filter(id => id.startsWith("question-"))) assert.ok(questionIds.has(id.slice(9)), id);
});

test("vetores calculam soma, escala e os dois produtos", () => {
  assert.deepEqual(vectorOperations({ x: 3, y: 1 }, { x: 1, y: 3 }, -2), {
    sum: { x: 4, y: 4 }, scaled: { x: -6, y: -2 }, dot: 6, determinant: 8,
    lengths: [Math.sqrt(10), Math.sqrt(10)],
  });
  assert.equal(vectorOperations({ x: 0, y: 0 }, { x: 1, y: 3 }, 0).determinant, 0);
});

test("figuras medem área e perímetro a partir dos pontos do plano", () => {
  const points = [{ x: 1, y: 1 }, { x: 4, y: 5 }, { x: 1, y: 5 }];
  const triangle = polygonGeometry(points);
  assert.equal(triangle.area, 6);
  assert.equal(triangle.perimeter, 12);
  assert.equal(polygonGeometry([...points.slice(0, 2), { x: 7, y: 9 }]).area, 0);
  const rectangle = polygonGeometry([points[0], { x: 4, y: 1 }, points[1], points[2]]);
  assert.equal(rectangle.area, 12);
  assert.equal(rectangle.perimeter, 14);
  const circle = circleGeometry(points[0], points[1]);
  assert.equal(circle.radius, 5);
  assert.equal(circle.area, 25 * Math.PI);
  assert.equal(circle.perimeter, 10 * Math.PI);
});

test("Shift trava o eixo predominante e pode ser pressionado ou solto no meio do arraste", () => {
  const move = (drag, x, y, shift) => movePointDrag(drag, { x, y }, shift, { x: 0.5, y: 0.5 }, (point) => point);
  let drag = startPointDrag({ x: 2, y: 3 }, { x: 0, y: 0 }, true);
  drag = move(drag, 4, 1, true);
  assert.deepEqual(drag.last, { x: 4, y: 3 });
  drag = move(drag, 6, 20, true);
  assert.deepEqual(drag.last, { x: 5, y: 3 });
  drag = move(drag, 8, 24, false);
  assert.deepEqual(drag.last, { x: 6, y: 1 });
  drag = move(drag, 9, 30, true);
  assert.deepEqual(drag.last, { x: 6, y: -2 });
});

test("adicionar pontos preserva as medidas, e regularizar mantém a quantidade de vértices", () => {
  let points = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 4 }];
  for (let i = 0; i < 51; i++) points = insertPolygonVertex(points);
  assert.equal(points.length, 50);
  assert.equal(new Set(points.map(({ x, y }) => `${x},${y}`)).size, 50);
  near(polygonGeometry(points).area, 6);
  near(polygonGeometry(points).perimeter, 12);
  const regular = regularPolygon(points);
  const length = (a, b) => Math.hypot(b.x - a.x, b.y - a.y);
  assert.equal(regular.length, 50);
  regular.forEach((a, i) => {
    const b = regular[(i + 1) % 50], c = regular[(i + 2) % 50];
    near(length(a, b), length(b, c));
    near(length(a, c) / (2 * length(a, b)), Math.cos(Math.PI / 50));
  });
  const [a, b, c, d] = presetPolygon("rhombus", points);
  near(length(a, b), length(b, c));
  near(length(b, c), length(c, d));
  near(length(c, d), length(d, a));
  assert.notEqual(length(a, c), length(b, d));
});

test("inclinação dos vetores cobre os quadrantes e é indefinida no vetor nulo", () => {
  const fourthQuadrant = vectorMeasurement({ x: 3, y: -3 });
  near(fourthQuadrant.magnitude, Math.sqrt(18));
  near(fourthQuadrant.inclination, 315);
  near(vectorMeasurement({ x: -3, y: 3 }).inclination, 135);
  assert.deepEqual(vectorMeasurement({ x: 0, y: 0 }), { magnitude: 0, inclination: null });
});
