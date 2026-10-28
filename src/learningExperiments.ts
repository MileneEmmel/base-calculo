import type { Curve, Viewport } from "./labMath";
import type { Mode } from "./labSaved";
import type { Point } from "./geometryMath";

export type Experiment = { title: string; mode: Mode; curves: Curve[]; view?: Viewport; pointX?: number; limitX?: number; lower?: number; upper?: number; geometry?: [Point, Point] };
const square: Curve = { kind: "quadratic", a: 1, b: 0, c: 0 };
export const experiments: Record<string, Experiment> = {
  affine: { title: "Inclinação e intercepto", mode: "properties", curves: [{ kind: "affine", a: 2, b: 1, c: 0 }] },
  quadratic: { title: "Raízes, vértice e Bhaskara", mode: "properties", curves: [{ kind: "quadratic", a: 1, b: -4, c: 3 }], view: { x: 2, y: 2, span: 6 } },
  exponential: { title: "Crescimento exponencial", mode: "properties", curves: [{ kind: "exponential", a: 1, b: 1, c: 0, exponentialModel: "base", base: 2 }] },
  logarithmic: { title: "Domínio do logaritmo", mode: "properties", curves: [{ kind: "logarithmic", a: 1, b: 1, c: 0 }] },
  rational: { title: "Assíntotas de 1/x", mode: "limits", curves: [{ kind: "rational", a: 0, b: 1, c: 0 }], limitX: 0 },
  composition: { title: "Comparar duas funções", mode: "functions", curves: [{ kind: "quadratic", a: 2, b: 0, c: 1 }, { kind: "affine", a: 3, b: 5, c: 0 }] },
  trigonometry: { title: "Círculo trigonométrico", mode: "trigonometry", curves: [{ kind: "sine", a: 1, b: 1, c: 0, phase: 0, angleUnit: "rad" }], view: { x: 0, y: 0, span: 2 * Math.PI, ySpan: 2 } },
  limits: { title: "Aproximação de um limite", mode: "limits", curves: [square], limitX: 2 },
  continuity: { title: "Uma descontinuidade removível", mode: "limits", curves: [{ kind: "piecewise", a: 1, b: 0, c: 1, example: "removable" }], limitX: 1 },
  derivatives: { title: "Da secante à tangente", mode: "derivatives", curves: [square], pointX: 2 },
  integrals: { title: "Somas de Riemann de x²", mode: "integrals", curves: [square], lower: 0, upper: 3, view: { x: 1.5, y: 4, span: 5, ySpan: 6 } },
  geometry: { title: "Distância, ponto médio e reta", mode: "geometry", curves: [square], geometry: [{ x: 2, y: 3 }, { x: 7, y: 8 }] },
  "question-MB-004": { title: "Uma equação como raiz de uma função", mode: "properties", curves: [{ kind: "affine", a: -2, b: 10, c: 0 }] },
  "question-MB-006": { title: "Fatoração e raízes", mode: "properties", curves: [{ kind: "quadratic", a: 1, b: -3, c: -10 }] },
  "question-MB-008": { title: "Equação do segundo grau", mode: "properties", curves: [{ kind: "quadratic", a: 2, b: -7, c: -4 }] },
  "question-MB-005": { title: "Distância entre os pontos da questão", mode: "geometry", curves: [square], geometry: [{ x: -2, y: 5 }, { x: 4, y: -1 }] },
  "question-PC-002": { title: "Valores de uma função afim", mode: "functions", curves: [{ kind: "affine", a: -2, b: 4, c: 0 }] },
  "question-PC-003": { title: "Reta pelos pontos da questão", mode: "geometry", curves: [square], geometry: [{ x: 7, y: 5 }, { x: 3, y: 17 }] },
  "question-PC-006": { title: "Vértice e interceptos da parábola", mode: "properties", curves: [{ kind: "quadratic", a: 1, b: -4, c: -5 }] },
  "question-PC-007": { title: "Modelo da população de cervos", mode: "functions", curves: [{ kind: "exponential", a: 205, b: 1, c: 0, exponentialModel: "base", base: 1.13 }], view: { x: 3, y: 400, span: 8, ySpan: 400 }, pointX: 6 },
  "question-PC-008": { title: "Decaimento exponencial", mode: "functions", curves: [{ kind: "exponential", a: 156, b: 1, c: 0, exponentialModel: "base", base: 0.825 }], view: { x: 4, y: 100, span: 8, ySpan: 150 } },
  "question-C1-001": { title: "O limite existe mesmo sem o ponto", mode: "limits", curves: [{ kind: "piecewise", a: 2, b: 1, c: 2, example: "removable" }], limitX: 2 },
};
export const experimentUrl = (id: string) => `#/laboratorio?experimento=${encodeURIComponent(id)}`;
export const topicExperiment: Record<string, string> = {
  "equacoes-e-inequacoes": "quadratic", fatoracao: "quadratic", "produtos-notaveis": "quadratic", funcoes: "affine", "funcoes-afins": "affine", "funcoes-quadraticas": "quadratic", "funcoes-polinomiais": "quadratic", "funcoes-racionais": "rational", "funcoes-exponenciais": "exponential", "funcoes-logaritmicas": "logarithmic", "composicao-de-funcoes": "composition", trigonometria: "trigonometry", "geometria-analitica": "geometry", limites: "limits", continuidade: "continuity", derivadas: "derivatives", "aplicacoes-da-derivada": "derivatives", integrais: "integrals", "tecnicas-de-integracao": "integrals", "aplicacoes-da-integral": "integrals",
};
export const prerequisites: Record<string, string[]> = {
  "divisibilidade-multiplos-e-divisores": ["operacoes-numericas"], "fracoes-e-numeros-decimais": ["divisibilidade-multiplos-e-divisores"], "modulo-e-valor-absoluto": ["conjuntos-numericos", "operacoes-numericas"], "propriedades-dos-numeros-reais": ["conjuntos-numericos", "operacoes-numericas"],
  "conjuntos-numericos": [], "operacoes-numericas": ["conjuntos-numericos"], intervalos: ["conjuntos-numericos"], "razao-proporcao-e-porcentagem": ["fracoes-e-numeros-decimais"], "potenciacao-e-radiciacao": ["operacoes-numericas"], "expressoes-algebricas": ["operacoes-numericas", "potenciacao-e-radiciacao", "propriedades-dos-numeros-reais"], "produtos-notaveis": ["expressoes-algebricas"], fatoracao: ["produtos-notaveis"], "equacoes-e-inequacoes": ["fatoracao", "intervalos", "modulo-e-valor-absoluto"], "sistemas-lineares": ["equacoes-e-inequacoes"], funcoes: ["equacoes-e-inequacoes", "intervalos"], "funcoes-afins": ["funcoes"], "funcoes-quadraticas": ["funcoes", "fatoracao"], "funcoes-polinomiais": ["funcoes-quadraticas"], "funcoes-racionais": ["funcoes-polinomiais"], "funcoes-exponenciais": ["funcoes", "potenciacao-e-radiciacao"], "funcoes-logaritmicas": ["funcoes-exponenciais"], "composicao-de-funcoes": ["funcoes"], trigonometria: ["razao-proporcao-e-porcentagem", "funcoes"], "geometria-analitica": ["funcoes-afins", "sistemas-lineares"], "sequencias-e-progressoes": ["funcoes-afins", "funcoes-exponenciais"], limites: ["funcoes", "fatoracao"], continuidade: ["limites"], derivadas: ["limites", "continuidade"], "aplicacoes-da-derivada": ["derivadas", "geometria-analitica"], integrais: ["limites", "derivadas"], "tecnicas-de-integracao": ["integrais", "composicao-de-funcoes"], "aplicacoes-da-integral": ["integrais", "geometria-analitica"],
};
