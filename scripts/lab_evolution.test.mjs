import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { convertTrigUnit, curvePath, curveRoots, derivative, derivativeFormula, evaluate, exponentialRate, functionProperties, geometricArea, integral, limitAt, riemannSum, symmetryAxis, trigProperties } from "../src/labMath.ts";
import { geometryOf } from "../src/geometryMath.ts";
import { experiments, prerequisites, topicExperiment } from "../src/learningExperiments.ts";
import { defaultOptions, readSaved, savedKey, validSnapshot } from "../src/labSaved.ts";

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

test("explorações antigas ganham novas opções sem perder os coeficientes", () => {
  const old = { id: "legacy", name: "Seno antigo", curve: { kind: "sine", a: 2, b: 3, c: 4 }, secondCurve: square, compare: false, view: { x: 0, y: 0, span: 10 }, pointX: 1, limitX: 0, distance: 0.1, h: 1, lower: 0, upper: 2, rectangles: 10, mode: "functions", options: Object.fromEntries(Object.entries(defaultOptions).filter(([key]) => !["symmetry", "asymptotes"].includes(key))) };
  assert.equal(validSnapshot(old), true);
  globalThis.localStorage = { getItem: key => key === savedKey ? JSON.stringify([old]) : null };
  const restored = readSaved()[0];
  assert.deepEqual(restored.curve, old.curve);
  assert.equal(restored.options.symmetry, true);
  assert.equal(restored.options.asymptotes, true);
  assert.equal(validSnapshot({ ...old, curve: { ...old.curve, angleUnit: "bad" } }), false);
  const updated = { ...restored, geometry: [{ x: 2, y: 3 }, { x: 2, y: 8 }], riemannMethod: "left", curves: [{ ...old.curve, phase: 90, angleUnit: "deg" }], activeCurve: 0 };
  assert.equal(validSnapshot(updated), true);
  assert.equal(validSnapshot({ ...updated, geometry: [{ x: 2e6, y: 3 }, { x: 2, y: 8 }] }), false);
  assert.equal(validSnapshot({ ...updated, coefficientRange: { min: -500, max: 500 }, circle: { radians: Math.PI / 2, unit: "deg", projections: true } }), true);
  for (const coefficientRange of [null, { min: 5, max: 5 }, { min: -Infinity, max: 100 }]) assert.equal(validSnapshot({ ...updated, coefficientRange }), false);
  for (const circle of [null, { radians: 8, unit: "deg", projections: true }, { radians: 1, unit: "bad", projections: true }]) assert.equal(validSnapshot({ ...updated, circle }), false);
  assert.equal(validSnapshot({ ...updated, riemannMethod: "bad" }), false);
  delete globalThis.localStorage;
});
