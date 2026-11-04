import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { bounds, coordinates, numberLabel, plot, ticks } from "./labMath";
import type { Viewport } from "./labMath";
import { circleGeometry, ellipseGeometry, geometryOf, insertPolygonVertex, maxPolygonVertices, movePointDrag, originPoint, polygonGeometry, presetPolygon, regularPolygon, startPointDrag, vectorMeasurement, vectorOperations } from "./geometryMath";
import type { Point, PointDrag, PolygonPreset } from "./geometryMath";
import { NumericField } from "./LabControls";
import SelectMenu from "./SelectMenu";
import Icon from "./Icon";

export const defaultGeometryPoints: [Point, Point] = [{ x: 2, y: 3 }, { x: 7, y: 8 }];
const initialVectors: [Point, Point] = [{ x: 3, y: 1 }, { x: 1, y: 3 }];
const initialVertices: Point[] = [{ x: -2, y: -1 }, { x: 3, y: 1 }, { x: -1, y: 3 }];
const tools = [{ id: "line", title: "Reta" }, { id: "vectors", title: "Vetores" }, { id: "shapes", title: "Formas geométricas" }] as const;
const shapes = [{ value: "triangle", label: "Triângulo" }, { value: "rectangle", label: "Quadrilátero" }, { value: "polygon", label: "Polígono livre" }, { value: "circle", label: "Círculo" }, { value: "ellipse", label: "Elipse" }];
const trianglePresets = [{ value: "equilateral", label: "Equilátero" }, { value: "isosceles", label: "Isósceles" }, { value: "scalene", label: "Escaleno" }];
const quadrilateralPresets = [{ value: "square", label: "Quadrado" }, { value: "rhombus", label: "Losango" }, { value: "rectangle", label: "Retângulo" }, { value: "trapezoid", label: "Trapézio" }];
const operations = [{ value: "sum", label: "Soma u + v" }, { value: "scale", label: "Multiplicação por escalar k · u" }, { value: "dot", label: "Produto escalar u · v" }, { value: "cross", label: "Produto vetorial u × v" }];
type Tool = (typeof tools)[number]["id"];
type Operation = "sum" | "scale" | "dot" | "cross";
type Figure = "triangle" | "rectangle" | "polygon" | "circle" | "ellipse";
type Drag = { pointer: number; index: number; motion: PointDrag };
const vectorNames = ["u", "v"];
const formatPoint = ({ x, y }: Point) => `(${numberLabel(x)}; ${numberLabel(y)})`;
function measureFigure(shape: Figure, vertices: Point[]): ReturnType<typeof circleGeometry> | ReturnType<typeof ellipseGeometry> | ReturnType<typeof polygonGeometry> {
  if (shape === "circle") return circleGeometry(vertices[0], vertices[1]);
  if (shape === "ellipse") return ellipseGeometry(vertices[0], vertices[1], vertices[2]);
  return polygonGeometry(vertices);
}

function frame(points: Point[]): Viewport {
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
  const left = Math.min(...xs), right = Math.max(...xs), bottom = Math.min(...ys), top = Math.max(...ys);
  return { x: (left + right) / 2, y: (bottom + top) / 2, span: Math.max(4, (right - left) * 0.72, (top - bottom) * 0.72 * plot.width / plot.height) };
}

function PointFields({ point, label, onChange, slider, fixedAxis }: {
  point: Point; label: string; onChange: (point: Point, reframe: boolean) => void;
  slider?: ReturnType<typeof bounds>; fixedAxis?: keyof Point;
}) {
  return <div className="geometry-point-row" role="group" aria-label={label}>
    <strong>{label}</strong>
    {(["x", "y"] as const).map((axis) => {
      const min = slider ? Math.min(slider[`${axis}min`], point[axis]) : 0;
      const max = slider ? Math.max(slider[`${axis}max`], point[axis]) : 1;
      const coordinateLabel = `${axis} de ${label}`;
      return <div key={axis} className="geometry-coordinate">
        <label>{axis}{axis === fixedAxis
          ? <input type="number" aria-label={coordinateLabel} value={Number(point[axis].toPrecision(10))} readOnly />
          : <NumericField label={coordinateLabel} value={point[axis]} min={-10000} max={10000} onChange={(value) => onChange({ ...point, [axis]: value }, true)} />}
        </label>
        {slider && <input type="range" className="ui-range geometry-slider"
          aria-label={`Ajustar ${coordinateLabel}`} aria-valuetext={numberLabel(point[axis])}
          min={min} max={max} step="any" value={point[axis]}
          style={{ "--range-fill": `${100 * (point[axis] - min) / (max - min)}%` } as CSSProperties}
          onChange={(event) => onChange({ ...point, [axis]: event.currentTarget.valueAsNumber }, false)} />}
      </div>;
    })}
  </div>;
}

export default function GeometryLab({ initialPoints = defaultGeometryPoints, onPointsChange, primaryNavigation }: {
  initialPoints?: [Point, Point]; onPointsChange?: (points: [Point, Point]) => void; primaryNavigation: ReactNode;
}) {
  const [tool, setTool] = useState<Tool>("line");
  const [points, setPoints] = useState(initialPoints);
  const [vectors, setVectors] = useState(initialVectors);
  const [figures, setFigures] = useState<Record<Figure, Point[]>>(() => ({
    triangle: initialVertices, rectangle: presetPolygon("rectangle", initialVertices),
    polygon: regularPolygon(insertPolygonVertex(insertPolygonVertex(initialVertices))),
    circle: [{ x: 0, y: 0 }, { x: 3, y: 0 }],
    ellipse: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 2 }],
  }));
  const [trianglePreset, setTrianglePreset] = useState<PolygonPreset>("scalene");
  const [quadrilateralPreset, setQuadrilateralPreset] = useState<PolygonPreset>("rectangle");
  const [operation, setOperation] = useState<Operation>("sum");
  const [scalar, setScalar] = useState(2);
  const [shape, setShape] = useState<Figure>("triangle");
  const [view, setView] = useState(() => frame(initialPoints));
  const dragging = useRef<Drag | null>(null);
  const id = useId();
  useEffect(() => { onPointsChange?.(points); }, [points, onPointsChange]);

  const result = geometryOf(...points);
  const vector = vectorOperations(...vectors, scalar);
  const vertices = figures[shape];
  const figure = measureFigure(shape, vertices);
  const ellipse = "radiusX" in figure ? figure : null;
  const isPolygon = shape !== "circle" && shape !== "ellipse";
  const vectorResult = operation === "sum" ? vector.sum : operation === "scale" ? vector.scaled : null;
  const measurement = vectorResult ? vectorMeasurement(vectorResult) : null;
  const box = bounds(view);
  const pos = (p: Point) => coordinates(p.x, p.y, view);
  const origin = pos(originPoint);
  const editable = tool === "line" ? points : tool === "vectors" ? vectors : vertices;
  const names = tool === "line" ? ["P1", "P2"] : tool === "vectors" ? vectorNames : shape === "circle" ? ["Centro", "Borda"] : shape === "ellipse" ? ["Centro", "Eixo x", "Eixo y"] : shape === "polygon" ? vertices.map((_, i) => `P${i + 1}`) : ["A", "B", "C", "D"];
  const extent = (mode: Tool) => mode === "line" ? points : mode === "vectors" ? [originPoint, ...vectors, ...(vectorResult ? [vectorResult] : [])] : figure.extent;
  const vectorFrame = (next: [Point, Point], op = operation, k = scalar) => {
    const result = vectorOperations(...next, k);
    return frame([originPoint, ...next, ...(op === "sum" ? [result.sum] : op === "scale" ? [result.scaled] : [])]);
  };
  const updateFigure = (nextShape: Figure, next: Point[], reframe = true) => {
    setFigures((current) => ({ ...current, [nextShape]: next }));
    if (reframe) setView(frame(measureFigure(nextShape, next).extent));
  };
  const applyPreset = (preset: PolygonPreset) => {
    if (shape === "triangle") setTrianglePreset(preset);
    if (shape === "rectangle") setQuadrilateralPreset(preset);
    updateFigure(shape, presetPolygon(preset, vertices));
  };
  const useFreePolygon = (next: Point[]) => {
    setShape("polygon");
    updateFigure("polygon", next);
  };
  const resizePolygon = (count: number) => {
    const size = Math.round(count);
    if (size === vertices.length) return;
    let next = vertices.slice(0, size);
    while (next.length < size) next = insertPolygonVertex(next);
    useFreePolygon(next);
  };
  const update = (index: number, point: Point, reframe = false) => {
    if (tool === "line") {
      const next: [Point, Point] = [...points];
      next[index] = point;
      setPoints(next);
      if (reframe) setView(frame(next));
    } else if (tool === "vectors") {
      const next: [Point, Point] = [...vectors];
      next[index] = point;
      setVectors(next);
      if (reframe) setView(vectorFrame(next));
    } else {
      const next = [...vertices];
      next[index] = point;
      if (shape === "ellipse") {
        const [center, horizontal, vertical] = vertices;
        if (index === 0) {
          next[1] = { x: point.x + horizontal.x - center.x, y: point.y };
          next[2] = { x: point.x, y: point.y + vertical.y - center.y };
        } else if (index === 1) {
          next[1] = { x: point.x, y: center.y };
        } else {
          next[2] = { x: center.x, y: point.y };
        }
      }
      updateFigure(shape, next, reframe);
    }
  };
  const zoom = (factor: number) => setView((current) => ({ ...current, span: Math.max(0.05, Math.min(1000000, current.span * factor)) }));
  const bounded = (p: Point) => ({ x: Math.min(box.xmax, Math.max(box.xmin, p.x)), y: Math.min(box.ymax, Math.max(box.ymin, p.y)) });
  const move = (event: PointerEvent<SVGSVGElement>) => {
    const drag = dragging.current;
    if (drag?.pointer !== event.pointerId) return;
    const matrix = event.currentTarget.getScreenCTM();
    if (!matrix) return;
    const cursor = { x: event.clientX, y: event.clientY };
    const scale = 2 * view.span / plot.width;
    const motion = movePointDrag(drag.motion, cursor, event.shiftKey, { x: scale / matrix.a, y: scale / matrix.d }, bounded);
    if (motion.last !== drag.motion.last) update(drag.index, motion.last);
    drag.motion = motion;
  };
  const arrow = (end: Point, index: number, label: string) => {
    const p = pos(end);
    return <g className={`geometry-vector geometry-vector-${index}`}>
      <line x1={origin.x} y1={origin.y} x2={p.x} y2={p.y} markerEnd={`url(#${id}-arrow-${index})`} />
      {index === 2 && <text x={p.x + 10} y={p.y - 10} className="lab-marker-label">{label}</text>}
    </g>;
  };
  const lineStart = result.vertical ? pos({ x: points[0].x, y: box.ymin }) : pos({ x: box.xmin, y: result.slope! * box.xmin + result.intercept! });
  const lineEnd = result.vertical ? pos({ x: points[0].x, y: box.ymax }) : pos({ x: box.xmax, y: result.slope! * box.xmax + result.intercept! });
  const midpoint = pos(result.midpoint);
  const shapeName = shapes.find((item) => item.value === shape)?.label;
  const center = pos(vertices[0]);
  const unitsToPixels = plot.width / (2 * view.span);
  return <>
    <div className="lab-navigation">
      {primaryNavigation}
      <nav className="lab-tools-nav" aria-label="Ferramentas de geometria">
        {tools.map(({ id, title }) => <button type="button" key={id} aria-current={tool === id ? "page" : undefined} onClick={() => { setTool(id); setView(frame(extent(id))); }}>
          <Icon name={id} />{title}
        </button>)}
      </nav>
    </div>
    <div className="lab-layout geometry-layout">
      <section className="lab-graph-card">
        <div className="lab-graph-header"><h2>{tool === "line" ? "Dois pontos e uma reta" : tool === "vectors" ? "Vetores no plano" : shapeName}</h2><button type="button" className="secondary-button" onClick={() => setView(frame(extent(tool)))}>Enquadrar</button></div>
        <div className="lab-graph geometry-graph">
          <svg viewBox="0 0 800 500" role="group" aria-label="Plano cartesiano com pontos arrastáveis"
            onPointerMove={move} onPointerUp={() => { dragging.current = null; }} onPointerCancel={() => { dragging.current = null; }} onLostPointerCapture={() => { dragging.current = null; }}>
            <defs>
              <clipPath id={id}><rect x={plot.left} y={plot.top} width={plot.width} height={plot.height} /></clipPath>
              {[0, 1, 2].map((index) => <marker key={index} id={`${id}-arrow-${index}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0 10 5 0 10z" className={`geometry-arrow-${index}`} /></marker>)}
            </defs>
            <g clipPath={`url(#${id})`}>
              {ticks(box.xmin, box.xmax).map((x) => <line key={`x${x}`} x1={pos({ x, y: 0 }).x} x2={pos({ x, y: 0 }).x} y1={plot.top} y2={plot.top + plot.height} className="lab-grid-line" />)}
              {ticks(box.ymin, box.ymax).map((y) => <line key={`y${y}`} x1={plot.left} x2={plot.left + plot.width} y1={pos({ x: 0, y }).y} y2={pos({ x: 0, y }).y} className="lab-grid-line" />)}
              <path d={`M${plot.left},${origin.y}H${plot.left + plot.width} M${origin.x},${plot.top}V${plot.top + plot.height}`} className="lab-axis" />
              {tool === "line" && <>
                {!result.coincident && <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} className="lab-curve" />}
                <circle cx={midpoint.x} cy={midpoint.y} r="5" className="lab-special-point" /><text x={midpoint.x + 10} y={midpoint.y + 20} className="lab-marker-label">M</text>
              </>}
              {tool === "vectors" && <>
                {operation === "sum" && <polyline points={[vectors[0], vector.sum, vectors[1]].map(pos).map(({ x, y }) => `${x},${y}`).join(" ")} className="lab-secant" fill="none" />}
                {arrow(vectors[0], 0, "u")}{arrow(vectors[1], 1, "v")}{vectorResult && arrow(vectorResult, 2, operation === "sum" ? "u + v" : "k · u")}
              </>}
              {tool === "shapes" && <>
                {isPolygon && <polygon points={figure.vertices.map(pos).map(({ x, y }) => `${x},${y}`).join(" ")} className="geometry-shape" />}
                {figure.radius !== null && <circle cx={center.x} cy={center.y} r={figure.radius * unitsToPixels} className="geometry-shape" />}
                {ellipse && <ellipse cx={center.x} cy={center.y} rx={ellipse.radiusX * unitsToPixels} ry={ellipse.radiusY * unitsToPixels} className="geometry-shape" />}
                {!isPolygon && vertices.slice(1).map((point, index) => {
                  const edge = pos(point);
                  return <line key={index} x1={center.x} y1={center.y} x2={edge.x} y2={edge.y} className="lab-secant" />;
                })}
                {ellipse && ellipse.foci.map((focus, i) => {
                  const coincident = ellipse.radiusX === ellipse.radiusY;
                  if (coincident && i > 0) return null;
                  const { x, y } = pos(focus);
                  const label = coincident ? "F₁ = F₂" : i === 0 ? "F₁" : "F₂";
                  return <g key={i} className="geometry-focus">
                    <title>{label} {formatPoint(focus)}</title>
                    <circle cx={x} cy={y} r={coincident ? 10 : 5} className={coincident ? "geometry-focus-ring" : undefined} />
                    <text x={x + 8} y={y + 17} className="lab-marker-label">{label}</text>
                  </g>;
                })}
              </>}
              {editable.map((point, index) => {
                const p = pos(point), label = names[index];
                return <g key={label} role="button" tabIndex={0} className="lab-draggable-point"
                  aria-label={`${label} ${formatPoint(point)}. Use as setas para mover.`}
                  onPointerDown={(event) => {
                    if (!event.isPrimary || event.button !== 0) return;
                    event.preventDefault();
                    event.currentTarget.focus({ preventScroll: true });
                    const cursor = { x: event.clientX, y: event.clientY };
                    dragging.current = { pointer: event.pointerId, index, motion: startPointDrag(point, cursor, event.shiftKey) };
                    event.currentTarget.ownerSVGElement?.setPointerCapture(event.pointerId);
                  }}
                  onKeyDown={(event) => {
                    const d = event.shiftKey ? 1 : 0.1;
                    const move: Record<string, [number, number]> = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, d], ArrowDown: [0, -d] };
                    if (!move[event.key]) return;
                    event.preventDefault();
                    const [dx, dy] = move[event.key];
                    update(index, bounded({ x: point.x + dx, y: point.y + dy }));
                  }}>
                  <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
                  <circle cx={p.x} cy={p.y} r="6" className={tool === "vectors" ? `wave-point wave-point-${index}` : "lab-point"} />
                  <text x={p.x + 10} y={p.y - 10} className="lab-marker-label">{label}</text>
                </g>;
              })}
            </g>
            {ticks(box.xmin, box.xmax).map((x) => <text key={x} x={pos({ x, y: 0 }).x} y="486" textAnchor="middle" className="lab-tick">{numberLabel(x)}</text>)}
            {ticks(box.ymin, box.ymax).map((y) => <text key={y} x="42" y={pos({ x: 0, y }).y + 4} textAnchor="end" className="lab-tick">{numberLabel(y)}</text>)}
            <text x="786" y="486" className="lab-tick">x</text><text x="31" y="15" className="lab-tick">y</text>
          </svg>
        </div>
        <div className="lab-toolbar"><div><button type="button" aria-label="Aproximar geometria" onClick={() => zoom(0.8)}>+</button><button type="button" aria-label="Afastar geometria" onClick={() => zoom(1.25)}>−</button></div></div>
        <p className="lab-note">Segure Shift ao arrastar para mover só na horizontal ou na vertical. Com um ponto em foco, use as setas; Shift + seta dá um passo maior.</p>
      </section>
      <aside className="lab-controls geometry-controls" aria-label="Ferramentas de geometria">
        <h2 className="lab-panel-title">{tool === "vectors" ? "Componentes dos vetores" : "Coordenadas"}</h2>
        {tool === "shapes" && <>
          <SelectMenu label="Forma geométrica" value={shape} options={shapes} onChange={(value) => {
            const next = value as Figure;
            setShape(next); setView(frame(measureFigure(next, figures[next]).extent));
          }} />
          {(shape === "triangle" || shape === "rectangle") && <SelectMenu
            label={shape === "triangle" ? "Modelo de triângulo" : "Modelo de quadrilátero"}
            value={shape === "triangle" ? trianglePreset : quadrilateralPreset}
            options={shape === "triangle" ? trianglePresets : quadrilateralPresets}
            onChange={(value) => applyPreset(value as PolygonPreset)} />}
          {isPolygon && <>
            <div className="geometry-vertex-actions">
              <label className="compact-single-field">Vértices <NumericField label="Quantidade de vértices" value={vertices.length} min={3} max={maxPolygonVertices} step={1} onChange={resizePolygon} /></label>
              <span>De 3 a {maxPolygonVertices}</span>
              <button type="button" className="secondary-button" onClick={() => useFreePolygon(insertPolygonVertex(vertices))} disabled={vertices.length >= maxPolygonVertices}>Adicionar ponto</button>
              <button type="button" className="secondary-button" onClick={() => useFreePolygon(vertices.slice(0, -1))} disabled={vertices.length <= 3}>Remover último</button>
            </div>
            <button type="button" className="secondary-button geometry-regularize" onClick={() => {
              if (shape === "triangle") setTrianglePreset("equilateral");
              if (shape === "rectangle") setQuadrilateralPreset("square");
              updateFigure(shape, regularPolygon(vertices));
            }}>Igualar ângulos</button>
          </>}
        </>}
        <div className={`geometry-point-fields${tool === "shapes" && vertices.length > 6 ? " geometry-point-fields-scroll" : ""}`}>
          {editable.map((point, index) => <PointFields key={`${tool}-${tool === "shapes" ? shape : ""}-${names[index]}`}
            label={names[index]} point={point} slider={tool === "line" ? box : undefined}
            fixedAxis={tool === "shapes" && ellipse ? index === 1 ? "y" : index === 2 ? "x" : undefined : undefined}
            onChange={(next, reframe) => update(index, next, reframe)} />)}
        </div>
        {tool === "line" && <dl className="lab-properties">
          <div><dt>Distância P1–P2</dt><dd>{numberLabel(result.distance)}</dd></div>
          <div><dt>Ponto médio M</dt><dd>{formatPoint(result.midpoint)}</dd></div>
          <div><dt>Inclinação</dt><dd>{result.coincident ? "Indeterminada: os pontos coincidem." : result.vertical ? "Indefinida: a reta é vertical." : numberLabel(result.slope!)}</dd></div>
          <div><dt>Equação da reta</dt><dd>{result.coincident ? "Separe os pontos para definir uma reta." : result.vertical ? `x = ${numberLabel(points[0].x)}` : `y = ${numberLabel(result.slope!)}x ${result.intercept! < 0 ? "−" : "+"} ${numberLabel(Math.abs(result.intercept!))}`}</dd></div>
        </dl>}
        {tool === "vectors" && <>
          <SelectMenu label="Operação" value={operation} options={operations} onChange={(value) => {
            const next = value as Operation;
            setOperation(next); setView(vectorFrame(vectors, next));
          }} />
          {operation === "scale" && <label className="compact-single-field">Escalar k<NumericField label="Escalar k" value={scalar} min={-20} max={20} onChange={(k) => { setScalar(k); setView(vectorFrame(vectors, operation, k)); }} /></label>}
          <dl className="lab-properties">
            <div><dt>Comprimentos</dt><dd>‖u‖ = {numberLabel(vector.lengths[0])} · ‖v‖ = {numberLabel(vector.lengths[1])}</dd></div>
            <div><dt>{operations.find((item) => item.value === operation)?.label}</dt><dd>{vectorResult ? formatPoint(vectorResult) : operation === "dot" ? numberLabel(vector.dot) : `(0; 0; ${numberLabel(vector.determinant)})`}</dd></div>
            <div><dt>{operation === "dot" ? "Valor absoluto do resultado" : "Módulo do resultado"}</dt><dd>{numberLabel(measurement?.magnitude ?? Math.abs(operation === "dot" ? vector.dot : vector.determinant))}</dd></div>
            <div><dt>Inclinação do resultado</dt><dd>{measurement
              ? measurement.inclination === null ? "Indefinida: vetor nulo." : `${numberLabel(measurement.inclination)}° a partir do eixo x positivo`
              : operation === "dot" ? "Não se aplica: o resultado é escalar."
                : vector.determinant === 0 ? "Indefinida: vetor nulo." : `${vector.determinant < 0 ? "−" : "+"}90° em relação ao plano xy`}</dd></div>
          </dl>
          <p className="lab-note">{operation === "sum" ? "Some as componentes. A diagonal do paralelogramo é o resultado." : operation === "scale" ? "Multiplique as duas componentes de u por k. Um escalar negativo inverte o sentido." : operation === "dot" ? "Multiplique as componentes correspondentes e some os produtos. O resultado é um número." : "O produto é perpendicular ao plano. Sua componente z é o determinante das componentes de u e v."}</p>
        </>}
        {tool === "shapes" && <>
          <dl className="lab-properties">
            <div><dt>Área</dt><dd>{numberLabel(figure.area)} u²</dd></div>
            <div><dt>{shape === "circle" ? "Comprimento da circunferência" : ellipse ? "Perímetro aproximado" : "Perímetro"}</dt><dd>{numberLabel(figure.perimeter)} u</dd></div>
            {figure.radius !== null && <div><dt>Raio</dt><dd>{numberLabel(figure.radius)} u</dd></div>}
            {ellipse && <>
              <div><dt>Semieixo horizontal</dt><dd>{numberLabel(ellipse.radiusX)} u</dd></div>
              <div><dt>Semieixo vertical</dt><dd>{numberLabel(ellipse.radiusY)} u</dd></div>
              <div><dt>Focos</dt><dd>{ellipse.foci.length
                ? `F₁ = ${formatPoint(ellipse.foci[0])} · F₂ = ${formatPoint(ellipse.foci[1])}`
                : "Use dois semieixos positivos para definir a elipse."}</dd></div>
            </>}
          </dl>
          <p className="lab-note">{shape === "circle" ? "A distância do centro ao ponto na borda determina o raio." : ellipse ? "Arraste os pontos dos eixos para ajustar a largura e a altura. Mova o centro para deslocar a elipse." : "Os vértices são livres para mover. Igualar ângulos também deixa todos os lados com o mesmo comprimento."}</p>
        </>}
      </aside>
    </div>
  </>;
}
