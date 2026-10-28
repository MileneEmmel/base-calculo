import assert from "node:assert/strict";
import test from "node:test";
import { circleValues, clampRange, coefficientRangeKey, defaultCircleState, defaultCoefficientRange, includeCurveRange, readCircleState, readCoefficientRange, validCircleState, validCoefficientRange } from "../src/labPreferences.ts";

test("configuração aceita faixas assimétricas e rejeita limites inválidos", () => {
  assert.deepEqual(defaultCoefficientRange, { min: -100, max: 100 });
  assert.equal(validCoefficientRange({ min: -7.5, max: 250 }), true);
  for (const range of [null, {}, { min: 10, max: -10 }, { min: 1, max: 1 }, { min: -Infinity, max: 1 }, { min: -1, max: 1e7 }]) assert.equal(validCoefficientRange(range), false);
  assert.equal(clampRange(205, { min: -10, max: 10 }), 10);
  assert.equal(clampRange(-205, { min: -10, max: 10 }), -10);
  assert.equal(clampRange(3.25, { min: -4.8, max: 8 }), 3.25);
  assert.deepEqual(includeCurveRange(defaultCoefficientRange, [{ kind: "exponential", a: 205, b: 1, c: 0 }]), { min: -100, max: 205 });
});

test("círculo trata ângulos negativos, eixos e tangentes indefinidas", () => {
  assert.equal(circleValues(Math.PI / 2).cosine, 0);
  assert.equal(circleValues(Math.PI / 2).sine, 1);
  assert.equal(circleValues(Math.PI / 2).tangent, null);
  assert.equal(circleValues(3 * Math.PI / 2).tangent, null);
  assert.equal(circleValues(2 * Math.PI).quadrant, null);
  assert.equal(circleValues(-Math.PI / 4).quadrant, 4);
  assert.equal(circleValues(3 * Math.PI / 4).quadrant, 2);
  assert.equal(circleValues(5 * Math.PI / 4).quadrant, 3);
  assert.ok(Math.abs(circleValues(Math.PI / 4).tangent - 1) < 1e-12);
  assert.equal(validCircleState(defaultCircleState), true);
  for (const state of [null, {}, { ...defaultCircleState, radians: Infinity }, { ...defaultCircleState, radians: 7 }, { ...defaultCircleState, unit: "turn" }]) assert.equal(validCircleState(state), false);
});

test("preferências inválidas ou armazenamento indisponível usam o padrão", () => {
  globalThis.localStorage = { getItem: key => key === coefficientRangeKey ? JSON.stringify({ min: -7.5, max: 250 }) : "null" };
  assert.deepEqual(readCoefficientRange(), { min: -7.5, max: 250 });
  assert.deepEqual(readCircleState(), defaultCircleState);
  globalThis.localStorage = { getItem: () => { throw new Error("Storage unavailable"); } };
  assert.deepEqual(readCoefficientRange(), defaultCoefficientRange);
  assert.deepEqual(readCircleState(), defaultCircleState);
  delete globalThis.localStorage;
});
