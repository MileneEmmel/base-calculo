import assert from "node:assert/strict";
import test from "node:test";
import { bounds, coordinates, curvePath, curveRoots, derivative, evaluate, findZeros, formula, initialView, integral, limitAt, plot, ticks } from "../src/labMath.ts";
import { readProgress, writeLocal } from "../src/browserStorage.ts";
import { defaultOptions, readSaved, savedKey, validSnapshot } from "../src/labSaved.ts";

test("avalia funções e os casos degenerados com a igual a zero", () => {
  assert.equal(evaluate({ kind: "affine", a: -2, b: 3, c: 99 }, 4), -5);
  assert.equal(evaluate({ kind: "quadratic", a: 2, b: -3, c: 1 }, -2), 15);
  assert.equal(evaluate({ kind: "quadratic", a: 0, b: 2, c: 3 }, 4), 11);
  assert.equal(evaluate({ kind: "affine", a: 0, b: 3, c: 0 }, -100), 3);
});
test("formata sinais, termos nulos e coeficientes unitários", () => {
  assert.equal(formula({ kind: "quadratic", a: 1, b: -1, c: 0 }), "x² − x");
  assert.equal(formula({ kind: "quadratic", a: 0, b: 0, c: 0 }), "0");
  assert.equal(formula({ kind: "affine", a: -1, b: -2.5, c: 9 }), "−x − 2,5");
});
test("mantém a mesma escala nos dois eixos e centraliza a origem", () => {
  const origin = coordinates(0, 0, initialView);
  assert.equal(origin.x, plot.left + plot.width / 2);
  assert.equal(origin.y, plot.top + plot.height / 2);
  const unit = coordinates(1, 1, initialView);
  assert.ok(Math.abs((unit.x - origin.x) - (origin.y - unit.y)) < 1e-9);
});
test("deslocamento e zoom preservam os limites da janela", () => {
  const view = { x: 7, y: -4, span: 2 };
  const box = bounds(view);
  assert.equal(box.xmin, 5);
  assert.equal(box.xmax, 9);
  assert.deepEqual(coordinates(box.xmin, box.ymax, view), { x: plot.left, y: plot.top });
  const end = coordinates(box.xmax, box.ymin, view);
  assert.ok(Math.abs(end.y - (plot.top + plot.height)) < 1e-9);
});
test("gera curvas finitas para todos os extremos dos controles", () => {
  for (const a of [-5, 0, 5]) for (const span of [1, 10, 40]) {
    const path = curvePath({ kind: "quadratic", a, b: -5, c: 5 }, { x: 10, y: -5, span });
    assert.ok(path.startsWith("M52.00,"));
    assert.equal((path.match(/L/g) ?? []).length, 724);
    assert.doesNotMatch(path, /NaN|Infinity/);
  }
});
test("marcações permanecem ordenadas e dentro da janela em diferentes escalas", () => {
  for (const [min, max] of [[-10, 10], [-0.2, 0.2], [7, 87], [-100, -20]]) {
    const result = ticks(min, max);
    assert.ok(result.length > 0 && result.length <= 12);
    assert.ok(result.every((value, i) => value >= min && value <= max && (i === 0 || value > result[i - 1])));
  }
});

test("novas famílias respeitam domínio e radianos", () => {
  assert.ok(Number.isNaN(evaluate({ kind: "logarithmic", a: 1, b: 1, c: 0 }, 0)));
  assert.equal(evaluate({ kind: "logarithmic", a: 2, b: -1, c: 3 }, -1), 3);
  assert.equal(evaluate({ kind: "sine", a: 2, b: 1, c: 1 }, Math.PI / 2), 3);
  assert.equal(evaluate({ kind: "cosine", a: 2, b: 1, c: 1 }, 0), 3);
  assert.equal(evaluate({ kind: "exponential", a: 2, b: 1, c: 3 }, 0), 5);
  assert.ok(Number.isNaN(evaluate({ kind: "rational", a: 0, b: 1, c: 0 }, 0)));
});
test("derivadas concordam com diferenças centrais em todas as famílias", () => {
  for (const kind of ["affine", "quadratic", "exponential", "logarithmic", "sine", "cosine", "rational"]) {
    const curve = { kind, a: 2, b: 1, c: 0 };
    const x = 1.3, h = 1e-5;
    const numerical = (evaluate(curve, x + h) - evaluate(curve, x - h)) / (2 * h);
    assert.ok(Math.abs(derivative(curve, x) - numerical) < 1e-5, kind);
  }
});
test("integrais, inversão e intervalos fora do domínio", () => {
  const square = { kind: "quadratic", a: 1, b: 0, c: 0 };
  assert.equal(integral(square, 0, 3), 9);
  assert.equal(integral(square, 3, 0), -9);
  assert.equal(integral(square, 2, 2), 0);
  assert.ok(Number.isNaN(integral({ kind: "rational", a: 0, b: 1, c: 0 }, -1, 1)));
  assert.ok(Number.isNaN(integral({ kind: "logarithmic", a: 1, b: 1, c: 0 }, -1, 1)));
  for (const kind of ["affine", "quadratic", "exponential", "logarithmic", "sine", "cosine", "rational"]) {
    const curve = { kind, a: 2, b: 1, c: 0 };
    const n = 10000, left = 1, right = 2, width = (right - left) / n;
    let sum = 0;
    for (let i = 0; i < n; i++) sum += evaluate(curve, left + (i + 0.5) * width) * width;
    assert.ok(Math.abs(integral(curve, left, right) - sum) < 1e-6, kind);
  }
});
test("limites laterais distinguem polos, pontos removíveis e domínio unilateral", () => {
  assert.deepEqual(limitAt({ kind: "rational", a: 0, b: 1, c: 0 }, 0), { left: -Infinity, right: Infinity });
  assert.deepEqual(limitAt({ kind: "rational", a: 2, b: -4, c: 2 }, 2), { left: 2, right: 2 });
  const log = limitAt({ kind: "logarithmic", a: 1, b: 1, c: 0 }, 0);
  assert.ok(Number.isNaN(log.left));
  assert.equal(log.right, -Infinity);
  assert.deepEqual(limitAt({ kind: "quadratic", a: 1, b: 0, c: 0 }, 2), { left: 4, right: 4 });
});
test("raízes incluem tangências e excluem polos e subfluxo exponencial", () => {
  const tangent = { kind: "quadratic", a: 1, b: -0.6, c: 0.09 };
  const roots = curveRoots(tangent, -2, 2);
  assert.equal(roots.length, 1);
  assert.ok(Math.abs(roots[0] - 0.3) < 1e-7);
  assert.deepEqual(curveRoots({ kind: "exponential", a: 1, b: 100, c: 0 }, -10000, 10000), []);
  assert.deepEqual(curveRoots({ kind: "rational", a: 1, b: -1, c: 1 }, -10, 10), []);
  assert.deepEqual(curveRoots({ kind: "logarithmic", a: 0, b: 1, c: 0 }, -10, 10), []);
  const contacts = findZeros((x) => (x - 0.31) ** 2, (x) => 2 * (x - 0.31), -1, 1);
  assert.equal(contacts.length, 1);
  assert.ok(Math.abs(contacts[0] - 0.31) < 1e-6);
  assert.deepEqual(findZeros((x) => 1 / x, (x) => -1 / x ** 2, -1, 1), []);
});
test("gráficos interrompem curvas nas descontinuidades", () => {
  const rationalPath = curvePath({ kind: "rational", a: 0, b: 1, c: 0.13 }, initialView);
  assert.equal((rationalPath.match(/M/g) ?? []).length, 2);
  for (const kind of ["exponential", "logarithmic", "sine", "cosine", "rational"]) assert.doesNotMatch(curvePath({ kind, a: 100, b: 100, c: 1 }, initialView), /NaN|Infinity/);
});
test("progresso tolera dados inválidos e preserva os IDs existentes", () => {
  assert.deepEqual([...readProgress('["MB-001","C1-002","MB-001",3]')], ["MB-001", "C1-002"]);
  for (const raw of [null, "invalid", "null", "{}", "true"]) assert.equal(readProgress(raw).size, 0);
});
test("salvamento persiste e valida o estado completo da exploração", () => {
  const values = new Map();
  globalThis.localStorage = { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) };
  const snapshot = { id: "example", name: "Integral", curve: { kind: "quadratic", a: 1, b: 0, c: 0 }, secondCurve: { kind: "affine", a: 1, b: 1, c: 0 }, compare: true, view: initialView, pointX: 1, limitX: 0, distance: 0.1, h: 0.01, lower: 0, upper: 2, rectangles: 50, mode: "integrals", options: defaultOptions, tableStep: 1 };
  assert.equal(validSnapshot(snapshot), true);
  assert.equal(writeLocal(savedKey, [snapshot]), true);
  assert.deepEqual(readSaved(), [snapshot]);
  assert.equal(validSnapshot({ ...snapshot, view: { ...initialView, span: -1 } }), false);
  assert.equal(validSnapshot({ ...snapshot, curve: { ...snapshot.curve, a: 1e12 } }), false);
  const fourFunctions = { ...snapshot, curves: [snapshot.curve, snapshot.secondCurve, snapshot.curve, snapshot.secondCurve], activeCurve: 3 };
  assert.equal(validSnapshot(fourFunctions), true);
  assert.equal(writeLocal(savedKey, [fourFunctions, snapshot]), true);
  assert.deepEqual(readSaved(), [fourFunctions, snapshot]);
  assert.equal(validSnapshot({ ...fourFunctions, activeCurve: 4 }), false);
  assert.equal(validSnapshot({ ...fourFunctions, curves: [...fourFunctions.curves, snapshot.curve] }), false);
  globalThis.localStorage.setItem = () => { throw new Error("Storage blocked"); };
  assert.equal(writeLocal("progress", []), false);
  delete globalThis.localStorage;
});
