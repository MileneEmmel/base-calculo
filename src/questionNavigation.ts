import type { ModuleSlug, QuestionSummary, Topic } from "./types";

export type ProgressFilter = "todos" | "concluidos" | "pendentes";
export type BankFilters = { module: "todos" | ModuleSlug; topic: string; difficulty: string; search: string; progress: ProgressFilter };
export const defaultBankFilters: BankFilters = { module: "todos", topic: "todos", difficulty: "todos", search: "", progress: "todos" };
const moduleOrder: Record<ModuleSlug, number> = { "matematica-basica": 0, "pre-calculo": 1, "calculo-1": 2 };

export function readBankFilters(route: string, topics: Topic[] = []): BankFilters {
  const params = new URLSearchParams(route.split("?")[1] ?? "");
  const topic = params.get("topico") || "todos";
  const requestedModule = params.get("modulo");
  const module = requestedModule === "todos" ? "todos" : requestedModule && Object.hasOwn(moduleOrder, requestedModule) ? requestedModule as ModuleSlug : topics.find((item) => item.slug === topic)?.module_slug ?? "todos";
  const difficulty = params.get("nivel") ?? "todos";
  const progress = params.get("progresso");
  return { module, topic, difficulty: ["1", "2", "3", "4"].includes(difficulty) ? difficulty : "todos", search: params.get("busca") ?? "", progress: progress === "concluidos" || progress === "pendentes" ? progress : "todos" };
}

export function bankQuery(filters: BankFilters): string {
  return new URLSearchParams({ modulo: filters.module, topico: filters.topic, nivel: filters.difficulty, busca: filters.search, progresso: filters.progress }).toString();
}

export function matchesProgress(id: string, progress: ProgressFilter, completed: ReadonlySet<string>) {
  return progress === "todos" || completed.has(id) === (progress === "concluidos");
}

export function filterQuestions<T extends QuestionSummary>(questions: T[], filters: Omit<BankFilters, "progress">): T[] {
  const search = filters.search.trim().toLocaleLowerCase("pt-BR");
  return questions.filter((question) => (filters.module === "todos" || question.module_slug === filters.module)
    && (filters.topic === "todos" || question.topic_slug === filters.topic)
    && (filters.difficulty === "todos" || question.difficulty === Number(filters.difficulty))
    && (!search || [question.statement_md, question.topic_title, question.id].some((value) => value.toLocaleLowerCase("pt-BR").includes(search))))
    .sort((first, second) => moduleOrder[first.module_slug] - moduleOrder[second.module_slug] || first.id.localeCompare(second.id, "pt-BR"));
}

export function questionNeighbors<T extends Pick<QuestionSummary, "id">>(sequence: T[], id: string) {
  const index = sequence.findIndex((question) => question.id === id);
  return { index, total: sequence.length, previous: index > 0 ? sequence[index - 1] : undefined, next: index >= 0 ? sequence[index + 1] : undefined };
}
