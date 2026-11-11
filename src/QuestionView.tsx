import { useEffect, useRef, useState } from "react";
import MathText from "./MathText";
import Icon from "./Icon";
import { experiments, experimentUrl, topicExperiment } from "./learningExperiments";
import { bookUrl, isOpenStax } from "./questionSource";
import NumberLineSolution from "./NumberLineSolution";
import QuestionPlot from "./QuestionPlot";
import { DifficultyDots, difficultyLabels, moduleMeta } from "./questionPresentation";
import type { Question, QuestionSummary } from "./types";

export default function QuestionView({
  question,
  completed,
  onBack,
  onToggleCompleted,
  previous,
  next,
  position,
  total,
  onNavigate,
}: {
  question: Question;
  completed: boolean;
  onBack: () => void;
  onToggleCompleted: () => void;
  previous?: QuestionSummary;
  next?: QuestionSummary;
  position: number;
  total: number;
  onNavigate: (question: QuestionSummary) => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const main = useRef<HTMLElement>(null);
  useEffect(() => { main.current?.focus({ preventScroll: true }); }, []);
  const meta = moduleMeta[question.module_slug];
  const experimentId = Object.hasOwn(experiments, `question-${question.id}`) ? `question-${question.id}` : Object.hasOwn(topicExperiment, question.topic_slug) ? topicExperiment[question.topic_slug] : undefined;

  return (
    <main className="question-page" id="conteudo" tabIndex={-1} ref={main}>
      <div className="question-shell">
        <div className="question-navigation"><button className="back-button" onClick={onBack} type="button">
          Voltar aos exercícios
        </button><nav aria-label="Navegar pelas questões filtradas"><span aria-live="polite">{position > 0 ? `${position} de ${total}` : "Questão avulsa"}</span><button type="button" aria-label="Questão anterior" title={previous ? `Anterior: ${previous.id}` : "Primeira questão da seleção"} disabled={!previous} onClick={() => previous && onNavigate(previous)}><Icon name="previous" /></button><button type="button" aria-label="Próxima questão" title={next ? `Próxima: ${next.id}` : "Última questão da seleção"} disabled={!next} onClick={() => next && onNavigate(next)}><Icon name="next" /></button></nav></div>

        <section className={`question-hero ${meta.className}`}>
          <div className="question-meta-row">
            <span className="module-pill">{question.module_title}</span>
            <span className="question-code">{question.id}</span>
          </div>
          <p className="topic-label">{question.topic_title}</p>
          <h1>
            <MathText>{question.statement_md}</MathText>
          </h1>
          <div className="question-stats">
            <span>{difficultyLabels[question.difficulty]}</span>
            <DifficultyDots value={question.difficulty} />
            <span>≈ {question.estimated_minutes} min</span>
          </div>
        </section>

        <section className="answer-area" aria-label="Área de resposta">
          {question.question_type === "multiple_choice" ? (
            <div className="choice-list">
              {question.choices.map((choice) => {
                const isSelected = selectedChoice === choice.label;
                const isRevealed = showSolution && isSelected;
                const stateClass = isRevealed
                  ? choice.is_correct
                    ? "choice-correct"
                    : "choice-wrong"
                  : "";
                return (
                  <button
                    className={`choice-button ${isSelected ? "choice-selected" : ""} ${stateClass}`}
                    key={choice.label}
                    onClick={() => setSelectedChoice(choice.label)}
                    type="button"
                  >
                    <span className="choice-label">{choice.label}</span>
                    <span>
                      <MathText>{choice.content_md}</MathText>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="open-answer">
              <div>
                <strong>Área de rascunho</strong>
                <p>Use papel, calculadora ou seu método preferido. Depois confira a resolução.</p>
              </div>
            </div>
          )}

          <div className="question-actions">
            {question.hint_md && (
              <button className="secondary-button" aria-expanded={showHint} onClick={() => setShowHint((value) => !value)} type="button">
                <Icon name="hint" />
                {showHint ? "Esconder dica" : "Quero uma dica"}
              </button>
            )}
            <button className="primary-button" aria-expanded={showSolution} onClick={() => setShowSolution((value) => !value)} type="button">
              <Icon name="book" />
              {showSolution ? "Esconder resolução" : "Conferir resolução"}
            </button>
          </div>

          {showHint && question.hint_md && (
            <div className="reveal-panel hint-panel">
              <div>
                <h2><Icon name="hint" size={18} />Dica</h2>
                <p><MathText>{question.hint_md}</MathText></p>
              </div>
            </div>
          )}

          {showSolution && (
            <div className="reveal-panel solution-panel">
              <div>
                <h2><Icon name="book" size={18} />Resolução</h2>
                <p><MathText>{question.solution_md}</MathText></p>
                <NumberLineSolution value={question.answer.number_line} />
                <QuestionPlot value={question.answer.plot} />
              </div>
            </div>
          )}

          <button
            className={`complete-button ${completed ? "is-complete" : ""}`}
            onClick={onToggleCompleted}
            aria-pressed={completed}
            type="button"
          >
            <Icon name={completed ? "checked" : "unchecked"} />
            {completed ? "Exercício concluído" : "Marcar como concluído"}
          </button>
        </section>

        {experimentId && <aside className="question-lab-link"><div><h2>Veja este conceito no gráfico</h2><p>{experiments[`question-${question.id}`] ? "O Laboratório abre com os dados desta questão. Explore antes ou depois de conferir a resolução." : "Explore um exemplo relacionado a este tópico no Laboratório."}</p></div><a className="secondary-button" href={experimentUrl(experimentId)}>Explorar no Laboratório</a></aside>}
        <aside className="source-card">
          <div>
            <p className="section-kicker">Referência bibliográfica</p>
            <h2>{question.source_title}</h2>
            <p>{question.source_locator}</p>
            <p className="source-note">{question.source_authors}{isOpenStax(question) && " · OpenStax, Rice University"}</p>
            <p className="source-note">{question.adaptation_note}</p>
            <p className="source-note">{isOpenStax(question) ? "Tradução e adaptações disponibilizadas sob " : "Licença da referência: "}<a href={question.license_url} target="_blank" rel="noreferrer">{question.license_code}</a>.</p>
            {isOpenStax(question) && <p className="source-note">Access for free at <a href={bookUrl(question)} target="_blank" rel="noreferrer">{bookUrl(question)}</a>.</p>}
          </div>
          <a href={question.source_url} target="_blank" rel="noreferrer">
            Consultar referência
          </a>
        </aside>
      </div>
    </main>
  );
}
