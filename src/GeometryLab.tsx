import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { bounds, coordinates, functionPath, numberLabel, plot, ticks } from "./labMath";
import type { Viewport } from "./labMath";
import { geometryOf } from "./geometryMath";
import type { Point } from "./geometryMath";
import { NumericControl } from "./LabControls";
import { writeLocal } from "./browserStorage";

const defaultPoints: [Point, Point] = [{ x: 2, y: 3 }, { x: 7, y: 8 }];
export function readGeometryPoints(): [Point, Point] {
  try { const data = JSON.parse(localStorage.getItem("integra-geometry-v1") ?? "null"); if (Array.isArray(data) && data.length === 2 && data.every((p) => p && [p.x, p.y].every((n) => Number.isFinite(n) && Math.abs(n) <= 1e6))) return data as [Point, Point]; } catch { /* Start with the example when storage is unavailable. */ }
  return defaultPoints;
}
function frame(points: [Point, Point]): Viewport {
  const g = geometryOf(...points);
  return { x: g.midpoint.x, y: g.midpoint.y, span: Math.max(5, Math.abs(points[0].x - points[1].x) * 0.8), ySpan: Math.max(4, Math.abs(points[0].y - points[1].y) * 0.8) };
}

export default function GeometryLab({ initialPoints, onPointsChange }: { initialPoints?: [Point, Point]; onPointsChange?: (points: [Point, Point]) => void }) {
  const [points, setPoints] = useState<[Point, Point]>(() => initialPoints ?? readGeometryPoints());
  const [view, setView] = useState(() => frame(initialPoints ?? readGeometryPoints()));
  const [stored, setStored] = useState(true);
  const dragging = useRef<number | null>(null);
  const clip = useId();
  const result = geometryOf(...points), box = bounds(view), origin = coordinates(0, 0, view);
  useEffect(() => { setStored(writeLocal("integra-geometry-v1", points)); onPointsChange?.(points); }, [points, onPointsChange]);
  const update = (index: number, point: Point) => setPoints((current) => current.map((p, i) => i === index ? point : p) as [Point, Point]);
  const zoom = (factor: number) => setView((current) => { const span = Math.max(0.05, Math.min(10000, current.span * factor)); return { ...current, span, ySpan: (current.ySpan ?? 5) * span / current.span }; });
  const move = (event: PointerEvent<SVGSVGElement>) => {
    if (dragging.current === null) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width * 800, py = (event.clientY - rect.top) / rect.height * 500;
    const x = box.xmin + (px - plot.left) / plot.width * (box.xmax - box.xmin), y = box.ymax - (py - plot.top) / plot.height * (box.ymax - box.ymin);
    update(dragging.current, { x: Math.min(box.xmax, Math.max(box.xmin, x)), y: Math.min(box.ymax, Math.max(box.ymin, y)) });
  };
  return <div className="lab-layout">
    <div className="lab-workspace"><section className="lab-graph-card"><div className="lab-graph-header"><h2>Geometria analítica</h2><button type="button" className="secondary-button" onClick={() => setView(frame(points))}>Enquadrar pontos</button></div>
      <div className="lab-graph"><svg viewBox="0 0 800 500" role="group" aria-label="Plano com dois pontos arrastáveis" onPointerMove={move} onPointerUp={() => { dragging.current = null; }} onPointerCancel={() => { dragging.current = null; }} onLostPointerCapture={() => { dragging.current = null; }}>
        <defs><clipPath id={clip}><rect x={plot.left} y={plot.top} width={plot.width} height={plot.height} /></clipPath></defs>
        <g clipPath={`url(#${clip})`}>{ticks(box.xmin, box.xmax).map((x) => <line key={`x${x}`} x1={coordinates(x, 0, view).x} x2={coordinates(x, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-grid-line" />)}{ticks(box.ymin, box.ymax).map((y) => <line key={`y${y}`} x1={plot.left} x2={plot.left + plot.width} y1={coordinates(0, y, view).y} y2={coordinates(0, y, view).y} className="lab-grid-line" />)}
          <path d={`M${plot.left},${origin.y}H${plot.left + plot.width} M${origin.x},${plot.top}V${plot.top + plot.height}`} className="lab-axis" />
          {!result.coincident && (result.vertical ? <line x1={coordinates(points[0].x, 0, view).x} x2={coordinates(points[0].x, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-curve" /> : <path d={functionPath((x) => result.slope! * x + result.intercept!, view)} className="lab-curve" />)}
          {points.map((point, index) => { const p = coordinates(point.x, point.y, view); return <g key={index} role="button" tabIndex={0} aria-label={`Ponto P${index + 1}: (${numberLabel(point.x)}; ${numberLabel(point.y)}). Use as setas para mover.`} className="lab-draggable-point" onPointerDown={(event) => { event.preventDefault(); event.currentTarget.focus({ preventScroll: true }); dragging.current = index; event.currentTarget.ownerSVGElement?.setPointerCapture(event.pointerId); }} onKeyDown={(event) => {
            const delta = event.shiftKey ? 1 : 0.1;
            const movements: Record<string, [number, number]> = { ArrowLeft: [-delta, 0], ArrowRight: [delta, 0], ArrowUp: [0, delta], ArrowDown: [0, -delta] };
            if (movements[event.key]) { event.preventDefault(); const [dx, dy] = movements[event.key]; update(index, { x: Math.max(box.xmin, Math.min(box.xmax, point.x + dx)), y: Math.max(box.ymin, Math.min(box.ymax, point.y + dy)) }); }
          }}><circle cx={p.x} cy={p.y} r="16" fill="transparent" /><circle cx={p.x} cy={p.y} r="7" className={index === 0 ? "lab-point" : "lab-intersection-point"} /><text x={p.x + 12} y={p.y - 12} className="lab-marker-label">P{index + 1} ({numberLabel(point.x)}; {numberLabel(point.y)})</text></g>; })}
          {(() => { const p = coordinates(result.midpoint.x, result.midpoint.y, view); return <g><circle cx={p.x} cy={p.y} r="4" className="lab-special-point" /><text x={p.x + 10} y={p.y + 20} className="lab-marker-label">M</text></g>; })()}
        </g>{ticks(box.xmin, box.xmax).map((x) => <text key={x} x={coordinates(x, 0, view).x} y="487" textAnchor="middle" className="lab-tick">{numberLabel(x)}</text>)}{ticks(box.ymin, box.ymax).map((y) => <text key={y} x="42" y={coordinates(0, y, view).y + 4} textAnchor="end" className="lab-tick">{numberLabel(y)}</text>)}</svg></div>
      <div className="lab-toolbar"><div><button type="button" aria-label="Aproximar geometria" onClick={() => zoom(0.8)}>+</button><button type="button" aria-label="Afastar geometria" onClick={() => zoom(1.25)}>−</button></div></div>
      <p className="lab-note">Arraste P₁ e P₂, edite as coordenadas ou foque um ponto e use as setas. Shift aumenta o passo. M é o ponto médio. Se os pontos coincidirem, separe-os pelos campos numéricos.</p>
    </section></div>
    <aside className="lab-controls" aria-label="Ferramentas de geometria"><h2 className="lab-panel-title">Dois pontos, uma reta</h2>{points.map((point, index) => <fieldset className="lab-curve-controls" key={index}><legend>P{index + 1}</legend><NumericControl label={`x de P${index + 1}`} value={point.x} min={box.xmin} max={box.xmax} step={0.01} onChange={(x) => update(index, { ...point, x })} /><NumericControl label={`y de P${index + 1}`} value={point.y} min={box.ymin} max={box.ymax} step={0.01} onChange={(y) => update(index, { ...point, y })} /></fieldset>)}
      <dl className="lab-properties"><div><dt>Distância</dt><dd>{numberLabel(result.distance)}</dd></div><div><dt>Ponto médio</dt><dd>({numberLabel(result.midpoint.x)}; {numberLabel(result.midpoint.y)})</dd></div><div><dt>Coeficiente angular</dt><dd>{result.coincident ? "Pontos coincidentes: reta indeterminada." : result.vertical ? "Não definido: reta vertical." : numberLabel(result.slope!)}</dd></div><div><dt>Equação da reta</dt><dd>{result.coincident ? "Não há uma única reta definida pelos pontos." : result.vertical ? `x = ${numberLabel(points[0].x)}` : `y = ${numberLabel(result.slope!)}x ${result.intercept! >= 0 ? "+" : "−"} ${numberLabel(Math.abs(result.intercept!))}`}</dd></div></dl>
      {!stored && <p role="status" className="lab-note">O navegador não permitiu guardar os pontos.</p>}
    </aside>
  </div>;
}
