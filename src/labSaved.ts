import type { Curve, Viewport } from "./labMath";
import type { Point } from "./geometryMath";
import type { CircleState, CoefficientRange } from "./labPreferences";

export const modes = [{ id: "inspect", title: "Configurações" }, { id: "functions", title: "Funções" }, { id: "properties", title: "Propriedades" }, { id: "limits", title: "Limites" }, { id: "derivatives", title: "Derivadas" }, { id: "integrals", title: "Integrais" }, { id: "trigonometry", title: "Trigonometria" }, { id: "geometry", title: "Geometria" }, { id: "concepts", title: "Mapa" }, { id: "saved", title: "Salvos" }] as const;
export type Mode = (typeof modes)[number]["id"];
export const defaultOptions = { grid: true, coordinates: true, points: true, intersections: true, curve: true, second: true, moving: true, derivative: false, tangent: true, secant: true, symmetry: true, asymptotes: true };
export type Options = typeof defaultOptions;
export type Snapshot = { id: string; name: string; curve: Curve; secondCurve: Curve; compare: boolean; curves?: Curve[]; activeCurve?: number; view: Viewport; pointX: number; limitX: number; distance: number; h: number; lower: number; upper: number; rectangles: number; riemannMethod?: "left" | "right" | "midpoint"; geometry?: [Point, Point]; coefficientRange?: CoefficientRange; circle?: CircleState; mode: Mode; options: Options };
export const savedKey = "integra-lab-saved-v1";

function validCurve(value: unknown): value is Curve {
  if (!value || typeof value !== "object") return false;
  const curve = value as Curve;
  return ["affine", "quadratic", "exponential", "logarithmic", "sine", "cosine", "rational", "piecewise"].includes(curve.kind) && [curve.a, curve.b, curve.c].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6)
    && (curve.phase === undefined || Number.isFinite(curve.phase) && Math.abs(curve.phase) <= 36000)
    && (curve.angleUnit === undefined || ["rad", "deg"].includes(curve.angleUnit))
    && (curve.exponentialModel === undefined || ["natural", "base"].includes(curve.exponentialModel))
    && (curve.base === undefined || Number.isFinite(curve.base) && curve.base > 0 && curve.base <= 100)
    && (curve.example === undefined || ["continuous", "jump", "removable"].includes(curve.example));
}
export function validSnapshot(value: unknown): value is Snapshot {
  if (!value || typeof value !== "object") return false;
  const s = value as Snapshot;
  return typeof s.id === "string" && typeof s.name === "string" && s.name.length <= 100 && validCurve(s.curve) && validCurve(s.secondCurve) && typeof s.compare === "boolean"
    && (s.curves === undefined ? s.activeCurve === undefined : (Array.isArray(s.curves) && s.curves.length >= 1 && s.curves.length <= 4 && s.curves.every(validCurve) && Number.isInteger(s.activeCurve) && s.activeCurve! >= 0 && s.activeCurve! < s.curves.length))
    && !!s.view && [s.view.x, s.view.y, s.pointX, s.limitX, s.lower, s.upper].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e8)
    && Number.isFinite(s.view.span) && s.view.span >= 0.05 && s.view.span <= 10000 && (s.view.ySpan === undefined || Number.isFinite(s.view.ySpan) && s.view.ySpan >= 0.01 && s.view.ySpan <= 1e8) && s.distance >= 0.0001 && s.distance <= 1e8 && s.h >= 0.001 && s.h <= 1e8
    && Number.isInteger(s.rectangles) && s.rectangles >= 2 && s.rectangles <= 200
    && (s.riemannMethod === undefined || ["left", "right", "midpoint"].includes(s.riemannMethod))
    && (s.geometry === undefined || Array.isArray(s.geometry) && s.geometry.length === 2 && s.geometry.every((point) => point && [point.x, point.y].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6)))
    && (s.coefficientRange === undefined || !!s.coefficientRange && [s.coefficientRange.min, s.coefficientRange.max].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6) && s.coefficientRange.max - s.coefficientRange.min >= 0.000001)
    && (s.circle === undefined || !!s.circle && Number.isFinite(s.circle.radians) && Math.abs(s.circle.radians) <= 2 * Math.PI + 1e-8 && ["rad", "deg"].includes(s.circle.unit) && typeof s.circle.projections === "boolean")
    && modes.some((mode) => mode.id === s.mode) && !!s.options && Object.keys(defaultOptions).every((key) => s.options[key as keyof Options] === undefined || typeof s.options[key as keyof Options] === "boolean");
}
export function readSaved(): Snapshot[] {
  try { const data: unknown = JSON.parse(localStorage.getItem(savedKey) ?? "[]"); return Array.isArray(data) ? data.filter(validSnapshot).slice(0, 30).map((item) => ({ ...item, options: { ...defaultOptions, ...item.options } })) : []; } catch { return []; }
}
