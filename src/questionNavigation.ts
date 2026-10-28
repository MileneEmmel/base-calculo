import type { ModuleSlug, Question, Topic } from "./types";

export type BankFilters = { module: "todos" | ModuleSlug; topic: string; difficulty: string; search: string; source: string };
export const defaultBankFilters: BankFilters = { module: "todos", topic: "todos", difficulty: "todos", search: "", source: "todos" };
export const ia2ChapterOneSource = "group-ia2-ch1";
export const ia2BookSource = "group-ia2-book";
export const isIA2Book = (question: Question) => question.source_url?.includes("/intermediate-algebra-2e/") ?? false;
export const isIA2ChapterOne = (question: Question) => question.source_id === "src-intermediate-algebra-ch1" || question.source_id.startsWith("src-ia2-ch1-");
const moduleOrder: Record<ModuleSlug, number> = { "matematica-basica": 0, "pre-calculo": 1, "calculo-1": 2 };

export function readBankFilters(route: string, topics: Topic[] = []): BankFilters {
  const params = new URLSearchParams(route.split("?")[1] ?? "");
  const topic = params.get("topico") || "todos";
  const requestedModule = params.get("modulo");
  const module = requestedModule === "todos" ? "todos" : requestedModule && Object.hasOwn(moduleOrder, requestedModule) ? requestedModule as ModuleSlug : topics.find((item) => item.slug === topic)?.module_slug ?? "todos";
  const difficulty = params.get("nivel") ?? "todos";
  return { module, topic, difficulty: ["1", "2", "3", "4"].includes(difficulty) ? difficulty : "todos", search: params.get("busca") ?? "", source: params.get("fonte") || "todos" };
}

export function bankQuery(filters: BankFilters): string {
  return new URLSearchParams({ modulo: filters.module, topico: filters.topic, nivel: filters.difficulty, busca: filters.search, fonte: filters.source }).toString();
}

export function filterQuestions(questions: Question[], filters: BankFilters): Question[] {
  const search = filters.search.trim().toLocaleLowerCase("pt-BR");
  return questions.filter((question) => (filters.module === "todos" || question.module_slug === filters.module)
    && (filters.topic === "todos" || question.topic_slug === filters.topic)
    && (filters.difficulty === "todos" || question.difficulty === Number(filters.difficulty))
    && (filters.source === "todos" || (filters.source === ia2ChapterOneSource ? isIA2ChapterOne(question) : filters.source === ia2BookSource ? isIA2Book(question) : question.source_id === filters.source))
    && (!search || [question.statement_md, question.topic_title, question.id].some((value) => value.toLocaleLowerCase("pt-BR").includes(search))))
    .sort((first, second) => {
      if (filters.source === ia2BookSource) {
        const order = (question: Question) => {
          const chapter = Number(question.source_locator.match(/Capítulo (\d+)/)?.[1] ?? 0);
          const section = Number(question.source_url.match(/pages\/\d+-(\d+)-/)?.[1] ?? (question.source_url.includes("review-exercises") ? 99 : 100));
          const tryIt = question.source_locator.match(/Try It \d+\.(\d+)$/);
          const number = Number(tryIt?.[1] ?? question.source_locator.match(/exercício (\d+)$/)?.[1] ?? 0);
          return chapter * 10000000 + section * 10000 + (tryIt ? 0 : 1000) + number;
        };
        return order(first) - order(second);
      }
      if (filters.source === ia2ChapterOneSource || filters.source.startsWith("src-ia2-ch1-")) {
        const order = (question: Question) => {
          const section = Number(question.source_id.match(/-s([1-5])$/)?.[1] ?? (question.source_id === "src-intermediate-algebra-ch1" ? 6 : 7));
          const tryIt = question.source_locator.match(/Try It 1\.(\d+)$/);
          const number = Number(tryIt?.[1] ?? question.source_locator.match(/exercício (\d+)$/)?.[1] ?? 0);
          return section * 10000 + (tryIt ? 0 : 1000) + number;
        };
        return order(first) - order(second);
      }
      return filters.source !== "todos" ? first.source_locator.localeCompare(second.source_locator, "pt-BR", { numeric: true }) || first.id.localeCompare(second.id, "pt-BR") : moduleOrder[first.module_slug] - moduleOrder[second.module_slug] || first.id.localeCompare(second.id, "pt-BR");
    });
}

export function questionNeighbors(sequence: Question[], id: string) {
  const index = sequence.findIndex((question) => question.id === id);
  return { index, total: sequence.length, previous: index > 0 ? sequence[index - 1] : undefined, next: index >= 0 ? sequence[index + 1] : undefined };
}
