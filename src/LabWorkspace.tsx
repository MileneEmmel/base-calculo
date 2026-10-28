import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { asymptotes, bounds, convertTrigUnit, coordinates, curvePath, curveRoots, derivative, derivativeFormula, domainLabel, evaluate, findZeros, fitView, formula, functionPath, geometricArea, initialView, integral, intervalValid, isTrig, limitAt, numberLabel, plot, riemannRectangles, riemannSum, symmetryAxis, ticks } from "./labMath";
import type { Curve, RiemannMethod, Viewport } from "./labMath";
import { CurveControls, NumericControl, Toggle } from "./LabControls";
import { writeLocal } from "./browserStorage";
import { modes, defaultOptions, readSaved, savedKey } from "./labSaved";
import type { Mode, Options, Snapshot } from "./labSaved";
import type { Topic } from "./types";
import SelectMenu from "./SelectMenu";
import FunctionProperties from "./FunctionProperties";
import CircleLab from "./CircleLab";
import LabSettings from "./LabSettings";
import SavedLab from "./SavedLab";
import { clampRange, coefficientRangeKey, circleStateKey, defaultCircleState, includeCurveRange, readCircleState, readCoefficientRange } from "./labPreferences";
import type { CoefficientRange } from "./labPreferences";
import GeometryLab, { readGeometryPoints } from "./GeometryLab";
import type { Point } from "./geometryMath";

import { experiments } from "./learningExperiments";
import { usePlayback } from "./usePlayback";

const initialCurve: Curve = { kind: "quadratic", a: 1, b: 0, c: 0 };
const comparisonCurve: Curve = { kind: "affine", a: 1, b: 1, c: 0 };
const curveNames = ["f", "g", "h", "p"];
const graphModes: Mode[] = ["functions", "properties", "limits", "derivatives", "integrals"];

export default function Laboratory({ presetId }: { topics?: Topic[]; presetId?: string }) {
  const [mode, setMode] = useState<Mode>("functions");
  const lastGraphMode = useRef<Mode>("functions");
  useEffect(() => { if (graphModes.includes(mode)) lastGraphMode.current = mode; }, [mode]);
  const [coefficientRange, setCoefficientRange] = useState(readCoefficientRange);
  const [circle, setCircle] = useState(readCircleState);
  useEffect(() => { writeLocal(coefficientRangeKey, coefficientRange); }, [coefficientRange]);
  useEffect(() => { writeLocal(circleStateKey, circle); }, [circle]);
  const lastTool = useRef<Mode>("functions");
  useEffect(() => { if (mode !== "saved" && mode !== "inspect") lastTool.current = mode; }, [mode]);
  const boundedCurve = (item: Curve): Curve => ({ ...item, a: clampRange(item.a, coefficientRange), b: clampRange(item.b, coefficientRange), c: clampRange(item.c, coefficientRange) });
  const [curves, setCurves] = useState<Curve[]>(() => [boundedCurve(initialCurve)]);
  const [activeCurve, setActiveCurve] = useState(0);
  const curve = curves[activeCurve];
  const curveName = curveNames[activeCurve];
  const compare = curves.length > 1;
  const secondCurve = curves.find((_, index) => index !== activeCurve) ?? comparisonCurve;
  const setCurve = (next: Curve) => setCurves((current) => current.map((item, index) => index === activeCurve ? boundedCurve(next) : item));
  const addCurve = () => { if (curves.length < 4) { setCurves((current) => [...current, boundedCurve({ ...comparisonCurve, b: current.length })].slice(0, 4)); setActiveCurve(curves.length); } };
  const removeCurve = () => { if (curves.length > 1) { setCurves((current) => current.filter((_, index) => index !== activeCurve)); setActiveCurve(Math.max(0, activeCurve - 1)); } };
  const [pointValue, setPointX] = useState(1);
  const [view, setView] = useState<Viewport>(initialView);
  const [options, setOptions] = useState<Options>(defaultOptions);
  const [limitValue, setLimitX] = useState(0);
  const [distanceValue, setDistance] = useState(0.1);
  const [hValue, setH] = useState(1);
  const [lowerValue, setLower] = useState(0);
  const [upperValue, setUpper] = useState(2);
  const [rectangles, setRectangles] = useState(10);
  const [riemannMethod, setRiemannMethod] = useState<RiemannMethod>("midpoint");
  const [saved, setSaved] = useState(readSaved);
  const [notice, setNotice] = useState("");
  useEffect(() => { if (!notice) return; const timer = window.setTimeout(() => setNotice(""), 6000); return () => window.clearTimeout(timer); }, [notice]);
  const [graphActive, setGraphActive] = useState(false);
  const geometryDraft = useRef<[Point, Point] | null>(null);
  if (!geometryDraft.current) geometryDraft.current = readGeometryPoints();
  const [geometryRevision, setGeometryRevision] = useState(0);
  const rememberGeometry = useCallback((points: [Point, Point]) => { geometryDraft.current = points; }, []);
  useEffect(() => {
    if (!presetId) return;
    const experiment = experiments[presetId];
    if (!experiment) { setNotice("Este experimento não foi encontrado. Você pode explorar livremente."); return; }
    if (experiment.mode === "trigonometry") { setMode("trigonometry"); setCircle(defaultCircleState); return; }
    setCoefficientRange((current) => includeCurveRange(current, experiment.curves));
    if (experiment.geometry) { geometryDraft.current = experiment.geometry; setGeometryRevision((revision) => revision + 1); }
    setCurves(experiment.curves); setActiveCurve(0); setMode(experiment.mode); setView(experiment.view ?? initialView); setPointX(experiment.pointX ?? 1); setLimitX(experiment.limitX ?? 0); setLower(experiment.lower ?? 0); setUpper(experiment.upper ?? 2); setOptions(defaultOptions); setH(1); setRiemannMethod("midpoint"); setNotice(`Experimento: ${experiment.title}.`);
  }, [presetId]);
  const graph = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const drag = useRef<{ pointer: number; x: number; y: number; view: Viewport } | null>(null);
  const clipId = useId();
  const box = bounds(view);
  const xRange = { min: box.xmin, max: box.xmax };
  const windowWidth = box.xmax - box.xmin;
  const pointX = Math.min(box.xmax, Math.max(box.xmin, pointValue));
  const limitX = clampRange(limitValue, xRange), lower = clampRange(lowerValue, xRange), upper = clampRange(upperValue, xRange);
  const h = Math.max(0.001, Math.min(windowWidth, hValue)), distance = Math.max(0.0001, Math.min(windowWidth / 2, distanceValue));
  useEffect(() => {
    const range = { min: box.xmin, max: box.xmax };
    setPointX((current) => clampRange(current, range)); setLimitX((current) => clampRange(current, range)); setLower((current) => clampRange(current, range)); setUpper((current) => clampRange(current, range));
    setH((current) => Math.max(0.001, Math.min(windowWidth, current))); setDistance((current) => Math.max(0.0001, Math.min(windowWidth / 2, current)));
  }, [box.xmin, box.xmax, windowWidth]);
  const pointY = evaluate(curve, pointX);
  const point = coordinates(pointX, pointY, view);
  const origin = coordinates(0, 0, view);
  const slope = derivative(curve, pointX);
  const secantSlope = intervalValid(curve, pointX, pointX + h) ? (evaluate(curve, pointX + h) - pointY) / h : NaN;
  const limits = limitAt(curve, limitX);
  const exactIntegral = integral(curve, lower, upper);
  const area = mode === "integrals" ? geometricArea(curve, lower, upper) : NaN;
  const references = asymptotes(curve), axis = symmetryAxis(curve);
  const derivativePlayback = usePlayback((seconds) => { if (h <= 0.001) { derivativePlayback.stop(); return; } setH((value) => Math.max(0.001, value * Math.exp(-seconds))); });
  useEffect(() => { derivativePlayback.stop(); }, [mode]);
  const changeUnit = (unit: "rad" | "deg") => {
    if ((curve.angleUnit ?? "rad") === unit) return;
    const factor = unit === "deg" ? 180 / Math.PI : Math.PI / 180;
    setCurve(convertTrigUnit(curve, unit));
    setView((current) => { const old = bounds(current); return { ...current, x: current.x * factor, span: Math.min(10000, Math.max(0.05, current.span * factor)), ySpan: (old.ymax - old.ymin) / 2 }; });
    setPointX((x) => x * factor); setLimitX((x) => x * factor);
  };
  const toggle = (key: keyof Options, value: boolean) => setOptions((current) => ({ ...current, [key]: value }));
  const applyCoefficientRange = (range: CoefficientRange) => {
    setCoefficientRange(range);
    setCurves((current) => current.map((item) => ({ ...item, a: clampRange(item.a, range), b: clampRange(item.b, range), c: clampRange(item.c, range) })));
    setNotice(writeLocal(coefficientRangeKey, range) ? `Faixa dos coeficientes: ${numberLabel(range.min)} a ${numberLabel(range.max)}.` : "Faixa aplicada. O navegador não permitiu salvar a preferência.");
  };
  const pan = (x: number, y: number) => setView((current) => { const old = bounds(current); return { ...current, x: current.x + x * current.span / 4, y: current.y + y * (old.ymax - old.ymin) / 8 }; });
  const zoom = (factor: number) => setView((current) => { const span = Math.min(10000, Math.max(0.05, current.span * factor)); return { ...current, span, ...(current.ySpan === undefined ? {} : { ySpan: current.ySpan * span / current.span }) }; });

  useEffect(() => {
    const element = graph.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      if (!graphActive || !svg.current || event.ctrlKey || event.deltaY === 0) return;
      event.preventDefault();
      const rect = svg.current.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width * 800;
      const py = (event.clientY - rect.top) / rect.height * 500;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1);
      setView((current) => {
        const factor = Math.exp(Math.max(-0.4, Math.min(0.4, delta * 0.0015)));
        const span = Math.min(10000, Math.max(0.05, current.span * factor));
        const old = bounds(current);
        const x = old.xmin + (px - plot.left) / plot.width * current.span * 2;
        const y = old.ymax - (py - plot.top) / plot.height * (old.ymax - old.ymin);
        return { x: x + (current.x - x) * span / current.span, y: y + (current.y - y) * span / current.span, span, ...(current.ySpan === undefined ? {} : { ySpan: current.ySpan * span / current.span }) };
      });
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => element.removeEventListener("wheel", wheel);
  }, [graphActive, mode]);

  const important = useMemo(() => {
    if (!options.points) return [];
    const points: { x: number; y: number; label: string }[] = [];
    const zeros = curveRoots(curve, box.xmin, box.xmax);
    zeros.forEach((x) => points.push({ x, y: 0, label: "Raiz" }));
    if (Number.isFinite(evaluate(curve, 0))) points.push({ x: 0, y: evaluate(curve, 0), label: "Eixo y" });
    if (curve.kind === "quadratic" && curve.a !== 0) { const x = -curve.b / (2 * curve.a); points.push({ x, y: evaluate(curve, x), label: "Vértice" }); }
    const merged: typeof points = [];
    points.forEach((point) => {
      const existing = merged.find((p) => Math.abs(p.x - point.x) < 1e-6 && Math.abs(p.y - point.y) < 1e-6);
      if (existing) existing.label += ` · ${point.label}`;
      else merged.push({ ...point });
    });
    return merged;
  }, [curve, box.xmin, box.xmax, options.points]);
  const intersectionResult = useMemo(() => {
    if (!compare || !options.intersections) return { points: [], coincident: false };
    let coincident = false;
    const points = curves.flatMap((other, index) => {
      if (index === activeCurve) return [];
      if (JSON.stringify(curve) === JSON.stringify(other)) { coincident = true; return []; }
      return findZeros((x) => evaluate(curve, x) - evaluate(other, x), (x) => derivative(curve, x) - derivative(other, x), box.xmin, box.xmax).map((x) => ({ x, y: evaluate(curve, x), label: `${curveName} ∩ ${curveNames[index]}` }));
    });
    return { points, coincident };
  }, [curves, activeCurve, curve, curveName, compare, options.intersections, box.xmin, box.xmax]);
  const integralRects = useMemo(() => {
    if (mode !== "integrals" || !Number.isFinite(exactIntegral)) return [];
    return riemannRectangles(curve, lower, upper, rectangles, riemannMethod).filter((rect) => Number.isFinite(rect.y));
  }, [curve, mode, lower, upper, rectangles, exactIntegral, riemannMethod]);
  const sums = mode === "integrals" ? (["left", "right", "midpoint"] as RiemannMethod[]).map((method) => ({ method, value: riemannSum(curve, lower, upper, rectangles, method) })) : [];
  const areaPath = useMemo(() => {
    if (mode !== "integrals" || !Number.isFinite(exactIntegral)) return "";
    const start = coordinates(lower, 0, view), end = coordinates(upper, 0, view);
    return `M${start.x},${start.y} ` + Array.from({ length: 401 }, (_, i) => { const x = lower + (upper - lower) * i / 400; const p = coordinates(x, evaluate(curve, x), view); return `L${p.x},${p.y}`; }).join(" ") + ` L${end.x},${end.y}Z`;
  }, [curve, view, mode, exactIntegral, lower, upper]);

  const reset = () => { setCurves([boundedCurve(initialCurve)]); setActiveCurve(0); setPointX(1); setView(initialView); setOptions(defaultOptions); setLimitX(0); setDistance(0.1); setH(1); setLower(0); setUpper(2); setRectangles(10); setNotice(""); };
  const startDrag = (event: PointerEvent<SVGSVGElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    graph.current?.focus(); setGraphActive(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, view };
  };
  const moveDrag = (event: PointerEvent<SVGSVGElement>) => {
    const start = drag.current;
    if (!start || start.pointer !== event.pointerId) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const units = start.view.span * 2 / (plot.width * rect.width / 800), old = bounds(start.view);
    const unitsY = (old.ymax - old.ymin) / (plot.height * rect.height / 500);
    setView({ ...start.view, x: start.view.x - (event.clientX - start.x) * units, y: start.view.y + (event.clientY - start.y) * unitsY });
  };
  const save = (saveName: string) => {
    const snapshot: Snapshot = { id: crypto.randomUUID(), name: saveName.trim().slice(0, 100) || `Exploração ${saved.length + 1}`, curve, secondCurve, compare, curves, activeCurve, view, pointX, limitX, distance, h, lower, upper, rectangles, riemannMethod, geometry: geometryDraft.current ?? undefined, coefficientRange, circle, options, mode: lastTool.current };
    const next = [snapshot, ...saved].slice(0, 30);
    if (writeLocal(savedKey, next)) { setSaved(next); setNotice("Exploração salva neste navegador."); return true; }
    setNotice("O navegador não permitiu salvar. Verifique se o armazenamento do site está disponível."); return false;
  };
  const restore = (s: Snapshot) => { if (s.mode === "concepts") { window.location.hash = "/mapa"; return; } if (s.geometry) { geometryDraft.current = s.geometry; setGeometryRevision((revision) => revision + 1); } const loadedCurves = s.curves ?? (s.compare ? [s.curve, s.secondCurve] : [s.curve]); setCurves(loadedCurves); setCoefficientRange(includeCurveRange(s.coefficientRange ?? coefficientRange, loadedCurves)); setCircle(s.circle ?? defaultCircleState); setActiveCurve(s.activeCurve ?? 0); setView(s.view); setPointX(s.pointX); setLimitX(s.limitX); setDistance(s.distance); setH(s.h); setLower(s.lower); setUpper(s.upper); setRectangles(s.rectangles); setRiemannMethod(s.riemannMethod ?? "midpoint"); setOptions(s.options); setMode(s.mode === "saved" ? "functions" : s.mode); setNotice(`Exploração “${s.name}” carregada.`); };
  const visible = (x: number, y: number) => Number.isFinite(y) && x >= box.xmin && x <= box.xmax && y >= box.ymin && y <= box.ymax;
  const marker = (x: number, y: number, label: string, style = "lab-special-point") => {
    if (!visible(x, y)) return null;
    const p = coordinates(x, y, view);
    return <g key={`${label}-${x}-${y}`}><circle cx={p.x} cy={p.y} r={5} className={style}><title>{label}: ({numberLabel(x)}; {numberLabel(y)})</title></circle>{options.coordinates && !(isTrig(curve) && label.startsWith("Raiz")) && <text x={Math.min(plot.left + plot.width - 110, Math.max(plot.left + 5, p.x + 10))} y={Math.max(plot.top + 15, p.y - 10)} className="lab-marker-label">{label} ({numberLabel(x)}; {numberLabel(y)})</text>}</g>;
  };

  return <section className="lab-page" aria-labelledby="lab-title">
    <div className="section-heading lab-heading"><div><p className="section-kicker">Laboratório de Matemática</p><h1 id="lab-title">{mode === "trigonometry" ? "Círculo trigonométrico" : mode === "geometry" ? "Geometria analítica" : mode === "concepts" ? "Mapa de conceitos" : mode === "inspect" ? "Configurações" : mode === "saved" ? "Explorações salvas" : "Gráficos de funções"}</h1></div><p>{mode === "trigonometry" ? "Explore o ângulo, suas projeções e as relações entre seno, cosseno e tangente." : mode === "geometry" ? "Mova os pontos e acompanhe as medidas e a equação da reta." : "Escolha uma área para explorar. Cada ferramenta tem seus próprios controles."}</p></div>
    <div className="lab-navigation"><nav className="lab-primary-nav" aria-label="Áreas do Laboratório"><button type="button" className="lab-settings-button" aria-label="Configurações" title="Configurações" aria-current={mode === "inspect" ? "page" : undefined} onClick={() => setMode("inspect")}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="3" />{Array.from({ length: 8 }, (_, i) => <path key={i} d="M12 2v3" transform={`rotate(${i * 45} 12 12)`} strokeWidth="3" />)}</svg></button><button type="button" aria-current={graphModes.includes(mode) ? "page" : undefined} onClick={() => setMode(lastGraphMode.current)}>Gráficos</button>{([{ id: "trigonometry", title: "Círculo trigonométrico" }, { id: "geometry", title: "Geometria" }, { id: "saved", title: `Salvos${saved.length ? ` (${saved.length})` : ""}` }] as { id: Mode; title: string }[]).map((item) => <button type="button" key={item.id} aria-label={item.id === "saved" ? "Salvos" : item.title} aria-current={mode === item.id ? "page" : undefined} onClick={() => setMode(item.id)}>{item.title}</button>)}</nav>{graphModes.includes(mode) && <nav className="lab-tools-nav" aria-label="Ferramentas de gráficos">{modes.filter((item) => graphModes.includes(item.id)).map((item) => <button type="button" key={item.id} aria-current={mode === item.id ? "page" : undefined} onClick={() => setMode(item.id)}>{item.title}</button>)}</nav>}</div>
    {mode === "inspect" ? <LabSettings range={coefficientRange} onApply={applyCoefficientRange} options={options} onToggle={toggle} /> : mode === "trigonometry" ? <CircleLab value={circle} onChange={setCircle} /> : mode === "geometry" ? <GeometryLab key={geometryRevision} initialPoints={geometryDraft.current ?? undefined} onPointsChange={rememberGeometry} /> : mode === "saved" ? <SavedLab saved={saved} onSave={save} onRestore={restore} /> : <div className="lab-layout">
      <div className="lab-workspace">
        <div className="lab-graph-card">
          <div className="lab-graph-header"><h2>Plano de exploração</h2><div className="lab-legend">{curves.map((_, index) => (index === activeCurve ? options.curve : options.second) && <span key={index} className={`lab-legend-${index}`}>{index + 1} · {curveNames[index]}(x){index === activeCurve ? " · ativa" : ""}</span>)}{mode === "derivatives" && <span>Tangente · laranja</span>}</div></div>
          <div className={`lab-graph ${graphActive ? "lab-graph-active" : ""}`} ref={graph} role="group" aria-label="Controles do plano cartesiano" tabIndex={0} onFocus={() => setGraphActive(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setGraphActive(false); }} onKeyDown={(event) => {
            const actions: Record<string, () => void> = { ArrowLeft: () => pan(-1, 0), ArrowRight: () => pan(1, 0), ArrowUp: () => pan(0, 1), ArrowDown: () => pan(0, -1), "+": () => zoom(0.8), "=": () => zoom(0.8), "-": () => zoom(1.25), Home: () => setView(initialView), Escape: () => { setGraphActive(false); graph.current?.blur(); } };
            if (actions[event.key]) { event.preventDefault(); actions[event.key](); }
          }}>
            <svg ref={svg} viewBox="0 0 800 500" role="img" aria-labelledby={`${clipId}-title ${clipId}-description`} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }} onLostPointerCapture={() => { drag.current = null; }}>
              <title id={`${clipId}-title`}>Gráfico de {curves.map((item, index) => `${curveNames[index]}(x) = ${formula(item)}`).join("; ")}</title>
              <desc id={`${clipId}-description`}>Função ativa: {curveName}. Ponto móvel: x = {numberLabel(pointX)}, y = {numberLabel(pointY)}. Janela horizontal de {numberLabel(box.xmin)} a {numberLabel(box.xmax)}.</desc>
              <defs><clipPath id={clipId}><rect x={plot.left} y={plot.top} width={plot.width} height={plot.height} /></clipPath></defs>
              <g clipPath={`url(#${clipId})`}>
                {options.grid && <>{ticks(box.xmin, box.xmax).map((x) => <line key={`x${x}`} x1={coordinates(x, 0, view).x} x2={coordinates(x, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-grid-line" />)}{ticks(box.ymin, box.ymax).map((y) => <line key={`y${y}`} y1={coordinates(0, y, view).y} y2={coordinates(0, y, view).y} x1={plot.left} x2={plot.left + plot.width} className="lab-grid-line" />)}</>}
                <path d={`M${plot.left},${origin.y}H${plot.left + plot.width} M${origin.x},${plot.top}V${plot.top + plot.height}`} className="lab-axis" />
                {options.symmetry && axis !== null && <line x1={coordinates(axis, 0, view).x} x2={coordinates(axis, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-symmetry-axis" />}
                {options.asymptotes && <>{references.vertical !== undefined && <line x1={coordinates(references.vertical, 0, view).x} x2={coordinates(references.vertical, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-asymptote" />}{references.horizontal !== undefined && <line x1={plot.left} x2={plot.left + plot.width} y1={coordinates(0, references.horizontal, view).y} y2={coordinates(0, references.horizontal, view).y} className="lab-asymptote" />}</>}
                {mode === "integrals" && <><path d={areaPath} className="lab-integral-area" />{integralRects.map((rect, i) => { const p = coordinates(Math.min(rect.x, rect.x + rect.width), Math.max(0, rect.y), view); const end = coordinates(Math.max(rect.x, rect.x + rect.width), Math.min(0, rect.y), view); return <rect key={i} x={p.x} y={p.y} width={end.x - p.x} height={end.y - p.y} className="lab-riemann-rect" />; })}</>}
                {curves.map((item, index) => (index === activeCurve ? options.curve : options.second) && <path key={index} d={curvePath(item, view)} className={`lab-curve lab-curve-${index}`} />)}
                {references.hole && visible(references.hole.x, references.hole.y) && <circle cx={coordinates(references.hole.x, references.hole.y, view).x} cy={coordinates(references.hole.x, references.hole.y, view).y} r="7" className="lab-hole"><title>Ponto removido do domínio</title></circle>}
                {mode === "limits" && curve.kind === "piecewise" && curve.example === "jump" && <><circle cx={coordinates(curve.c, curve.a * curve.c + curve.b, view).x} cy={coordinates(curve.c, curve.a * curve.c + curve.b, view).y} r="6" className="lab-hole" />{marker(curve.c, evaluate(curve, curve.c), "Valor da função")}</>}
                {mode === "derivatives" && <>{options.derivative && <path d={functionPath((x) => derivative(curve, x), view, curve.kind === "rational" ? curve.c : undefined)} className="lab-derivative-curve" />}{options.tangent && Number.isFinite(slope) && <path d={functionPath((x) => pointY + slope * (x - pointX), view)} className="lab-tangent" />}{options.secant && Number.isFinite(secantSlope) && <><path d={functionPath((x) => pointY + secantSlope * (x - pointX), view)} className="lab-secant" />{marker(pointX + h, evaluate(curve, pointX + h), "Q")}</>}</>}
                {mode === "limits" && <><line x1={coordinates(limitX, 0, view).x} x2={coordinates(limitX, 0, view).x} y1={plot.top} y2={plot.top + plot.height} className="lab-secant" />{marker(limitX - distance, evaluate(curve, limitX - distance), "Esquerda")}{marker(limitX + distance, evaluate(curve, limitX + distance), "Direita")}</>}
                {important.slice(0, 60).map((p) => marker(p.x, p.y, p.label))}
                {intersectionResult.points.slice(0, 60).map((p) => marker(p.x, p.y, p.label, "lab-intersection-point"))}
                {options.moving && visible(pointX, pointY) && <><path d={`M${point.x},${origin.y}V${point.y}H${origin.x}`} className="lab-point-guide" /><circle cx={point.x} cy={point.y} r={7} className="lab-point"><title>P ({numberLabel(pointX)}; {numberLabel(pointY)})</title></circle></>}
              </g>
              {options.coordinates && <>{ticks(box.xmin, box.xmax).map((x) => <text key={`labelx${x}`} x={coordinates(x, 0, view).x} y={487} textAnchor="middle" className="lab-tick">{numberLabel(x)}</text>)}{ticks(box.ymin, box.ymax).map((y) => <text key={`labely${y}`} x={42} y={coordinates(0, y, view).y + 4} textAnchor="end" className="lab-tick">{numberLabel(y)}</text>)}</>}
              <text x={786} y={487} className="lab-tick">x</text><text x={31} y={15} className="lab-tick">y</text>{isTrig(curve) && <text x="776" y="16" textAnchor="end" className="lab-tick">Eixo x em {curve.angleUnit === "deg" ? "graus" : "radianos"}</text>}
            </svg>
          </div>
          <div className="lab-toolbar" aria-label="Ajustar visualização"><div><button type="button" aria-label="Aproximar gráfico" onClick={() => zoom(0.8)} disabled={view.span <= 0.05}>+</button><button type="button" aria-label="Afastar gráfico" onClick={() => zoom(1.25)} disabled={view.span >= 10000}>−</button><button type="button" onClick={() => setView(initialView)}>Centralizar</button><button type="button" onClick={() => setView((current) => fitView(curve, current))}>Enquadrar função</button></div><div><button type="button" aria-label="Mover janela para a esquerda" onClick={() => pan(-1, 0)}>←</button><button type="button" aria-label="Mover janela para cima" onClick={() => pan(0, 1)}>↑</button><button type="button" aria-label="Mover janela para baixo" onClick={() => pan(0, -1)}>↓</button><button type="button" aria-label="Mover janela para a direita" onClick={() => pan(1, 0)}>→</button></div></div>
          <div className="lab-point-panel"><NumericControl label="Coordenada x do ponto móvel" value={pointX} onChange={setPointX} min={box.xmin} max={box.xmax} rangeStep="any" step={(box.xmax - box.xmin) / 2000} /><div className="lab-point-values">{curves.map((item, index) => <span key={index}>{curveNames[index]}({numberLabel(pointX)}) = <strong>{numberLabel(evaluate(item, pointX))}</strong></span>)}</div>{options.moving && !visible(pointX, pointY) && <p className="lab-note">{Number.isFinite(pointY) ? "O ponto está fora da faixa vertical. Ajuste o enquadramento para encontrá-lo." : "Não há ponto real da função selecionada neste valor de x."}</p>}</div>
        </div>
      </div>
      <aside className="lab-controls" aria-label={`Ferramentas: ${modes.find((item) => item.id === mode)?.title}`}>
        <div className="lab-function-tabs" role="group" aria-label="Selecionar função">{curves.map((_, index) => <button type="button" key={index} aria-label={`Selecionar função ${index + 1}`} aria-pressed={activeCurve === index} onClick={() => setActiveCurve(index)}>{index + 1}</button>)}</div>
        <div className="lab-panel-header"><h2 className="lab-panel-title">{mode === "functions" ? `Função ${activeCurve + 1} · ${curveName}` : modes.find((item) => item.id === mode)?.title}</h2>{mode === "functions" && <div className="lab-function-actions">{compare && <button className="lab-add-curve" type="button" aria-label="Remover função selecionada" onClick={removeCurve} title="Remover função selecionada">−</button>}<button className="lab-add-curve" type="button" aria-label="Adicionar função" disabled={curves.length >= 4} onClick={addCurve} title={curves.length >= 4 ? "Limite de quatro funções" : "Adicionar função"}>+</button></div>}</div>
        {mode === "functions" && <><CurveControls key={activeCurve} curve={curve} onChange={setCurve} name={curveName} onUnitChange={changeUnit} range={coefficientRange} /><p className="lab-note">Edite os parâmetros ou selecione uma família. Até quatro funções no mesmo gráfico.</p></>}
        {mode !== "functions" && <p className="lab-equation">{curveName}(x) = {formula(curve)}</p>}
        {mode === "properties" && <><FunctionProperties curve={curve} /><Toggle label="Desenhar eixo de simetria" checked={options.symmetry} onChange={(value) => toggle("symmetry", value)} /><Toggle label="Mostrar assíntotas" checked={options.asymptotes} onChange={(value) => toggle("asymptotes", value)} /><p className="lab-note">As propriedades de afins e quadráticas valem para todo o domínio. Os pontos desenhados aparecem somente quando cabem na janela.</p></>}
        {mode === "limits" && <><NumericControl label="Valor de aproximação x₀" value={limitX} onChange={setLimitX} min={box.xmin} max={box.xmax} step={0.01} /><NumericControl label="Distância até x₀" value={distance} onChange={setDistance} min={0.0001} max={windowWidth / 2} step={0.0001} /><div className="lab-results"><p>Pela esquerda: <strong>{numberLabel(limits.left)}</strong></p><p>Pela direita: <strong>{numberLabel(limits.right)}</strong></p><p>{!Number.isNaN(limits.left) && limits.left === limits.right ? `Limite bilateral: ${numberLabel(limits.left)}` : "Não há limite bilateral neste ponto."}</p><p>{curveName}(x₀): {numberLabel(evaluate(curve, limitX))}</p></div><p className="lab-note">A distância move os dois pontos de aproximação. Na função racional, experimente x₀ = c para investigar uma assíntota ou um ponto removível.</p><div className="lab-table-scroll"><table className="lab-table"><caption>Aproximações laterais</caption><thead><tr><th>Δx</th><th>f(x₀ − Δx)</th><th>f(x₀ + Δx)</th></tr></thead><tbody>{[1, 0.1, 0.01, 0.001, 0.0001].map((delta) => <tr key={delta}><td>{numberLabel(delta)}</td><td>{numberLabel(evaluate(curve, limitX - delta))}</td><td>{numberLabel(evaluate(curve, limitX + delta))}</td></tr>)}</tbody></table></div></>}
        {mode === "derivatives" && <><p className="lab-equation">{curveName}′(x) = {derivativeFormula(curve)}</p><p className="lab-note">Mova P pelo controle do gráfico. Reduza h para aproximar Q de P.</p><NumericControl label="Distância h entre P e Q" value={h} onChange={setH} min={0.001} max={windowWidth} step={0.001} /><div className="lab-inline-actions"><button type="button" className="secondary-button" disabled={derivativePlayback.reduced || h <= 0.001} onClick={derivativePlayback.toggle}>{derivativePlayback.playing ? "Pausar aproximação" : "Animar aproximação"}</button><button type="button" className="secondary-button" onClick={() => { derivativePlayback.stop(); setH(1); }}>Reiniciar h</button></div>{derivativePlayback.reduced && <p className="lab-note">Movimento reduzido ativo. Ajuste h manualmente.</p>}<Toggle label="Reta tangente" checked={options.tangent} onChange={(value) => toggle("tangent", value)} /><Toggle label="Reta secante" checked={options.secant} onChange={(value) => toggle("secant", value)} /><Toggle label="Curva da derivada" checked={options.derivative} onChange={(value) => toggle("derivative", value)} /><div className="lab-results"><p>Inclinação da tangente: <strong>{numberLabel(slope)}</strong></p><p>Inclinação da secante: <strong>{numberLabel(secantSlope)}</strong></p><p>{curveName}′({numberLabel(pointX)}) = {numberLabel(slope)}</p></div><p className="lab-note">A secante se aproxima da tangente onde a derivada existe. Tangente: laranja; secante: tracejado; derivada: vermelho.</p></>}
        {mode === "integrals" && <><NumericControl label="Limite inferior" value={lower} onChange={setLower} min={box.xmin} max={box.xmax} step={0.1} /><NumericControl label="Limite superior" value={upper} onChange={setUpper} min={box.xmin} max={box.xmax} step={0.1} /><NumericControl label="Quantidade de retângulos" value={rectangles} onChange={(value) => setRectangles(Math.round(value))} min={2} max={200} step={1} /><SelectMenu label="Método dos retângulos" value={riemannMethod} options={[{ value: "left", label: "Soma à esquerda" }, { value: "right", label: "Soma à direita" }, { value: "midpoint", label: "Ponto médio" }]} onChange={(method) => setRiemannMethod(method as RiemannMethod)} /><div className="lab-results"><p>Integral por primitiva: <strong>{numberLabel(exactIntegral)}</strong></p><p>Área geométrica: <strong>{numberLabel(area)}</strong></p></div><div className="lab-table-scroll"><table className="lab-table"><caption>Σ → ∫ · comparar aproximações</caption><thead><tr><th>Método</th><th>Soma</th><th>Erro absoluto</th></tr></thead><tbody>{sums.map((sum) => <tr key={sum.method} className={sum.method === riemannMethod ? "is-selected" : ""}><th>{sum.method === "left" ? "Esquerda" : sum.method === "right" ? "Direita" : "Ponto médio"}</th><td>{numberLabel(sum.value)}</td><td>{numberLabel(Math.abs(sum.value - exactIntegral))}</td></tr>)}</tbody></table></div><p className="lab-note">A integral é orientada e contabiliza sinais; a área geométrica é não negativa. Esquerda e direita se referem ao eixo x, mesmo com limites invertidos. Os valores são arredondados; o erro nem sempre diminui a cada aumento de n.</p>{!Number.isFinite(exactIntegral) && <p className="lab-note">Escolha um intervalo no domínio da função, sem polos ou pontos removidos. Integrais impróprias não são calculadas aqui.</p>}</>}
        <div className="lab-panel-actions"><button type="button" className="secondary-button" onClick={() => setMode("functions")}>Editar funções</button><button type="button" className="secondary-button" onClick={reset}>Recomeçar exploração</button></div>
      </aside>
    </div>}
    {notice && <p className="lab-save-notice" role="status">{notice}</p>}
  </section>;
}
