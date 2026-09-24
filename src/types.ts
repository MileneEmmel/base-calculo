export type ModuleSlug = "matematica-basica" | "pre-calculo" | "calculo-1";

export type QuestionChoice = {
  label: string;
  content_md: string;
  is_correct: number;
  feedback_md?: string | null;
};

export type Question = {
  id: string;
  slug: string;
  statement_md: string;
  question_type: "numeric" | "short_text" | "multiple_choice";
  difficulty: number;
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

export type QuestionsPayload = {
  version: number;
  questions: Question[];
};

