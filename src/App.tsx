import katex from "katex";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import type { ModuleSlug, Question, QuestionsPayload, Topic } from "./types";
import { progressKey, readProgress, writeLocal } from "./browserStorage";
import SelectMenu from "./SelectMenu";
import { experiments, experimentUrl, topicExperiment } from "./learningExperiments";
import { bankQuery, defaultBankFilters, filterQuestions, questionNeighbors, readBankFilters, ia2ChapterOneSource, isIA2ChapterOne, ia2BookSource, isIA2Book } from "./questionNavigation";
import SourceCredits, { bookUrl } from "./SourceCredits";
import NumberLineSolution from "./NumberLineSolution";
import QuestionPlot from "./QuestionPlot";
const Laboratory = lazy(() => import("./Laboratory"));
const ConceptMap = lazy(() => import("./ConceptMap"));

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

const difficultyLabels = ["", "Fácil", "Médio", "Difícil", "Desafio"];

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
    <span className="difficulty-dots" aria-label={`Dificuldade ${value} de 4: ${difficultyLabels[value]}`}>
      {Array.from({ length: 4 }, (_, index) => (
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
  previous?: Question;
  next?: Question;
  position: number;
  total: number;
  onNavigate: (question: Question) => void;
}) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const meta = moduleMeta[question.module_slug];
  const experimentId = experiments[`question-${question.id}`] ? `question-${question.id}` : topicExperiment[question.topic_slug];

  return (
    <main className="question-page" id="conteudo" tabIndex={-1}>
      <div className="question-shell">
        <div className="question-navigation"><button className="back-button" onClick={onBack} type="button">
          Voltar aos exercícios
        </button><nav aria-label="Navegar pelas questões filtradas"><span aria-live="polite">{position > 0 ? `${position} de ${total}` : "Questão avulsa"}</span><button type="button" aria-label="Questão anterior" title={previous ? `Anterior: ${previous.id}` : "Primeira questão da seleção"} disabled={!previous} onClick={() => previous && onNavigate(previous)}>←</button><button type="button" aria-label="Próxima questão" title={next ? `Próxima: ${next.id}` : "Última questão da seleção"} disabled={!next} onClick={() => next && onNavigate(next)}>→</button></nav></div>

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
            {completed ? "Exercício concluído" : "Marcar como concluído"}
          </button>
        </section>

        {experimentId && <aside className="question-lab-link"><div><h2>Veja este conceito no gráfico</h2><p>{experiments[`question-${question.id}`] ? "O Laboratório abre com os dados desta questão. Explore antes ou depois de conferir a resolução." : "Explore um exemplo relacionado a este tópico no Laboratório."}</p></div><a className="secondary-button" href={experimentUrl(experimentId)}>Explorar no Laboratório</a></aside>}
        <aside className="source-card">
          <div>
            <p className="section-kicker">Fonte do exercício</p>
            <h2>{question.source_title}</h2>
            <p>{question.source_locator}</p>
            <p className="source-note">{question.source_authors} · OpenStax, Rice University</p>
            <p className="source-note">{question.adaptation_note}</p>
            <p className="source-note">Tradução e adaptações disponibilizadas sob <a href={question.license_url} target="_blank" rel="noreferrer">{question.license_code}</a>.</p>
            <p className="source-note">Access for free at <a href={bookUrl(question)} target="_blank" rel="noreferrer">{bookUrl(question)}</a>.</p>
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
  const [topicCatalog, setTopicCatalog] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || "/");
  const [moduleFilter, setModuleFilter] = useState<"todos" | ModuleSlug>(() => readBankFilters(route).module);
  const [topicFilter, setTopicFilter] = useState(() => readBankFilters(route).topic);
  const [difficultyFilter, setDifficultyFilter] = useState(() => readBankFilters(route).difficulty);
  const [search, setSearch] = useState(() => readBankFilters(route).search);
  const [sourceFilter, setSourceFilter] = useState(() => readBankFilters(route).source);
  const [progressSaved, setProgressSaved] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try {
      return readProgress(localStorage.getItem(progressKey));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    setProgressSaved(writeLocal(progressKey, Array.from(completedIds)));
  }, [completedIds]);

  useEffect(() => {
    const syncProgress = (event: StorageEvent) => {
      if (event.storageArea === localStorage && (event.key === progressKey || event.key === null)) setCompletedIds(readProgress(event.key === null ? null : event.newValue));
    };
    window.addEventListener("storage", syncProgress);
    return () => window.removeEventListener("storage", syncProgress);
  }, []);

  useEffect(() => {
    const updateRoute = () => setRoute(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", updateRoute);
    return () => window.removeEventListener("hashchange", updateRoute);
  }, []);

  useEffect(() => {
    document.title = route.startsWith("/questoes") ? "Banco de questões | ∫NTEGRA" : route.startsWith("/laboratorio") ? "Laboratório | ∫NTEGRA" : route.startsWith("/mapa") ? "Mapa de conceitos | ∫NTEGRA" : "∫NTEGRA";
    document.getElementById("conteudo")?.focus({ preventScroll: true });
    if (route === "/sobre") {
      document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [route]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/questions.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Não foi possível carregar o banco de questões.");
        return response.json() as Promise<QuestionsPayload>;
      })
      .then((payload) => { setQuestions(payload.questions); setTopicCatalog(payload.topics); })
      .catch((reason: Error) => setError(reason.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!route.startsWith("/questoes") || !route.includes("?")) return;
    const filters = readBankFilters(route, topicCatalog);
    setModuleFilter(filters.module); setTopicFilter(filters.topic); setDifficultyFilter(filters.difficulty); setSearch(filters.search);
    setSourceFilter(filters.source);
  }, [route, topicCatalog]);

  const moduleCounts = useMemo(
    () =>
      questions.reduce<Record<string, number>>((counts, question) => {
        counts[question.module_slug] = (counts[question.module_slug] ?? 0) + 1;
        return counts;
      }, {}),
    [questions],
  );

  const topics = useMemo(
    () => topicCatalog.filter((topic) => moduleFilter === "todos" || topic.module_slug === moduleFilter),
    [topicCatalog, moduleFilter],
  );
  const selectedTopic = topicCatalog.find((topic) => topic.slug === topicFilter);

  const filteredQuestions = useMemo(() => filterQuestions(questions, { module: moduleFilter, topic: topicFilter, difficulty: difficultyFilter, search, source: sourceFilter }), [questions, moduleFilter, topicFilter, difficultyFilter, search, sourceFilter]);
  const sourceOptions = useMemo(() => {
    const sources = new Map<string, { value: string; label: string; count: number }>();
    const chapterCount = questions.filter(isIA2ChapterOne).length;
    if (chapterCount) sources.set(ia2ChapterOneSource, { value: ia2ChapterOneSource, label: "Intermediate Algebra 2e — Capítulo 1", count: chapterCount });
    const bookCount = questions.filter(isIA2Book).length;
    if (bookCount) sources.set(ia2BookSource, { value: ia2BookSource, label: "Intermediate Algebra 2e — Todas as questões ativas", count: bookCount });
    questions.forEach((question) => { const existing = sources.get(question.source_id); if (existing) existing.count++; else sources.set(question.source_id, { value: question.source_id, label: question.source_title, count: 1 }); });
    return [...sources.values()].sort((a, b) => a.label.localeCompare(b.label, "pt-BR", { numeric: true })).map(({ count, ...source }) => ({ ...source, description: `${count} ${count === 1 ? "questão" : "questões"} · ordem dos exercícios originais` }));
  }, [questions]);

  const featuredQuestion = questions.find((question) => question.id === "C1-001") ?? questions[0];
  const isQuestionBank = route.startsWith("/questoes");
  const isLaboratory = route.split("?")[0] === "/laboratorio";
  const isConceptMap = route.split("?")[0] === "/mapa";
  const presetId = new URLSearchParams(route.split("?")[1] ?? "").get("experimento") ?? undefined;
  const questionId = route.startsWith("/questoes/") ? decodeURIComponent(route.split("?")[0].slice("/questoes/".length)) : null;
  const selectedQuestion = questions.find((question) => question.id === questionId);
  const neighbors = questionNeighbors(filteredQuestions, questionId ?? "");
  const activeFilters = { module: moduleFilter, topic: topicFilter, difficulty: difficultyFilter, search, source: sourceFilter };
  useEffect(() => {
    if (route.split("?")[0] === "/questoes") window.history.replaceState(null, "", `#/questoes?${bankQuery({ module: moduleFilter, topic: topicFilter, difficulty: difficultyFilter, search, source: sourceFilter })}`);
  }, [route, moduleFilter, topicFilter, difficultyFilter, search, sourceFilter]);

  const selectModule = (module: ModuleSlug | "todos") => {
    setModuleFilter(module);
    setTopicFilter("todos");
    setSourceFilter("todos");
    window.location.hash = "/questoes";
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openQuestion = (question: Question, useActiveFilters = true) => {
    window.location.hash = `/questoes/${encodeURIComponent(question.id)}?${bankQuery(useActiveFilters ? activeFilters : defaultBankFilters)}`;
  };

  if (selectedQuestion) {
    return (
      <>
        <Header isQuestionBank />
        <p className="progress-storage-note" role="status">{progressSaved ? "Histórico salvo neste navegador. Você pode fechar e continuar depois no mesmo endereço." : "O navegador não permitiu salvar o histórico. Verifique o armazenamento do site."}</p>
        <QuestionView
          key={selectedQuestion.id}
          question={selectedQuestion}
          completed={completedIds.has(selectedQuestion.id)}
          previous={neighbors.previous}
          next={neighbors.next}
          position={neighbors.index + 1}
          total={neighbors.total}
          onNavigate={openQuestion}
          onBack={() => {
            window.location.hash = `/questoes?${bankQuery(activeFilters)}`;
          }}
          onToggleCompleted={() => toggleCompleted(selectedQuestion.id)}
        />
      </>
    );
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#conteudo" onClick={(event) => {
        event.preventDefault();
        document.getElementById("conteudo")?.focus();
      }}>Pular para o conteúdo</a>
      <Header isQuestionBank={isQuestionBank} isLaboratory={isLaboratory} isConceptMap={isConceptMap} />

      <main id="conteudo" tabIndex={-1}>
        {isLaboratory && <Suspense fallback={<div className="state-message">Abrindo o laboratório...</div>}><Laboratory topics={topicCatalog} presetId={presetId} /></Suspense>}
        {isConceptMap && <section className="map-page"><div className="section-heading"><div><p className="section-kicker">Sequência de estudo</p><h1>Mapa de conceitos</h1></div><p>Encontre as conexões entre os assuntos, revise os pré-requisitos e escolha o próximo passo.</p></div>{loading ? <p className="state-message">Carregando o mapa...</p> : error ? <p className="state-message state-error">{error}</p> : <Suspense fallback={<p className="state-message">Abrindo o mapa...</p>}><ConceptMap topics={topicCatalog} /></Suspense>}</section>}
        {!isQuestionBank && !isLaboratory && !isConceptMap && <>
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
              <span className="question-total">{questions.length} questões no acervo</span>
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
                onClick={() => featuredQuestion && openQuestion(featuredQuestion, false)}
                type="button"
              >
                Abrir esta questão
              </button>
            </div>
            <SourceCredits questions={featuredQuestion ? [featuredQuestion] : []} />
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

        </>}
        {isQuestionBank && (
        <section className="exercise-section" id="exercicios" aria-labelledby="exercise-title">
          {!progressSaved && <p className="progress-storage-note" role="status">O navegador não permitiu salvar o histórico. Verifique o armazenamento do site.</p>}
          <div className="section-heading exercise-heading">
            <div>
              <p className="section-kicker">Banco de questões</p>
              <h1 id="exercise-title">Escolha o que praticar agora.</h1>
            </div>
            <div className="progress-chip">
              <span>{completedIds.size}</span> concluído{completedIds.size === 1 ? "" : "s"}
            </div>
          </div>

          <div className="filters" aria-label="Filtros de exercícios">
            <div className="reference-filter"><SelectMenu label="Referência" value={sourceFilter} options={[{ value: "todos", label: "Todas as referências", description: "Combine a referência com os filtros abaixo." }, ...sourceOptions]} onChange={setSourceFilter} /></div>
            <label className="search-field">
              <span className="sr-only">Buscar exercício</span>
              <input
                type="search"
                placeholder="Buscar por assunto ou código..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <SelectMenu label="Módulo" value={moduleFilter} options={[{ value: "todos", label: "Todos os módulos" }, ...Object.entries(moduleMeta).map(([value, meta]) => ({ value, label: meta.short }))]} onChange={(value) => { setModuleFilter(value as "todos" | ModuleSlug); setTopicFilter("todos"); }} />
            <SelectMenu label="Tópico" value={topicFilter} options={[{ value: "todos", label: "Todos os tópicos" }, ...topics.map((topic) => ({ value: topic.slug, label: topic.title, description: `${topic.module_title}${topic.parent_slug ? " · Funções" : ""} · ${topic.question_count === 0 ? "sem questões" : `${topic.question_count} ${topic.question_count === 1 ? "questão" : "questões"}`}` }))]} onChange={setTopicFilter} />
            <SelectMenu label="Dificuldade" value={difficultyFilter} options={[{ value: "todos", label: "Todas as dificuldades" }, ...difficultyLabels.slice(1).map((label, index) => ({ value: String(index + 1), label }))]} onChange={setDifficultyFilter} />
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
                  <h3>{selectedTopic?.question_count === 0 ? "Este tópico ainda não tem questões" : "Nenhum exercício por aqui"}</h3>
                  <p>{selectedTopic?.question_count === 0 ? `${selectedTopic.title} já está cadastrado em ${selectedTopic.module_title}. Os exercícios serão incluídos neste tópico.` : "Tente retirar um filtro ou buscar por outro assunto."}</p>
                </div>
              )}
              <SourceCredits questions={filteredQuestions} />
            </>
          )}
        </section>
        )}

        {!isQuestionBank && !isLaboratory && !isConceptMap && (
        <section className="about-strip" id="sobre">
          <div>
            <p className="section-kicker">Sobre o projeto</p>
            <h2>Apoio para quem está chegando às Exatas.</h2>
            <p>
              Um projeto de extensão universitária com exercícios organizados, resoluções claras e acesso gratuito.
            </p>
          </div>
          <p className="about-facts">O acervo reúne 3 módulos e {questions.length} exercícios. Todo o conteúdo pode ser acessado sem cadastro.</p>
        </section>
        )}
      </main>

      <footer>
        <div className="brand" aria-label="∫NTEGRA"><span aria-hidden="true">∫</span>NTEGRA</div>
        <p>Plataforma gratuita de apoio ao ensino de Cálculo.</p>
        <a href="#/">Início</a>
      </footer>
    </div>
  );
}

function Header({ isQuestionBank = false, isLaboratory = false, isConceptMap = false }: { isQuestionBank?: boolean; isLaboratory?: boolean; isConceptMap?: boolean }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="∫NTEGRA — Início">
        <span aria-hidden="true">∫</span>NTEGRA
      </a>
      <nav aria-label="Navegação principal">
        <a href="#/" aria-current={!isQuestionBank && !isLaboratory && !isConceptMap ? "page" : undefined}>Início</a>
        <a href="#/questoes" aria-current={isQuestionBank ? "page" : undefined}>Banco de questões</a>
        <a href="#/laboratorio" aria-current={isLaboratory ? "page" : undefined}>Laboratório</a>
        <a href="#/mapa" aria-current={isConceptMap ? "page" : undefined}>Mapa de conceitos</a>
        <a href="#/sobre">Sobre</a>
      </nav>
    </header>
  );
}

export default App;
