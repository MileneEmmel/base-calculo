import type { Question } from "./types";

export const bookUrl = (question: Question) => question.source_url.replace(/\/pages\/.*$/, "/pages/1-introduction");

export default function SourceCredits({ questions }: { questions: Question[] }) {
  const books = [...new Map(questions.map((question) => [bookUrl(question), question])).values()];
  if (!books.length) return null;
  return <aside className="source-credits" aria-label="Créditos e licenças dos exercícios"><p>Exercícios traduzidos e adaptados de OpenStax. As adaptações seguem a licença indicada em cada obra.</p>{books.map((question) => <p key={bookUrl(question)}><strong>{question.source_title.split(",")[0]}</strong> · {question.source_authors}. Access for free at <a href={bookUrl(question)} target="_blank" rel="noreferrer">{bookUrl(question)}</a> · <a href={question.license_url} target="_blank" rel="noreferrer">{question.license_code}</a>.</p>)}</aside>;
}
