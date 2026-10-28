import type { Curve } from "./labMath";
export type CoefficientRange = { min: number; max: number };
export type CircleState = { radians: number; unit: "rad" | "deg"; projections: boolean };
export const defaultCoefficientRange: CoefficientRange = { min: -100, max: 100 };
export const defaultCircleState: CircleState = { radians: Math.PI / 4, unit: "deg", projections: true };
export const coefficientRangeKey = "integra-coefficient-range-v1";
export const circleStateKey = "integra-circle-v1";

export function validCoefficientRange(value: unknown): value is CoefficientRange {
  if (!value || typeof value !== "object") return false;
  const range = value as CoefficientRange;
  return [range.min, range.max].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6) && range.max - range.min >= 0.000001;
}
export function validCircleState(value: unknown): value is CircleState {
  if (!value || typeof value !== "object") return false;
  const circle = value as CircleState;
  return Number.isFinite(circle.radians) && Math.abs(circle.radians) <= 2 * Math.PI + 1e-8 && ["rad", "deg"].includes(circle.unit) && typeof circle.projections === "boolean";
}
export function readCoefficientRange(): CoefficientRange {
  try { const range: unknown = JSON.parse(localStorage.getItem(coefficientRangeKey) ?? "null"); if (validCoefficientRange(range)) return range; } catch { /* Keep usable defaults if storage is unavailable. */ }
  return defaultCoefficientRange;
}
export function readCircleState(): CircleState {
  try { const circle: unknown = JSON.parse(localStorage.getItem(circleStateKey) ?? "null"); if (validCircleState(circle)) return circle; } catch { /* Keep usable defaults if storage is unavailable. */ }
  return defaultCircleState;
}
export const clampRange = (value: number, range: CoefficientRange) => Math.max(range.min, Math.min(range.max, value));
export function includeCurveRange(range: CoefficientRange, curves: Curve[]): CoefficientRange {
  const values = curves.flatMap((curve) => [curve.a, curve.b, curve.c]);
  return { min: Math.min(range.min, ...values), max: Math.max(range.max, ...values) };
}

export function circleValues(radians: number) {
  const sine = Math.sin(radians), cosine = Math.cos(radians);
  const degrees = ((radians * 180 / Math.PI) % 360 + 360) % 360;
  const onAxis = Math.abs(sine) < 1e-10 || Math.abs(cosine) < 1e-10;
  return { sine: Math.abs(sine) < 1e-12 ? 0 : sine, cosine: Math.abs(cosine) < 1e-12 ? 0 : cosine, tangent: Math.abs(cosine) < 1e-10 ? null : sine / cosine, quadrant: onAxis ? null : Math.floor(degrees / 90) + 1, degrees };
}
