export const modes = [{ id: "inspect", title: "Configurações" }, { id: "functions", title: "Funções" }, { id: "properties", title: "Propriedades" }, { id: "limits", title: "Limites" }, { id: "derivatives", title: "Derivadas" }, { id: "integrals", title: "Integrais" }, { id: "trigonometry", title: "Trigonometria" }, { id: "geometry", title: "Geometria" }] as const;
export type Mode = (typeof modes)[number]["id"];
export const defaultOptions = { grid: true, coordinates: true, points: true, intersections: true, curve: true, second: true, moving: true, derivative: false, tangent: true, secant: true, symmetry: true, asymptotes: true };
export type Options = typeof defaultOptions;
