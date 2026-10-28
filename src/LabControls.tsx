import { useEffect, useId, useState } from "react";
import { domainLabel, formula, isTrig, numberLabel } from "./labMath";
import type { Curve, CurveKind } from "./labMath";
import SelectMenu from "./SelectMenu";
import type { CoefficientRange } from "./labPreferences";
import { defaultCoefficientRange } from "./labPreferences";

export const families: { kind: CurveKind; name: string; model: string; defaults: Curve }[] = [
  { kind: "affine", name: "Afim", model: "ax + b", defaults: { kind: "affine", a: 1, b: 0, c: 0 } },
  { kind: "quadratic", name: "Quadrática", model: "ax² + bx + c", defaults: { kind: "quadratic", a: 1, b: 0, c: 0 } },
  { kind: "exponential", name: "Exponencial", model: "a · eᵇˣ + c", defaults: { kind: "exponential", a: 1, b: 1, c: 0 } },
  { kind: "logarithmic", name: "Logarítmica", model: "a · ln(bx) + c", defaults: { kind: "logarithmic", a: 1, b: 1, c: 0 } },
  { kind: "sine", name: "Seno", model: "A · sen(Bx + C) + D", defaults: { kind: "sine", a: 1, b: 1, c: 0, phase: 0, angleUnit: "rad" } },
  { kind: "cosine", name: "Cosseno", model: "A · cos(Bx + C) + D", defaults: { kind: "cosine", a: 1, b: 1, c: 0, phase: 0, angleUnit: "rad" } },
  { kind: "rational", name: "Racional", model: "(ax + b) / (x − c)", defaults: { kind: "rational", a: 0, b: 1, c: 0 } },
  { kind: "piecewise", name: "Por partes", model: "Continuidade, salto e ponto removível", defaults: { kind: "piecewise", a: 1, b: 0, c: 1, example: "continuous" } },
];

export function NumericControl({ label, value, onChange, min = -100, max = 100, step = 0.1, rangeStep }: { label: string; value: number; onChange: (value: number) => void; min?: number; max?: number; step?: number; rangeStep?: number | "any" }) {
  const id = useId();
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(Number(value.toPrecision(10)))), [value]);
  return <div className="lab-number-control">
    <div><label htmlFor={id}>{label}</label><input id={id} type="number" min={min} max={max} step={step} value={draft} onChange={(event) => {
      setDraft(event.target.value);
      if (event.target.value !== "" && Number.isFinite(event.target.valueAsNumber)) onChange(Math.min(max, Math.max(min, event.target.valueAsNumber)));
    }} onBlur={() => setDraft(String(Number(value.toPrecision(10))))} /></div>
    <input aria-label={`${label} — controle deslizante`} type="range" min={min} max={max} step={rangeStep ?? "any"} value={Math.min(max, Math.max(min, value))} onChange={(event) => onChange(Number(event.target.value))} />
    <div className="lab-control-bounds" aria-hidden="true"><span>{numberLabel(min)}</span><span>{numberLabel(max)}</span></div>
  </div>;
}

export function CurveControls({ curve, onChange, name, onUnitChange, range = defaultCoefficientRange }: { curve: Curve; onChange: (curve: Curve) => void; name: string; onUnitChange?: (unit: "rad" | "deg") => void; range?: CoefficientRange }) {
  return <fieldset className="lab-curve-controls">
    <legend className="sr-only">Função {name}</legend>
    <SelectMenu label={`Tipo de função ${name}`} value={curve.kind} options={families.map((family) => ({ value: family.kind, label: family.name, description: family.model }))} onChange={(kind) => { const selected = families.find((family) => family.kind === kind); if (selected) onChange(selected.defaults); }} />
    <p className={`lab-equation ${name === "g" ? "lab-equation-secondary" : ""}`}>{name}(x) = {formula(curve)}</p>
    <p className="lab-note">{domainLabel(curve)}</p>
    {curve.kind === "exponential" && <SelectMenu label="Modelo exponencial" value={curve.exponentialModel ?? "natural"} options={[{ value: "natural", label: "Base e", description: "a · e^(bx) + c" }, { value: "base", label: "Base q", description: "a · q^x + c, com q > 0" }]} onChange={(value) => onChange({ ...curve, exponentialModel: value as "natural" | "base", base: curve.base ?? 2 })} />}
    {curve.kind === "piecewise" && <SelectMenu label="Exemplo por partes" value={curve.example ?? "removable"} options={[{ value: "continuous", label: "Junção contínua" }, { value: "jump", label: "Salto de uma unidade" }, { value: "removable", label: "Ponto removível" }]} onChange={(example) => onChange({ ...curve, example: example as Curve["example"] })} />}
    {isTrig(curve) && <><SelectMenu label="Unidade angular" value={curve.angleUnit ?? "rad"} options={[{ value: "rad", label: "Radianos" }, { value: "deg", label: "Graus" }]} onChange={(unit) => onUnitChange?.(unit as "rad" | "deg")} /><NumericControl label={`Amplitude A de ${name}`} value={curve.a} min={range.min} max={range.max} onChange={(a) => onChange({ ...curve, a })} /><NumericControl label={`Fator B de ${name}`} value={curve.b} min={range.min} max={range.max} onChange={(b) => onChange({ ...curve, b })} /><NumericControl label={`Fase C de ${name} (${curve.angleUnit === "deg" ? "graus" : "rad"})`} value={curve.phase ?? 0} min={curve.angleUnit === "deg" ? -360 : -2 * Math.PI} max={curve.angleUnit === "deg" ? 360 : 2 * Math.PI} step={0.01} onChange={(phase) => onChange({ ...curve, phase })} /><NumericControl label={`Deslocamento D de ${name}`} value={curve.c} min={range.min} max={range.max} onChange={(c) => onChange({ ...curve, c })} /></>}
    {!isTrig(curve) && ([...(curve.kind === "piecewise" && curve.example === "continuous" ? [] : ["a", ...(curve.kind === "exponential" && curve.exponentialModel === "base" ? [] : ["b"])]), ...(curve.kind !== "affine" ? ["c"] : [])] as ("a" | "b" | "c")[]).map((key) => <NumericControl key={key} label={curve.kind === "piecewise" && key === "c" ? "Ponto de junção c" : `Coeficiente ${key} de ${name}`} min={range.min} max={range.max} value={curve[key]} onChange={(value) => onChange({ ...curve, [key]: value })} />)}
    {curve.kind === "exponential" && curve.exponentialModel === "base" && <><NumericControl label="Base q" value={curve.base ?? 2} min={0.01} max={100} step={0.01} onChange={(base) => onChange({ ...curve, base })} /><p className="lab-note">q = 1 produz uma constante. O modelo equivale a a·e^(ln(q)·x)+c. O valor de b do modelo de base e é preservado ao alternar.</p></>}
  </fieldset>;
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="lab-comparison"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}
