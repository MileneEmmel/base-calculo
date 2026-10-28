import { useRef } from "react";
import type { PointerEvent } from "react";
import type { CircleState } from "./labPreferences";
import { circleValues, defaultCircleState } from "./labPreferences";
import { numberLabel } from "./labMath";
import { NumericControl, Toggle } from "./LabControls";
import SelectMenu from "./SelectMenu";
import { usePlayback } from "./usePlayback";

export default function CircleLab({ value, onChange }: { value: CircleState; onChange: (value: CircleState) => void }) {
  const { radians, unit, projections } = value;
  const values = circleValues(radians), degrees = radians * 180 / Math.PI, extent = unit === "deg" ? 360 : 2 * Math.PI;
  const drag = useRef(false);
  const px = 300 + values.cosine * 210, py = 300 - values.sine * 210;
  const setRadians = (next: number) => onChange({ ...value, radians: Math.max(-2 * Math.PI, Math.min(2 * Math.PI, next)) });
  const animation = usePlayback((seconds) => { const next = radians + seconds * Math.PI / 6; setRadians(next > 2 * Math.PI ? next - 2 * Math.PI : next); });
  const pickAngle = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 600 - 300;
    const y = 300 - (event.clientY - rect.top) / rect.height * 600;
    if (Math.hypot(x, y) < 12) return;
    animation.stop(); const angle = Math.atan2(y, x); setRadians(angle < 0 ? angle + 2 * Math.PI : angle);
  };
  const angleEnd = { x: 300 + Math.cos(radians) * 60, y: 300 - Math.sin(radians) * 60 };
  return <section className="circle-lab-layout" aria-label="Área do círculo trigonométrico"><div className="lab-graph-card circle-stage"><div className="lab-graph-header"><h2>Círculo trigonométrico</h2><span className="circle-radius-label">Raio 1</span></div><svg viewBox="0 0 600 600" className="circle-stage-svg" role="group" aria-label="Círculo unitário interativo" onPointerDown={(event) => { if (event.button !== 0) return; drag.current = true; event.currentTarget.setPointerCapture(event.pointerId); pickAngle(event); }} onPointerMove={(event) => { if (drag.current) pickAngle(event); }} onPointerUp={() => { drag.current = false; }} onPointerCancel={() => { drag.current = false; }} onLostPointerCapture={() => { drag.current = false; }}>
    <path d="M45 300H555 M300 45V555" className="lab-axis" /><circle cx="300" cy="300" r="210" className="lab-circle-outline" />
    {[-1, 1].map((sign) => <g key={sign}><text x={300 + sign * 210} y="324" textAnchor="middle" className="circle-label">{sign}</text><text x="282" y={305 - sign * 210} textAnchor="end" className="circle-label">{sign}</text></g>)}
    <text x="540" y="287" className="circle-label">cos θ</text><text x="313" y="58" className="circle-label">sen θ</text><text x="470" y="270" className="circle-angle-label">{unit === "deg" ? "0°" : "0"}</text><text x="313" y="113" className="circle-angle-label">{unit === "deg" ? "90°" : "π/2"}</text><text x="96" y="270" className="circle-angle-label">{unit === "deg" ? "180°" : "π"}</text><text x="313" y="495" className="circle-angle-label">{unit === "deg" ? "270°" : "3π/2"}</text>
    <text x="415" y="175" className="circle-quadrant">I</text><text x="180" y="175" className="circle-quadrant">II</text><text x="175" y="435" className="circle-quadrant">III</text><text x="410" y="435" className="circle-quadrant">IV</text>
    {Math.abs(radians) >= 2 * Math.PI - 1e-8 ? <circle cx="300" cy="300" r="60" className="circle-angle-sector" /> : <path d={`M300 300L360 300A60 60 0 ${Math.abs(radians) > Math.PI ? 1 : 0} ${radians >= 0 ? 0 : 1} ${angleEnd.x} ${angleEnd.y}Z`} className="circle-angle-sector" />}
    {projections && <><path d={`M300 300H${px}`} className="circle-cos-projection" /><path d={`M${px} 300V${py}H300`} className="circle-sin-projection" /></>}
    <path d={`M300 300L${px} ${py}`} className="lab-curve" />
    <g role="button" tabIndex={0} aria-label={`Ponto no círculo: cosseno ${numberLabel(values.cosine)}, seno ${numberLabel(values.sine)}. Use as setas para mudar o ângulo.`} className="lab-draggable-point" onKeyDown={(event) => { if (!["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp"].includes(event.key)) return; event.preventDefault(); animation.stop(); const step = (event.shiftKey ? 5 : 1) * Math.PI / 180; setRadians(radians + (["ArrowLeft", "ArrowDown"].includes(event.key) ? -step : step)); }}><circle cx={px} cy={py} r="18" fill="transparent" /><circle cx={px} cy={py} r="8" className="lab-point" /><title>P = ({numberLabel(values.cosine)}; {numberLabel(values.sine)})</title></g>
    <text x="313" y="287" className="circle-label">θ</text>
  </svg><p className="circle-stage-caption">Arraste o ponto ou clique no círculo para mudar o ângulo.</p><div className="circle-readout"><span>θ = <strong>{numberLabel(degrees)}°</strong></span><span><strong>{numberLabel(radians)}</strong> rad</span><span>P = <strong>({numberLabel(values.cosine)}; {numberLabel(values.sine)})</strong></span></div></div>
    <aside className="lab-controls circle-controls" aria-label="Controles do círculo"><h2>Ângulo e medidas</h2><SelectMenu label="Unidade do ângulo" value={unit} options={[{ value: "deg", label: "Graus" }, { value: "rad", label: "Radianos" }]} onChange={(next) => onChange({ ...value, unit: next as "deg" | "rad" })} /><NumericControl label={unit === "deg" ? "Ângulo θ (graus)" : "Ângulo θ (radianos)"} value={unit === "deg" ? degrees : radians} min={-extent} max={extent} step={unit === "deg" ? 1 : 0.01} rangeStep="any" onChange={(angle) => { animation.stop(); setRadians(unit === "deg" ? angle * Math.PI / 180 : angle); }} /><div className="circle-shortcuts" aria-label="Ângulos de referência">{[0, 30, 45, 60, 90, 180, 270, 360].map((angle) => <button type="button" key={angle} onClick={() => { animation.stop(); setRadians(angle * Math.PI / 180); }}>{angle}°</button>)}</div><div className="lab-inline-actions"><button type="button" className="primary-button" disabled={animation.reduced} onClick={animation.toggle}>{animation.playing ? "Pausar círculo" : "Animar círculo"}</button><button type="button" className="secondary-button" onClick={() => { animation.stop(); onChange(defaultCircleState); }}>Reiniciar</button></div><Toggle label="Mostrar projeções de seno e cosseno" checked={projections} onChange={(next) => onChange({ ...value, projections: next })} /><dl className="lab-properties"><div><dt>Cosseno · coordenada x</dt><dd>{numberLabel(values.cosine)}</dd></div><div><dt>Seno · coordenada y</dt><dd>{numberLabel(values.sine)}</dd></div><div><dt>Tangente · sen θ / cos θ</dt><dd>{values.tangent === null ? "Não definida: cos θ = 0." : numberLabel(values.tangent)}</dd></div><div><dt>Posição</dt><dd>{values.quadrant === null ? "Sobre um dos eixos." : `${values.quadrant}º quadrante`}</dd></div></dl>{animation.reduced && <p className="lab-note">Movimento reduzido ativo. Use o ângulo ou os atalhos para explorar sem animação.</p>}</aside></section>;
}
