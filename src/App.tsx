import katex from "katex";
import { useEffect, useMemo, useState } from "react";
import type { ModuleSlug, Question, QuestionsPayload } from "./types";

const moduleMeta: Record<
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

const difficultyLabels = ["", "Aquecimento", "Tranquilo", "Desafio", "Avançado", "Expert"];
const moduleOrder: Record<ModuleSlug, number> = {
  "matematica-basica": 0,
  "pre-calculo": 1,
  "calculo-1": 2,
};

function MathText({ children }: { children: string }) {
  const parts = children.split(/(\\\([\s\S]+?\\\))/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          const expression = part.slice(2, -2);
          try {
            return (
              <span
                className="math-inline"
                key={`${expression}-${index}`}
                dangerouslySetInnerHTML={{
                  __html: katex.renderToString(expression, {
                    throwOnError: false,
                    strict: false,
                    output: "htmlAndMathml",
                  }),
                }}
              />
            );
          } catch {
            return <span key={index}>{expression}</span>;
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function DifficultyDots({ value }: { value: number }) {
  return (
    <span className="difficulty-dots" aria-label={`Dificuldade ${value} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span className={index < value ? "dot dot-filled" : "dot"} key={index} />
      ))}
    </span>
  );
}

function QuestionView({
  question,
  completed,
  onBack,
  onToggleCompleted,
}: {
  question: Question;
  completed: boolean;
  onBack: () => void;
  onToggleCompleted: () => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const meta = moduleMeta[question.module_slug];

  return (
    <main className="question-page">
      <div className="question-shell">
        <button className="back-button" onClick={onBack} type="button">
          Voltar aos exercícios
        </button>

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
              <button className="secondary-button" onClick={() => setShowHint((value) => !value)} type="button">
                {showHint ? "Esconder dica" : "Quero uma dica"}
              </button>
            )}
            <button className="primary-button" onClick={() => setShowSolution((value) => !value)} type="button">
              {showSolution ? "Esconder resolução" : "Conferir resolução"}
            </button>
          </div>

          {showHint && question.hint_md && (
            <div className="reveal-panel hint-panel">
              <div>
                <h2>Dica</h2>
                <p><MathText>{question.hint_md}</MathText></p>
              </div>
            </div>
          )}

          {showSolution && (
            <div className="reveal-panel solution-panel">
              <div>
                <h2>Resolução</h2>
                <p><MathText>{question.solution_md}</MathText></p>
              </div>
            </div>
          )}

          <button
            className={`complete-button ${completed ? "is-complete" : ""}`}
            onClick={onToggleCompleted}
            aria-pressed={completed}
            type="button"
          >
            {completed ? "Exercício concluído" : "Marcar como concluído"}
          </button>
        </section>

        <aside className="source-card">
          <div>
            <p className="section-kicker">Fonte do exercício</p>
            <h2>{question.source_title}</h2>
            <p>{question.source_locator}</p>
            <p className="source-note">{question.adaptation_note}</p>
          </div>
          <a href={question.source_url} target="_blank" rel="noreferrer">
            Ver material original
          </a>
        </aside>
      </div>
    </main>
  );
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [moduleFilter, setModuleFilter] = useState<"todos" | ModuleSlug>("todos");
  const [topicFilter, setTopicFilter] = useState("todos");
  const [difficultyFilter, setDifficultyFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem("calculo-completed") ?? "[]") as string[]);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/questions.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar o banco de questões.");
        return response.json() as Promise<QuestionsPayload>;
      })
      .then((payload) => setQuestions(payload.questions))
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  const moduleCounts = useMemo(
    () =>
      questions.reduce<Record<string, number>>((counts, question) => {
        counts[question.module_slug] = (counts[question.module_slug] ?? 0) + 1;
        return counts;
      }, {}),
    [questions],
  );

  const topics = useMemo(
    () =>
      Array.from(
        new Map(
          questions
            .filter((question) => moduleFilter === "todos" || question.module_slug === moduleFilter)
            .map((question) => [question.topic_slug, question.topic_title]),
        ),
      ).sort((a, b) => a[1].localeCompare(b[1], "pt-BR")),
    [questions, moduleFilter],
  );

  const filteredQuestions = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");
    return questions
      .filter((question) => {
        const matchesModule = moduleFilter === "todos" || question.module_slug === moduleFilter;
        const matchesTopic = topicFilter === "todos" || question.topic_slug === topicFilter;
        const matchesDifficulty =
          difficultyFilter === "todos" || question.difficulty === Number(difficultyFilter);
        const matchesSearch =
          !normalizedSearch ||
          question.statement_md.toLocaleLowerCase("pt-BR").includes(normalizedSearch) ||
          question.topic_title.toLocaleLowerCase("pt-BR").includes(normalizedSearch) ||
          question.id.toLocaleLowerCase("pt-BR").includes(normalizedSearch);
        return matchesModule && matchesTopic && matchesDifficulty && matchesSearch;
      })
      .sort(
        (first, second) =>
          moduleOrder[first.module_slug] - moduleOrder[second.module_slug] ||
          first.id.localeCompare(second.id, "pt-BR"),
      );
  }, [questions, moduleFilter, topicFilter, difficultyFilter, search]);

  const featuredQuestion = questions.find((question) => question.id === "C1-001") ?? questions[0];

  const selectModule = (module: ModuleSlug | "todos") => {
    setModuleFilter(module);
    setTopicFilter("todos");
    document.getElementById("exercicios")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("calculo-completed", JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const openQuestion = (question: Question) => {
    setSelectedQuestion(question);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedQuestion) {
    return (
      <>
        <Header onExplore={() => setSelectedQuestion(null)} compact />
        <QuestionView
          key={selectedQuestion.id}
          question={selectedQuestion}
          completed={completedIds.has(selectedQuestion.id)}
          onBack={() => {
            setSelectedQuestion(null);
            window.setTimeout(() => document.getElementById("exercicios")?.scrollIntoView(), 0);
          }}
          onToggleCompleted={() => toggleCompleted(selectedQuestion.id)}
        />
      </>
    );
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#exercicios">Pular para os exercícios</a>
      <Header onExplore={() => document.getElementById("exercicios")?.scrollIntoView({ behavior: "smooth" })} />

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="section-kicker">Projeto de extensão universitária</p>
            <h1>Exercícios para chegar ao Cálculo entendendo o caminho.</h1>
            <p className="hero-text">
              Pratique Matemática Básica, Pré-Cálculo e Cálculo 1 com dicas, resolução passo a passo e a fonte de cada questão.
            </p>
            <div className="hero-actions">
              <button className="primary-button hero-button" onClick={() => selectModule("todos")} type="button">
                Ver banco de exercícios
              </button>
              <span className="question-total">{questions.length || 24} questões no acervo inicial</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Prévia de um exercício do acervo">
            <div className="exercise-sheet">
              <div className="sheet-meta">
                <span>Questão do acervo</span>
                <span>{featuredQuestion?.id ?? "C1-001"}</span>
              </div>
              <p>{featuredQuestion?.topic_title ?? "Limites e continuidade"}</p>
              <h2>
                <MathText>
                  {featuredQuestion?.statement_md ?? "Calcule \\(\\lim_{x \\to 2} \\frac{2x^2-3x-2}{x-2}\\)."}
                </MathText>
              </h2>
              <button
                disabled={!featuredQuestion}
                onClick={() => featuredQuestion && openQuestion(featuredQuestion)}
                type="button"
              >
                Abrir esta questão
              </button>
            </div>
          </div>
        </section>

        <section className="module-section" aria-labelledby="module-title">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Sequência de estudo</p>
              <h2 id="module-title">Comece pelo conteúdo que precisa revisar.</h2>
            </div>
            <p>Você pode mudar de módulo quando quiser. Seu progresso fica salvo neste dispositivo.</p>
          </div>

          <ol className="module-list">
            {(Object.entries(moduleMeta) as [ModuleSlug, (typeof moduleMeta)[ModuleSlug]][]).map(
              ([slug, meta], index) => (
                <li key={slug}>
                  <button
                    className={`module-row ${meta.className}`}
                    onClick={() => selectModule(slug)}
                    type="button"
                  >
                    <span className="module-sequence" aria-hidden="true">{index + 1}</span>
                    <span className="module-card-copy">
                      <strong>{meta.short}</strong>
                      <span>{meta.description}</span>
                    </span>
                    <span className="module-count">{moduleCounts[slug] ?? 0} exercícios</span>
                  </button>
                </li>
              ),
            )}
          </ol>
        </section>

        <section className="exercise-section" id="exercicios" aria-labelledby="exercise-title">
          <div className="section-heading exercise-heading">
            <div>
              <p className="section-kicker">Banco de questões</p>
              <h2 id="exercise-title">Escolha o que praticar agora.</h2>
            </div>
            <div className="progress-chip">
              <span>{completedIds.size}</span> concluído{completedIds.size === 1 ? "" : "s"}
            </div>
          </div>

          <div className="filters" aria-label="Filtros de exercícios">
            <label className="search-field">
              <span className="sr-only">Buscar exercício</span>
              <input
                type="search"
                placeholder="Buscar por assunto ou código..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <label>
              <span className="sr-only">Módulo</span>
              <select
                value={moduleFilter}
                onChange={(event) => {
                  setModuleFilter(event.target.value as "todos" | ModuleSlug);
                  setTopicFilter("todos");
                }}
              >
                <option value="todos">Todos os módulos</option>
                <option value="matematica-basica">Matemática Básica</option>
                <option value="pre-calculo">Pré-Cálculo</option>
                <option value="calculo-1">Cálculo 1</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Tópico</span>
              <select value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)}>
                <option value="todos">Todos os tópicos</option>
                {topics.map(([slug, title]) => <option value={slug} key={slug}>{title}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Dificuldade</span>
              <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
                <option value="todos">Todas as dificuldades</option>
                {difficultyLabels.slice(1).map((label, index) => (
                  <option value={index + 1} key={label}>{label}</option>
                ))}
              </select>
            </label>
          </div>

          {loading && <div className="state-message">Carregando os exercícios...</div>}
          {error && <div className="state-message state-error">{error}</div>}
          {!loading && !error && (
            <>
              <div className="results-line">
                <strong>{filteredQuestions.length}</strong> exercício{filteredQuestions.length === 1 ? "" : "s"} encontrado{filteredQuestions.length === 1 ? "" : "s"}
              </div>
              <div className="question-grid">
                {filteredQuestions.map((question) => {
                  const meta = moduleMeta[question.module_slug];
                  const completed = completedIds.has(question.id);
                  return (
                    <article className={`question-card ${meta.className}`} key={question.id}>
                      <div className="question-card-top">
                        <span className="question-code">{question.id}</span>
                        {completed && <span className="completed-badge">Concluído</span>}
                      </div>
                      <p className="question-topic">{question.topic_title}</p>
                      <h3><MathText>{question.statement_md}</MathText></h3>
                      <div className="question-card-footer">
                        <div>
                          <DifficultyDots value={question.difficulty} />
                          <span>{question.estimated_minutes} min</span>
                        </div>
                        <button onClick={() => openQuestion(question)} type="button" aria-label={`Abrir ${question.id}`}>
                          Resolver
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
              {filteredQuestions.length === 0 && (
                <div className="empty-state">
                  <h3>Nenhum exercício por aqui</h3>
                  <p>Tente retirar um filtro ou buscar por outro assunto.</p>
                </div>
              )}
            </>
          )}
        </section>

        <section className="about-strip" id="sobre">
          <div>
            <p className="section-kicker">Sobre o projeto</p>
            <h2>Apoio para quem está chegando às Exatas.</h2>
            <p>
              Um projeto de extensão universitária com exercícios organizados, resoluções claras e acesso gratuito.
            </p>
          </div>
          <p className="about-facts">O piloto reúne 3 módulos e {questions.length || 24} exercícios. Todo o conteúdo pode ser acessado sem cadastro.</p>
        </section>
      </main>

      <footer>
        <div className="brand"><span>∫</span> Base Cálculo</div>
        <p>Plataforma gratuita de apoio ao ensino de Cálculo.</p>
        <a href="#top">Início</a>
      </footer>
    </div>
  );
}

function Header({ onExplore, compact = false }: { onExplore: () => void; compact?: boolean }) {
  return (
    <header className={compact ? "site-header compact-header" : "site-header"} id="top">
      <a className="brand" href="#top" onClick={onExplore}>
        <span aria-hidden="true">∫</span> Base Cálculo
      </a>
      {!compact && (
        <nav aria-label="Navegação principal">
          <button onClick={onExplore} type="button">Banco de questões</button>
          <a href="#sobre">Sobre</a>
        </nav>
      )}
      <span className="header-tag">Acesso gratuito</span>
    </header>
  );
}

export default App;
