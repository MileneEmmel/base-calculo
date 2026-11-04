import type { ModuleSlug } from "./types";

export const moduleMeta: Record<
  ModuleSlug,
  { short: string; description: string; className: string }
> = {
  "matematica-basica": {
    short: "Matemática Básica",
    description: "Reforce as ferramentas que aparecem em todo o resto.",
    className: "module-basic",
  },
  "pre-calculo": {
    short: "Pré-Cálculo",
    description: "Entenda funções, gráficos e comportamentos.",
    className: "module-precalc",
  },
  "calculo-1": {
    short: "Cálculo 1",
    description: "Explore limites, derivadas e integrais.",
    className: "module-calc",
  },
};

export const difficultyLabels = ["", "Fácil", "Médio", "Difícil", "Desafio"];

export function DifficultyDots({ value }: { value: number }) {
  return (
    <span className="difficulty-dots" aria-label={`Dificuldade ${value} de 4: ${difficultyLabels[value]}`}>
      {Array.from({ length: 4 }, (_, index) => (
        <span className={index < value ? "dot dot-filled" : "dot"} key={index} />
      ))}
    </span>
  );
}
