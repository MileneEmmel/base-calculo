import { useId, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { coordinates, curvePath, evaluate, formula, numberLabel, trigProperties } from "./labMath";
import type { Curve } from "./labMath";
import { NumericField } from "./LabControls";
import Icon from "./Icon";

const initialParameters = { a: 1, b: 1, c: 0, phase: 0 };
const waveKinds = [{ id: "sine", title: "Seno" }, { id: "cosine", title: "Cosseno" }] as const;
const chart = { left: 50, top: 10, width: 520, height: 102 };
const radiansLabels = ["−2π", "−3π/2", "−π", "−π/2", "0", "π/2", "π", "3π/2", "2π"];
const verticalGridSteps = [0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];

function WaveParameter({ title, label, value, min, max, step = 0.1, rangeStep = step, onChange }: {
  title: string; label: string; value: number; min: number; max: number;
  step?: number; rangeStep?: number | "any"; onChange: (value: number) => void;
}) {
  return <div className="wave-parameter">
    <label>{title}<NumericField label={label} value={value} min={min} max={max} step={step} onChange={onChange} /></label>
    <input type="range" className="ui-range" aria-label={`Ajustar ${label}`} aria-valuetext={numberLabel(value)}
      min={min} max={max} step={rangeStep} value={value}
      style={{ "--range-fill": `${100 * (value - min) / (max - min)}%` } as CSSProperties}
      onChange={(event) => onChange(event.currentTarget.valueAsNumber)} />
  </div>;
}

export default function CircleWaves({ radians, unit, onAngleChange }: {
  radians: number; unit: "deg" | "rad"; onAngleChange: (radians: number) => void;
}) {
  const [active, setActive] = useState<"sine" | "cosine">("sine");
  const [parameters, setParameters] = useState({ sine: initialParameters, cosine: initialParameters });
  const heading = useId();
  const scale = unit === "deg" ? 180 / Math.PI : 1;
  const extent = unit === "deg" ? 360 : 2 * Math.PI;
  const angle = radians * scale;
  const start = angle < 0 ? -extent : 0;
  const selected = parameters[active];
  const { wave, view, path, gridStep } = useMemo(() => {
    const wave: Curve = { ...selected, kind: active, angleUnit: unit, phase: selected.phase * scale };
    const verticalExtent = Math.abs(wave.a) + Math.abs(wave.c);
    const gridStep = verticalGridSteps.find((step) => 2 * step >= verticalExtent) ?? 10;
    const view = { x: start + extent / 2, y: 0, span: extent / 2, ySpan: gridStep * 2.4 };
    return { wave, view, gridStep, path: curvePath(wave, view, chart) };
  }, [active, selected, unit, scale, start, extent]);
  const position = (x: number, y: number) => coordinates(x, y, view, chart);
  const value = evaluate(wave, angle);
  const cursor = position(angle, value);
  const origin = position(0, 0);
  const rows = [-2, -1, 0, 1, 2].map((row) => row * gridStep);
  const columns = Array.from({ length: 5 }, (_, index) => {
    const quarter = angle < 0 ? index - 4 : index;
    return {
      x: position(start + index * extent / 4, 0).x,
      label: unit === "deg" ? `${90 * quarter}°` : radiansLabels[quarter + 4],
    };
  });
  const title = active === "sine" ? "Seno" : "Cosseno";
  const props = trigProperties(wave);
  const update = (key: keyof typeof initialParameters, value: number) => {
    setParameters((current) => ({ ...current, [active]: { ...current[active], [key]: value } }));
  };

  return <section className="wave-lab" aria-labelledby={heading}>
    <div className="wave-heading">
      <h3 id={heading}>Ondas de seno e cosseno</h3>
      <div className="wave-selector" role="group" aria-label="Onda exibida">
        {waveKinds.map(({ id, title }) => <button type="button" key={id} aria-pressed={active === id} onClick={() => setActive(id)}>{title}</button>)}
      </div>
    </div>
    <div className="wave-plot">
      <div className="wave-readout">
        <span className="wave-formula">f(θ) = {formula(wave).replaceAll("x", "θ")}</span>
        <span className="wave-value">Valor no ponto <strong>{numberLabel(value)}</strong></span>
      </div>
      <svg className="wave-chart" viewBox="0 0 600 138" role="img" aria-label={`Onda de ${title.toLowerCase()} com o ângulo atual marcado`}>
        {rows.map((y) => {
          const row = position(0, y).y;
          return <line key={y} x1={chart.left} x2={chart.left + chart.width} y1={row} y2={row} className="lab-grid-line" />;
        })}
        {columns.map(({ x, label }) => <line key={label} x1={x} x2={x} y1={chart.top} y2={chart.top + chart.height} className="lab-grid-line" />)}
        <path d={`M${chart.left} ${origin.y}H${chart.left + chart.width} M${origin.x} ${chart.top}V${chart.top + chart.height}`} className="lab-axis" />
        <line x1={cursor.x} x2={cursor.x} y1={chart.top} y2={chart.top + chart.height} className="wave-guide" />
        <path d={path} className="lab-curve" />
        <circle cx={cursor.x} cy={cursor.y} r="9" className="wave-marker-halo" />
        <circle cx={cursor.x} cy={cursor.y} r="5" className="lab-point" />
        {columns.map(({ x, label }) => <text key={label} className="lab-tick" x={x} y="132" textAnchor="middle">{label}</text>)}
        {rows.map((y) => <text key={y} className="lab-tick" x="42" y={position(0, y).y + 4} textAnchor="end">{numberLabel(y)}</text>)}
      </svg>
      <label className="wave-angle">
        <span>Ângulo <strong>{numberLabel(angle)}{unit === "deg" ? "°" : " rad"}</strong></span>
        <input type="range" className="ui-range" aria-label="Ângulo na onda" min={-extent} max={extent} step="any" value={angle}
          aria-valuetext={`${numberLabel(angle)} ${unit === "deg" ? "graus" : "radianos"}`}
          style={{ "--range-fill": `${50 * (1 + angle / extent)}%` } as CSSProperties}
          onChange={(event) => onAngleChange(event.currentTarget.valueAsNumber / scale)} />
      </label>
    </div>
    <details className="wave-parameters">
      <summary><Icon name="properties" size={17} /> Parâmetros da onda <Icon name="down" size={16} /></summary>
      <div className="compact-fields wave-fields">
        <WaveParameter title="Fator A" label="Fator de amplitude A" value={wave.a} min={-10} max={10} onChange={(a) => update("a", a)} />
        <WaveParameter title="Frequência B" label="Fator de frequência B" value={wave.b} min={-8} max={8} onChange={(b) => update("b", b)} />
        <WaveParameter title={`Fase C (${unit === "deg" ? "°" : "rad"})`} label="Fase C" value={wave.phase ?? 0} min={-extent} max={extent}
          step={unit === "deg" ? 1 : 0.01} rangeStep={unit === "deg" ? 1 : "any"} onChange={(phase) => update("phase", phase / scale)} />
        <WaveParameter title="Altura D" label="Deslocamento vertical D" value={wave.c} min={-10} max={10} onChange={(c) => update("c", c)} />
      </div>
      <div className="wave-settings-footer">
        <p className="lab-note">{props.constant ? "Onda constante" : `Amplitude ${numberLabel(props.amplitude)} · período ${numberLabel(props.period!)} ${unit === "deg" ? "graus" : "rad"}`}</p>
        <button type="button" className="secondary-button" onClick={() => setParameters((current) => ({ ...current, [active]: initialParameters }))}>Restaurar {title.toLowerCase()}</button>
      </div>
    </details>
  </section>;
}
