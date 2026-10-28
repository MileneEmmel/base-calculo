export type CurveKind = "affine" | "quadratic" | "exponential" | "logarithmic" | "sine" | "cosine" | "rational" | "piecewise";
export type Curve = { kind: CurveKind; a: number; b: number; c: number; phase?: number; angleUnit?: "rad" | "deg"; exponentialModel?: "natural" | "base"; base?: number; example?: "continuous" | "jump" | "removable" };
export type Viewport = { x: number; y: number; span: number; ySpan?: number };
export const angleScale = (curve: Curve) => curve.angleUnit === "deg" ? Math.PI / 180 : 1;
export const exponentialRate = (curve: Curve) => curve.exponentialModel === "base" ? (curve.base ?? 2) > 0 ? Math.log(curve.base ?? 2) : NaN : curve.b;
export const isTrig = (curve: Curve) => curve.kind === "sine" || curve.kind === "cosine";
export const plot = { left: 52, top: 24, width: 724, height: 440 };
export const initialView: Viewport = { x: 0, y: 0, span: 10 };

export function evaluate(curve: Curve, x: number): number {
  const { a, b, c } = curve;
  switch (curve.kind) {
    case "affine": return a * x + b;
    case "quadratic": return a * x * x + b * x + c;
    case "exponential": return Number.isNaN(exponentialRate(curve)) ? NaN : a === 0 ? c : a * Math.exp(exponentialRate(curve) * x) + c;
    case "logarithmic": return b * x > 0 ? a * Math.log(b * x) + c : NaN;
    case "sine": return a * Math.sin((b * x + (curve.phase ?? 0)) * angleScale(curve)) + c;
    case "cosine": return a * Math.cos((b * x + (curve.phase ?? 0)) * angleScale(curve)) + c;
    case "rational": return x === c ? NaN : (a * x + b) / (x - c);
    case "piecewise": return curve.example === "continuous" ? x <= c ? x * x : 2 * c * x - c * c : curve.example === "jump" ? a * x + b + (x < c ? 0 : 1) : x === c ? NaN : a * x + b;
  }
}

export function derivative(curve: Curve, x: number): number {
  const { a, b, c } = curve;
  if (!Number.isFinite(evaluate(curve, x))) return NaN;
  switch (curve.kind) {
    case "affine": return a;
    case "quadratic": return 2 * a * x + b;
    case "exponential": return a === 0 || exponentialRate(curve) === 0 ? 0 : a * exponentialRate(curve) * Math.exp(exponentialRate(curve) * x);
    case "logarithmic": return a / x;
    case "sine": return a * b * angleScale(curve) * Math.cos((b * x + (curve.phase ?? 0)) * angleScale(curve));
    case "cosine": return -a * b * angleScale(curve) * Math.sin((b * x + (curve.phase ?? 0)) * angleScale(curve));
    case "rational": return -(a * c + b) / (x - c) ** 2;
    case "piecewise": return curve.example === "continuous" ? x <= c ? 2 * x : 2 * c : x === c ? NaN : a;
  }
}

export function intervalValid(curve: Curve, left: number, right: number) {
  const min = Math.min(left, right), max = Math.max(left, right);
  if (curve.kind === "rational" && min <= curve.c && max >= curve.c) return false;
  if (curve.kind === "piecewise" && curve.example === "removable" && min <= curve.c && max >= curve.c) return false;
  return [min, max].every((x) => Number.isFinite(evaluate(curve, x)));
}

export function integral(curve: Curve, left: number, right: number): number {
  if (!intervalValid(curve, left, right)) return NaN;
  const { a, b, c } = curve;
  const primitive = (x: number) => {
    switch (curve.kind) {
      case "affine": return a * x * x / 2 + b * x;
      case "quadratic": return a * x ** 3 / 3 + b * x * x / 2 + c * x;
      case "exponential": { const rate = exponentialRate(curve); return rate === 0 ? (a + c) * x : (a === 0 ? 0 : a * Math.exp(rate * x) / rate) + c * x; }
      case "logarithmic": return a * (x * Math.log(b * x) - x) + c * x;
      case "sine": return b === 0 ? evaluate(curve, 0) * x : -a * Math.cos((b * x + (curve.phase ?? 0)) * angleScale(curve)) / (b * angleScale(curve)) + c * x;
      case "cosine": return b === 0 ? evaluate(curve, 0) * x : a * Math.sin((b * x + (curve.phase ?? 0)) * angleScale(curve)) / (b * angleScale(curve)) + c * x;
      case "rational": return a * x + (a * c + b) * Math.log(Math.abs(x - c));
      case "piecewise": return curve.example === "continuous" ? x <= c ? x ** 3 / 3 : c * x * x - c * c * x + c ** 3 / 3 : a * x * x / 2 + b * x + (curve.example === "jump" ? Math.max(0, x - c) : 0);
    }
  };
  return primitive(right) - primitive(left);
}

export function limitAt(curve: Curve, x: number): { left: number; right: number } {
  if (curve.kind === "piecewise" && x === curve.c) {
    const y = curve.a * x + curve.b;
    return curve.example === "continuous" ? { left: x * x, right: x * x } : { left: y, right: y + (curve.example === "jump" ? 1 : 0) };
  }
  if (curve.kind === "rational" && x === curve.c) {
    const numerator = curve.a * x + curve.b;
    return numerator === 0 ? { left: curve.a, right: curve.a } : { left: -Math.sign(numerator) * Infinity, right: Math.sign(numerator) * Infinity };
  }
  if (curve.kind === "logarithmic" && x === 0) {
    const value = curve.a === 0 ? curve.c : -Math.sign(curve.a) * Infinity;
    return { left: curve.b < 0 ? value : NaN, right: curve.b > 0 ? value : NaN };
  }
  const value = evaluate(curve, x);
  return { left: value, right: value };
}

export function bounds(view: Viewport) {
  const verticalSpan = view.ySpan ?? view.span * plot.height / plot.width;
  return { xmin: view.x - view.span, xmax: view.x + view.span, ymin: view.y - verticalSpan, ymax: view.y + verticalSpan };
}

export function coordinates(x: number, y: number, view: Viewport) {
  const box = bounds(view);
  return { x: plot.left + (x - box.xmin) / (box.xmax - box.xmin) * plot.width,
    y: plot.top + (box.ymax - y) / (box.ymax - box.ymin) * plot.height };
}

export function curvePath(curve: Curve, view: Viewport): string {
  return functionPath((x) => evaluate(curve, x), view, curve.kind === "rational" || (curve.kind === "piecewise" && curve.example !== "continuous") ? curve.c : undefined);
}

export function functionPath(fn: (x: number) => number, view: Viewport, discontinuity?: number): string {
  const box = bounds(view);
  let previousX: number | null = null;
  let connected = false;
  return Array.from({ length: 725 }, (_, index) => {
    const x = box.xmin + index / 724 * (box.xmax - box.xmin);
    const y = fn(x);
    if (!Number.isFinite(y) || Math.abs(y) > 1e12) { connected = false; previousX = x; return ""; }
    if (discontinuity !== undefined && previousX !== null && previousX <= discontinuity && x >= discontinuity) connected = false;
    const point = coordinates(x, y, view);
    const command = `${connected ? "L" : "M"}${point.x.toFixed(2)},${point.y.toFixed(2)}`;
    previousX = x;
    connected = true;
    return command;
  }).join(" ");
}

const formatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });
export const numberLabel = (value: number): string => Number.isNaN(value) ? "fora do domínio" : value === Infinity ? "+∞" : value === -Infinity ? "−∞" : formatter.format(Math.abs(value) < 1e-9 ? 0 : value);

export function formula(curve: Curve): string {
  if (curve.kind === "piecewise") {
    const line = formula({ ...curve, kind: "affine" });
    return curve.example === "continuous" ? `{ x² se x ≤ ${numberLabel(curve.c)}; ${formula({ kind: "affine", a: 2 * curve.c, b: -(curve.c ** 2), c: 0 })} se x > ${numberLabel(curve.c)} }` : curve.example === "jump" ? `{ ${line} se x < ${numberLabel(curve.c)}; ${formula({ ...curve, kind: "affine", b: curve.b + 1 })} se x ≥ ${numberLabel(curve.c)} }` : `${line}, x ≠ ${numberLabel(curve.c)}`;
  }
  if (curve.kind !== "affine" && curve.kind !== "quadratic") {
    const { a, b, c } = curve;
    const suffix = c === 0 ? "" : c > 0 ? ` + ${numberLabel(c)}` : ` − ${numberLabel(-c)}`;
    const prefix = a === 1 ? "" : a === -1 ? "−" : numberLabel(a);
    const phase = curve.phase ?? 0;
    const argument = (b === 1 ? "x" : b === -1 ? "−x" : `${numberLabel(b)}x`) + (isTrig(curve) && phase !== 0 ? phase > 0 ? ` + ${numberLabel(phase)}` : ` − ${numberLabel(-phase)}` : "");
    if (curve.kind === "rational") return `(${formula({ kind: "affine", a, b, c: 0 })}) / (x${c === 0 ? "" : c > 0 ? ` − ${numberLabel(c)}` : ` + ${numberLabel(-c)}`})`;
    const expression = curve.kind === "exponential" ? curve.exponentialModel === "base" ? `${numberLabel(curve.base ?? 2)}^x` : `e^(${argument})` : `${curve.kind === "logarithmic" ? "ln" : curve.kind === "sine" ? "sen" : "cos"}(${argument})`;
    return `${prefix}${expression}${suffix}`;
  }
  const terms: [number, string][] = curve.kind === "affine" ? [[curve.a, "x"], [curve.b, ""]] : [[curve.a, "x²"], [curve.b, "x"], [curve.c, ""]];
  return terms.filter(([value]) => value !== 0).map(([value, variable], index) => {
    const sign = value < 0 ? (index === 0 ? "−" : " − ") : (index === 0 ? "" : " + ");
    return `${sign}${Math.abs(value) === 1 && variable ? "" : numberLabel(Math.abs(value))}${variable}`;
  }).join("") || "0";
}

export function domainLabel(curve: Curve) {
  if (curve.kind === "piecewise" && curve.example === "removable") return `Domínio: x ≠ ${numberLabel(curve.c)}.`;
  if (curve.kind === "exponential" && Number.isNaN(exponentialRate(curve))) return "Domínio vazio: a base precisa ser positiva.";
  if (curve.kind === "logarithmic") return curve.b === 0 ? "Domínio vazio: b precisa ser diferente de zero." : curve.b > 0 ? "Domínio: x > 0." : "Domínio: x < 0.";
  if (curve.kind === "rational") return `Domínio: x ≠ ${numberLabel(curve.c)}.`;
  return isTrig(curve) ? `Domínio: todos os reais. Eixo x e fase em ${curve.angleUnit === "deg" ? "graus" : "radianos"}.` : "Domínio: todos os reais.";
}

export function curveRoots(curve: Curve, min: number, max: number): number[] {
  const { a, b, c, kind } = curve;
  let roots: number[] = [];
  if (kind === "affine" || (kind === "quadratic" && a === 0)) {
    const slope = kind === "affine" ? a : b, intercept = kind === "affine" ? b : c;
    if (slope !== 0) roots = [-intercept / slope];
  } else if (kind === "quadratic") {
    const d = b * b - 4 * a * c;
    if (d === 0) roots = [-b / (2 * a)];
    else if (d > 0) { const q = -(b + (b >= 0 ? 1 : -1) * Math.sqrt(d)) / 2; roots = [q / a, c / q]; }
  } else if (kind === "exponential") {
    const rate = exponentialRate(curve);
    if (a !== 0 && rate !== 0 && -c / a > 0) roots = [Math.log(-c / a) / rate];
  } else if (kind === "logarithmic") {
    if (a !== 0 && b !== 0) roots = [Math.exp(-c / a) / b];
  } else if (kind === "rational") {
    if (a !== 0 && -b / a !== c) roots = [-b / a];
  } else if ((kind === "sine" || kind === "cosine") && a !== 0 && b !== 0 && Math.abs(c / a) <= 1) {
    const angle = kind === "sine" ? Math.asin(-c / a) : Math.acos(-c / a);
    const phases = kind === "sine" ? [angle, Math.PI - angle] : [angle, -angle];
    const rate = b * angleScale(curve), phase = (curve.phase ?? 0) * angleScale(curve);
    const lo = Math.min(rate * min + phase, rate * max + phase), hi = Math.max(rate * min + phase, rate * max + phase);
    phases.forEach((phase) => {
      const first = Math.ceil((lo - phase) / (2 * Math.PI)), last = Math.floor((hi - phase) / (2 * Math.PI));
      for (let n = first; n <= last && roots.length < 1000; n++) roots.push((phase + n * 2 * Math.PI - (curve.phase ?? 0) * angleScale(curve)) / rate);
    });
  } else if (kind === "piecewise") {
    roots = findZeros((x) => evaluate(curve, x), (x) => derivative(curve, x), min, max);
  }
  return roots.filter((x) => Number.isFinite(x) && x >= min && x <= max && Number.isFinite(evaluate(curve, x))).sort((x, y) => x - y).filter((x, i, all) => i === 0 || Math.abs(x - all[i - 1]) > 1e-7);
}

// Sign changes locate crossings; stationary points also reveal tangential roots.
export function findZeros(fn: (x: number) => number, slope: (x: number) => number, min: number, max: number): number[] {
  const probes = Array.from({ length: 7 }, (_, i) => min + (max - min) * (i + 0.37) / 7);
  if (probes.every((x) => fn(x) === 0 && slope(x) === 0)) return [];
  const roots: number[] = [];
  const add = (x: number) => {
    if (Number.isFinite(x) && Math.abs(fn(x)) < 1e-6 && !roots.some((root) => Math.abs(root - x) < 1e-5)) roots.push(x);
  };
  const bisect = (f: (x: number) => number, left: number, right: number) => {
    let fl = f(left);
    for (let i = 0; i < 55; i++) {
      const middle = (left + right) / 2, fm = f(middle);
      if (!Number.isFinite(fm)) return NaN;
      if (fm === 0) return middle;
      if (Math.sign(fm) === Math.sign(fl)) { left = middle; fl = fm; } else right = middle;
    }
    return (left + right) / 2;
  };
  const samples = Math.min(10000, Math.max(1200, Math.ceil((max - min) * 40)));
  let lastX = min, lastY = fn(min), lastSlope = slope(min);
  for (let i = 0; i <= samples; i++) {
    const x = min + i / samples * (max - min), y = fn(x), dy = slope(x);
    if (Number.isFinite(y) && y === 0) add(x);
    if (Number.isFinite(y) && Number.isFinite(lastY) && y * lastY < 0) add(bisect(fn, lastX, x));
    if (Number.isFinite(dy) && Number.isFinite(lastSlope) && dy * lastSlope < 0) add(bisect(slope, lastX, x));
    lastX = x; lastY = y; lastSlope = dy;
  }
  return roots.sort((a, b) => a - b);
}

export function fitView(curve: Curve, view: Viewport): Viewport {
  const box = bounds(view);
  const values = Array.from({ length: 401 }, (_, i) => evaluate(curve, box.xmin + i / 400 * (box.xmax - box.xmin))).filter((value) => Number.isFinite(value) && Math.abs(value) < 1e8).sort((a, b) => a - b);
  if (!values.length) return view;
  const low = values[Math.floor(values.length * 0.05)], high = values[Math.floor((values.length - 1) * 0.95)];
  return { x: view.x, y: (low + high) / 2, span: Math.min(10000, Math.max(0.05, view.span)), ySpan: Math.max(0.5, (high - low) * 0.65) };
}

export function ticks(min: number, max: number): number[] {
  const raw = (max - min) / 10;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].find((value) => value * power >= raw)! * power;
  const count = Math.floor(max / step) - Math.ceil(min / step) + 1;
  return Array.from({ length: Math.max(0, count) }, (_, i) => (Math.ceil(min / step) + i) * step);
}

export type RiemannMethod = "left" | "right" | "midpoint";
export function riemannRectangles(curve: Curve, left: number, right: number, count: number, method: RiemannMethod) {
  if (!intervalValid(curve, left, right) || !Number.isInteger(count) || count < 1) return [];
  const min = Math.min(left, right), width = Math.abs(right - left) / count;
  const fraction = method === "left" ? 0 : method === "right" ? 1 : 0.5;
  return Array.from({ length: count }, (_, index) => { const x = min + index * width; return { x, width, y: evaluate(curve, x + fraction * width) }; });
}
export function riemannSum(curve: Curve, left: number, right: number, count: number, method: RiemannMethod) {
  const rects = riemannRectangles(curve, left, right, count, method);
  if (!rects.length || rects.some((rect) => !Number.isFinite(rect.y))) return NaN;
  return Math.sign(right - left) * rects.reduce((sum, rect) => sum + rect.y * rect.width, 0);
}
export function geometricArea(curve: Curve, left: number, right: number) {
  if (!intervalValid(curve, left, right)) return NaN;
  const min = Math.min(left, right), max = Math.max(left, right);
  const roots = curveRoots(curve, min, max);
  if (roots.length >= 1000) return NaN;
  const cuts = [min, ...roots.filter((x) => x > min && x < max), max];
  return cuts.slice(1).reduce((sum, end, i) => sum + Math.abs(integral(curve, cuts[i], end)), 0);
}

export function derivativeFormula(curve: Curve): string {
  const { a, b, c } = curve;
  if (curve.kind === "affine") return numberLabel(a);
  if (curve.kind === "quadratic") return formula({ kind: "affine", a: 2 * a, b, c: 0 });
  if (curve.kind === "exponential") return exponentialRate(curve) === 0 || a === 0 ? "0" : curve.exponentialModel === "base" ? `${numberLabel(a)} · ln(${numberLabel(curve.base ?? 2)}) · ${numberLabel(curve.base ?? 2)}^x` : `${numberLabel(a * b)} · e^(${numberLabel(b)}x)`;
  if (curve.kind === "logarithmic") return `${numberLabel(a)} / x (no domínio)`;
  if (curve.kind === "rational") return `${numberLabel(-(a * c + b))} / (x − (${numberLabel(c)}))²`;
  if (isTrig(curve)) {
    const factor = a * b * (curve.kind === "cosine" ? -1 : 1);
    return factor === 0 ? "0" : `${numberLabel(factor)}${curve.angleUnit === "deg" ? " · π/180" : ""} · ${curve.kind === "sine" ? "cos" : "sen"}((${numberLabel(b)}x + (${numberLabel(curve.phase ?? 0)}))${curve.angleUnit === "deg" ? " · π/180" : ""})`;
  }
  return curve.example === "continuous" ? `{ 2x se x ≤ ${numberLabel(c)}; ${numberLabel(2 * c)} se x > ${numberLabel(c)} }` : `${numberLabel(a)}, para x ≠ ${numberLabel(c)}`;
}

export function trigProperties(curve: Curve) {
  const constant = curve.a === 0 || curve.b === 0;
  return { constant, amplitude: constant ? 0 : Math.abs(curve.a), period: constant ? null : 2 * Math.PI / Math.abs(curve.b * angleScale(curve)), frequency: constant ? null : Math.abs(curve.b * angleScale(curve)) / (2 * Math.PI), shift: curve.b === 0 ? null : -(curve.phase ?? 0) / curve.b, vertical: curve.c };
}
export function convertTrigUnit(curve: Curve, unit: "rad" | "deg"): Curve {
  if (curve.angleUnit === unit || (!curve.angleUnit && unit === "rad")) return { ...curve, angleUnit: unit };
  const phase = (curve.phase ?? 0) * (unit === "deg" ? 180 / Math.PI : Math.PI / 180);
  return { ...curve, angleUnit: unit, phase: phase % (unit === "deg" ? 360 : 2 * Math.PI) };
}

export function symmetryAxis(curve: Curve): number | null { return curve.kind === "quadratic" && curve.a !== 0 ? -curve.b / (2 * curve.a) : null; }
export function asymptotes(curve: Curve): { vertical?: number; horizontal?: number; hole?: { x: number; y: number } } {
  if (curve.kind === "rational") return curve.a * curve.c + curve.b === 0 ? { hole: { x: curve.c, y: curve.a } } : { vertical: curve.c, horizontal: curve.a };
  if (curve.kind === "logarithmic" && curve.b !== 0 && curve.a !== 0) return { vertical: 0 };
  if (curve.kind === "exponential" && curve.a !== 0 && exponentialRate(curve) !== 0) return { horizontal: curve.c };
  if (curve.kind === "piecewise" && curve.example === "removable") return { hole: { x: curve.c, y: curve.a * curve.c + curve.b } };
  return {};
}

export function functionProperties(curve: Curve): { label: string; value: string }[] {
  const { a, b, c } = curve;
  const rows = [{ label: "Domínio", value: domainLabel(curve).replace(/^Domínio: /, "") }];
  const add = (label: string, value: string) => rows.push({ label, value });
  const affine = curve.kind === "affine" || curve.kind === "quadratic" && a === 0;
  if (affine) {
    const m = curve.kind === "affine" ? a : b, n = curve.kind === "affine" ? b : c;
    if (curve.kind === "quadratic") add("Classificação", "a = 0: a função deixou de ser quadrática.");
    add("Raiz", m === 0 ? n === 0 ? "Todo número real é raiz." : "Não possui raiz." : numberLabel(-n / m));
    add("Intercepto em y", `(0; ${numberLabel(n)})`);
    add("Imagem", m === 0 ? `{${numberLabel(n)}}` : "ℝ");
    add("Variação", m === 0 ? "Constante em ℝ." : m > 0 ? "Crescente em ℝ." : "Decrescente em ℝ.");
    add("Extremos globais", m === 0 ? `Máximo e mínimo iguais a ${numberLabel(n)}, em todo x.` : "Não possui máximo nem mínimo global.");
  } else if (curve.kind === "quadratic") {
    const delta = b * b - 4 * a * c, x = -b / (2 * a), y = evaluate(curve, x);
    const roots = delta < 0 ? [] : delta === 0 ? [x] : [(-b - Math.sqrt(delta)) / (2 * a), (-b + Math.sqrt(delta)) / (2 * a)].sort((u, v) => u - v);
    add("Δ = b² − 4ac", numberLabel(delta));
    add("Raízes reais (Bhaskara)", roots.length ? roots.map(numberLabel).join(" e ") : "Não possui raízes reais (Δ < 0).");
    add("Vértice", `(${numberLabel(x)}; ${numberLabel(y)})`);
    add("Eixo de simetria", `x = ${numberLabel(x)}`);
    add("Concavidade", a > 0 ? "Voltada para cima (a > 0)." : "Voltada para baixo (a < 0).");
    add("Intercepto em y", `(0; ${numberLabel(c)})`);
    add("Imagem", a > 0 ? `[${numberLabel(y)}; +∞)` : `(−∞; ${numberLabel(y)}]`);
    add("Variação", a > 0 ? `Decrescente em (−∞; ${numberLabel(x)}]; crescente em [${numberLabel(x)}; +∞).` : `Crescente em (−∞; ${numberLabel(x)}]; decrescente em [${numberLabel(x)}; +∞).`);
    add("Extremo global", `${a > 0 ? "Mínimo" : "Máximo"} = ${numberLabel(y)}, em x = ${numberLabel(x)}. Não há ${a > 0 ? "máximo" : "mínimo"} global.`);
  } else if (isTrig(curve)) {
    const p = trigProperties(curve), unit = curve.angleUnit === "deg" ? "graus" : "radianos";
    add("Amplitude", numberLabel(p.amplitude));
    add("Período fundamental", p.period === null ? "Não se aplica: função constante." : `${numberLabel(p.period)} ${unit}`);
    add("Frequência", p.frequency === null ? "Não se aplica: função constante." : `${numberLabel(p.frequency)} ciclos por unidade de x`);
    add("Fase C", `${numberLabel(curve.phase ?? 0)} ${unit}`);
    add("Deslocamento horizontal", p.shift === null ? "Não definido quando B = 0." : `${numberLabel(p.shift)} ${unit}`);
    add("Deslocamento vertical D", numberLabel(c));
    add("Imagem", p.constant ? `{${numberLabel(evaluate(curve, 0))}}` : `[${numberLabel(c - Math.abs(a))}; ${numberLabel(c + Math.abs(a))}]`);
    add("Variação", p.constant ? "Constante." : "Alterna crescimento e decrescimento em cada período.");
  } else if (curve.kind === "piecewise") {
    add("Continuidade em x = c", curve.example === "continuous" ? "Os limites laterais e o valor da função são iguais." : curve.example === "jump" ? "Descontinuidade de salto: os limites laterais diferem." : "Descontinuidade removível: o limite existe, mas o ponto foi retirado do domínio.");
  } else {
    const refs = asymptotes(curve);
    if (refs.vertical !== undefined) add("Assíntota vertical", `x = ${numberLabel(refs.vertical)}`);
    if (refs.horizontal !== undefined) add("Assíntota horizontal", `y = ${numberLabel(refs.horizontal)}`);
    if (refs.hole) add("Ponto removível", `(${numberLabel(refs.hole.x)}; ${numberLabel(refs.hole.y)})`);
    if (curve.kind === "exponential") add("Taxa equivalente", `k = ${numberLabel(exponentialRate(curve))}, no modelo a·e^(kx)+c.`);
    add("Observação", "Raízes e encontros destacados no gráfico consideram a janela horizontal atual.");
  }
  return rows;
}
