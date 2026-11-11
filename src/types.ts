export type ModuleSlug = "matematica-basica" | "pre-calculo" | "calculo-1";

export type QuestionChoice = {
  label: string;
  content_md: string;
  is_correct: number;
  feedback_md?: string | null;
};

export type Question = {
  id: string;
  statement_md: string;
  question_type: "numeric" | "short_text" | "multiple_choice";
  difficulty: number;
  /** Só o que é desenhado na resolução: number_line e plot. */
  answer: Record<string, unknown>;
  hint_md?: string | null;
  solution_md: string;
  estimated_minutes: number;
  topic_slug: string;
  topic_title: string;
  module_slug: ModuleSlug;
  module_title: string;
  source_title: string;
  source_authors: string;
  source_url: string;
  license_code: string;
  license_url: string;
  source_locator: string;
  adaptation_note: string;
  choices: QuestionChoice[];
};

export type QuestionSummary = Pick<Question,
  "id" | "statement_md" | "difficulty" | "estimated_minutes" | "topic_slug" | "topic_title" | "module_slug"
>;

/** Formato publicado em data/bank/index.json: por tópico, [id, enunciado, dificuldade, minutos]. */
export type QuestionIndexAsset = {
  topics: Record<string, [string, string, number, number][]>;
  topicFiles: Record<string, string>;
};

export type QuestionIndex = {
  questions: QuestionSummary[];
  topicFiles: Record<string, string>;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  description: string;
  position: number;
  module_slug: ModuleSlug;
  module_title: string;
  parent_slug: string | null;
  question_count: number;
};

