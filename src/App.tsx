import { lazy, Suspense, useDeferredValue, useEffect, useMemo, useState } from "react";
import type { ModuleSlug, Question, QuestionIndex, QuestionIndexAsset, QuestionSummary, Topic } from "./types";
import { progressKey, readProgress, writeLocal } from "./browserStorage";
import SelectMenu from "./SelectMenu";
import Icon from "./Icon";
import type { ProgressFilter } from "./questionNavigation";
import { bankQuery, defaultBankFilters, filterQuestions, questionNeighbors, readBankFilters, matchesProgress } from "./questionNavigation";
import { DifficultyDots, difficultyLabels, moduleMeta } from "./questionPresentation";
import catalog from "./questionCatalog.generated.json";
import { currentRoute, navigate, onRouteChange, replaceRoute } from "./router";
import { applySeo, knownRoute } from "./seo";
import StorageNotice from "./StorageNotice";

const loadLaboratory = () => import("./LabWorkspace");
const loadConceptMap = () => import("./ConceptMap");
const loadStudy = () => import("./StudyPage");
const Laboratory = lazy(loadLaboratory);
const ConceptMap = lazy(loadConceptMap);
const StudyPage = lazy(loadStudy);
const LegalPage = lazy(() => import("./LegalPage"));
const loadQuestionView = () => import("./QuestionView");
const QuestionView = lazy(loadQuestionView);
const MathText = lazy(() => import("./MathText"));
const questionsPerPage = 24;
const topicCatalog = catalog.topics as Topic[];
const featuredQuestion = catalog.featured;
const emptyQuestions: QuestionSummary[] = [];
const moduleCounts = topicCatalog.reduce<Partial<Record<ModuleSlug, number>>>((counts, topic) => {
  counts[topic.module_slug] = (counts[topic.module_slug] ?? 0) + topic.question_count;
  return counts;
}, {});
const totalQuestions = topicCatalog.reduce((total, topic) => total + topic.question_count, 0);

type LoadState<T> = { data: T; error?: never } | { data?: never; error: string };
let bankRequest: Promise<QuestionIndex> | undefined;
const topicRequests = new Map<string, Promise<Question[]>>();

async function fetchBankAsset<T>(file: string, cache: RequestCache = "default"): Promise<T> {
  const response = await fetch(`${import.meta.env.BASE_URL}data/bank/${file}`, { cache });
  if (!response.ok) throw new Error("O arquivo de exercícios não está disponível.");
  return response.json() as Promise<T>;
}

const topicsBySlug = new Map(topicCatalog.map((topic) => [topic.slug, topic]));

function expandIndex({ topics, topicFiles }: QuestionIndexAsset): QuestionIndex {
  const questions = Object.entries(topics).flatMap(([topic_slug, rows]) => {
    const topic = topicsBySlug.get(topic_slug);
    if (!topic) return [];
    return rows.map(([id, statement_md, difficulty, estimated_minutes]) => ({ id, statement_md, difficulty, estimated_minutes, topic_slug, topic_title: topic.title, module_slug: topic.module_slug }));
  });
  return { questions, topicFiles };
}

function loadQuestionIndex() {
  bankRequest ??= fetchBankAsset<QuestionIndexAsset>("index.json", "no-cache").then(expandIndex).catch((error: unknown) => {
    bankRequest = undefined;
    throw error;
  });
  return bankRequest;
}

function loadTopicQuestions(file: string) {
  let request = topicRequests.get(file);
  if (!request) {
    request = fetchBankAsset<Question[]>(file).catch((error: unknown) => {
      topicRequests.delete(file);
      throw error;
    });
    topicRequests.set(file, request);
  }
  return request;
}

function DeferredMath({ children }: { children: string }) {
  return <Suspense fallback={<span aria-hidden="true">…</span>}><MathText>{children}</MathText></Suspense>;
}

function App() {
  const [bank, setBank] = useState<LoadState<QuestionIndex> | null>(null);
  const [topicDetails, setTopicDetails] = useState<({ file: string } & LoadState<Question[]>) | null>(null);
  const [route, setRoute] = useState(currentRoute);
  const isQuestionBank = route.startsWith("/questoes");
  const questions = isQuestionBank ? bank?.data?.questions ?? emptyQuestions : emptyQuestions;
  const loading = isQuestionBank && bank === null;
  const error = isQuestionBank ? bank?.error : null;
  const [filterRoute, setFilterRoute] = useState(route);
  const [initialFilters] = useState(() => isQuestionBank ? readBankFilters(route, topicCatalog) : defaultBankFilters);
  const [moduleFilter, setModuleFilter] = useState<"todos" | ModuleSlug>(initialFilters.module);
  const [topicFilter, setTopicFilter] = useState(initialFilters.topic);
  const [difficultyFilter, setDifficultyFilter] = useState(initialFilters.difficulty);
  const [search, setSearch] = useState(initialFilters.search);
  const deferredSearch = useDeferredValue(search);
  const [progressFilter, setProgressFilter] = useState(initialFilters.progress);
  const [bankPage, setBankPage] = useState({ filters: "", number: 1 });
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
    return onRouteChange(() => setRoute(currentRoute()));
  }, []);

  useEffect(() => {
    applySeo(route, topicCatalog);
    document.getElementById("conteudo")?.focus({ preventScroll: true });
    if (route === "/sobre") {
      document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [route]);

  useEffect(() => {
    if (!isQuestionBank || bank) return;
    let active = true;
    loadQuestionIndex().then(
      (data) => { if (active) setBank({ data }); },
      () => { if (active) setBank({ error: "Não foi possível carregar o banco de questões." }); },
    );
    return () => { active = false; };
  }, [isQuestionBank, bank]);

  useEffect(() => {
    if (!isQuestionBank) return;
    if (route.includes("?")) {
      const filters = readBankFilters(route, topicCatalog);
      setModuleFilter(filters.module);
      setTopicFilter(filters.topic);
      setDifficultyFilter(filters.difficulty);
      setSearch(filters.search);
      setProgressFilter(filters.progress);
    }
    setFilterRoute(route);
  }, [isQuestionBank, route]);

  const topics = useMemo(
    () => topicCatalog.filter((topic) => moduleFilter === "todos" || topic.module_slug === moduleFilter),
    [moduleFilter],
  );
  const selectedTopic = topicCatalog.find((topic) => topic.slug === topicFilter);

  const matchingQuestions = useMemo(() => filterQuestions(questions, { module: moduleFilter, topic: topicFilter, difficulty: difficultyFilter, search: deferredSearch }), [questions, moduleFilter, topicFilter, difficultyFilter, deferredSearch]);
  const filteredQuestions = useMemo(() => matchingQuestions.filter((question) => matchesProgress(question.id, progressFilter, completedIds)), [matchingQuestions, progressFilter, completedIds]);
  const matchingCompleted = useMemo(() => matchingQuestions.filter((question) => completedIds.has(question.id)).length, [matchingQuestions, completedIds]);

  const isLaboratory = route.split("?")[0] === "/laboratorio";
  const isConceptMap = route.split("?")[0] === "/mapa";
  const isStudy = route.split("?")[0] === "/estudar";
  const routeParams = new URLSearchParams(route.split("?")[1] ?? "");
  const presetId = routeParams.get("experimento") ?? undefined;
  const routeTopic = routeParams.get("topico");
  const routePath = route.split("?")[0];
  const legalPage = routePath === "/privacidade" ? "privacidade" : routePath === "/termos" ? "termos" : null;
  const isNotFound = !knownRoute(routePath);
  const isHome = !isQuestionBank && !isLaboratory && !isConceptMap && !isStudy && !legalPage && !isNotFound;
  const questionId = route.startsWith("/questoes/") ? decodeURIComponent(route.split("?")[0].slice("/questoes/".length)) : null;
  const selectedSummary = questionId ? questions.find((question) => question.id === questionId) : undefined;
  const detailFile = selectedSummary ? bank?.data?.topicFiles[selectedSummary.topic_slug] : undefined;
  const activeDetails = topicDetails?.file === detailFile ? topicDetails : null;
  const selectedQuestion = activeDetails?.data?.find((question) => question.id === questionId);
  useEffect(() => {
    if (!detailFile || activeDetails) return;
    let active = true;
    void loadQuestionView().catch(() => {});
    loadTopicQuestions(detailFile).then(
      (data) => { if (active) setTopicDetails({ file: detailFile, data }); },
      () => { if (active) setTopicDetails({ file: detailFile, error: "Não foi possível carregar o exercício." }); },
    );
    return () => { active = false; };
  }, [detailFile, activeDetails]);
  const neighbors = questionNeighbors(filteredQuestions, questionId ?? "");
  const selectedIndex = neighbors.index < 0 && questionId ? matchingQuestions.findIndex((question) => question.id === questionId) : -1;
  const matchesSelectedProgress = (question: QuestionSummary) => matchesProgress(question.id, progressFilter, completedIds);
  const previous = selectedIndex < 0 ? neighbors.previous : matchingQuestions.slice(0, selectedIndex).reverse().find(matchesSelectedProgress);
  const next = selectedIndex < 0 ? neighbors.next : matchingQuestions.slice(selectedIndex + 1).find(matchesSelectedProgress);
  const activeFilters = { module: moduleFilter, topic: topicFilter, difficulty: difficultyFilter, search, progress: progressFilter };
  const filterKey = bankQuery(activeFilters);
  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / questionsPerPage));
  const currentPage = bankPage.filters === filterKey ? Math.min(bankPage.number, totalPages) : 1;
  const pageOffset = (currentPage - 1) * questionsPerPage;
  const visibleQuestions = filteredQuestions.slice(pageOffset, pageOffset + questionsPerPage);
  const changeBankPage = (number: number) => {
    setBankPage({ filters: filterKey, number });
    document.getElementById("bank-results")?.scrollIntoView({ behavior: "instant", block: "start" });
    document.getElementById("bank-results")?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (filterRoute === route && route.split("?")[0] === "/questoes") replaceRoute(`/questoes?${filterKey}`);
  }, [filterRoute, route, filterKey]);

  const selectModule = (module: ModuleSlug | "todos") => {
    setModuleFilter(module);
    setTopicFilter("todos");
    setProgressFilter("todos");
    navigate("/questoes");
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openQuestion = (question: Pick<Question, "id">, useActiveFilters = true) => {
    navigate(`/questoes/${encodeURIComponent(question.id)}?${bankQuery(useActiveFilters ? activeFilters : defaultBankFilters)}`);
  };
  const returnToBank = () => navigate(`/questoes?${filterKey}`);
  const retryQuestion = () => {
    bankRequest = undefined;
    setTopicDetails(null);
    setBank(null);
  };

  if (selectedQuestion) {
    return (
      <>
        <SkipLink />
        <Header isQuestionBank />
        {!progressSaved && <p className="progress-storage-note" role="status">O navegador não permitiu salvar o histórico. Verifique o armazenamento do site.</p>}
        <Suspense fallback={<main id="conteudo" tabIndex={-1} className="state-message">Abrindo o exercício...</main>}><QuestionView
          key={selectedQuestion.id}
          question={selectedQuestion}
          completed={completedIds.has(selectedQuestion.id)}
          previous={previous}
          next={next}
          position={neighbors.index + 1}
          total={neighbors.total}
          onNavigate={openQuestion}
          onBack={returnToBank}
          onToggleCompleted={() => toggleCompleted(selectedQuestion.id)}
        /></Suspense>
      </>
    );
  }

  if (questionId) {
    const message = error ?? activeDetails?.error;
    const opening = loading || (detailFile && !activeDetails);
    return <>
      <SkipLink />
      <Header isQuestionBank />
      <main id="conteudo" tabIndex={-1} className="state-message">
        <p role="status">{message ?? (opening ? "Abrindo o exercício..." : "Exercício não encontrado.")}</p>
        {message && <button type="button" className="secondary-button" onClick={retryQuestion}>Tentar novamente</button>}
        {!opening && <button type="button" className="back-button" onClick={returnToBank}>Voltar aos exercícios</button>}
      </main>
    </>;
  }

  return (
    <div className="site-shell">
      <SkipLink />
      <Header isHome={isHome} isQuestionBank={isQuestionBank} isLaboratory={isLaboratory} isConceptMap={isConceptMap} isStudy={isStudy} />

      <main id="conteudo" tabIndex={-1}>
        {isLaboratory && <Suspense fallback={<div className="state-message">Abrindo o laboratório...</div>}><Laboratory presetId={presetId} /></Suspense>}
        {isConceptMap && <section className="map-page"><div className="section-heading"><h1>Mapa de conceitos</h1></div><Suspense fallback={<p className="state-message">Abrindo o mapa...</p>}><ConceptMap key={routeTopic} topics={topicCatalog} initialTopic={routeTopic ?? undefined} /></Suspense></section>}
        {isStudy && <Suspense fallback={<p className="state-message">Abrindo a área de estudo...</p>}><StudyPage topics={topicCatalog} topicSlug={routeTopic} moduleSlug={routeParams.get("modulo")} /></Suspense>}
        {legalPage && <Suspense fallback={<p className="state-message">Abrindo a página...</p>}><LegalPage page={legalPage} /></Suspense>}
        {isNotFound && <section className="state-message not-found" aria-labelledby="not-found-title">
          <h1 id="not-found-title">Página não encontrada</h1>
          <p>O endereço pode ter mudado ou estar incompleto.</p>
          <a className="primary-button" href="/">Voltar ao início</a>
        </section>}
        {isHome && <>
        <section className="hero">
          <div className="hero-copy">
            <h1>Exercícios para chegar ao Cálculo entendendo o caminho.</h1>
            <p className="hero-text">
              Pratique Matemática Básica, Pré-Cálculo e Cálculo 1 com dicas, resolução passo a passo e a fonte de cada questão.
            </p>
            <div className="hero-actions">
              <button className="primary-button hero-button" onClick={() => selectModule("todos")} type="button">
                Ver banco de exercícios
              </button>
              <span className="question-total">{totalQuestions} questões no acervo</span>
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
                <DeferredMath>
                  {featuredQuestion?.statement_md ?? "Calcule \\(\\lim_{x \\to 2} \\frac{2x^2-3x-2}{x-2}\\)."}
                </DeferredMath>
              </h2>
              <button
                disabled={!featuredQuestion}
                onClick={() => featuredQuestion && openQuestion(featuredQuestion, false)}
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
              <h2 id="module-title">Comece pelo conteúdo que precisa revisar.</h2>
            </div>
            <p>Você pode mudar de módulo quando quiser. Seu progresso fica salvo neste dispositivo.</p>
          </div>

          <ol className="module-list">
            {(Object.entries(moduleMeta) as [ModuleSlug, (typeof moduleMeta)[ModuleSlug]][]).map(
              ([slug, meta]) => (
                <li key={slug}>
                  <button
                    className={`module-row ${meta.className}`}
                    onClick={() => selectModule(slug)}
                    type="button"
                  >
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
              <h1 id="exercise-title">Escolha o que praticar agora.</h1>
            </div>
          </div>

          <div className="filters" aria-label="Filtros de exercícios">
            <label className="search-field">
              <span className="sr-only">Buscar exercício</span>
              <input
                type="search"
                maxLength={120}
                autoComplete="off"
                placeholder="Buscar por assunto ou código..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <SelectMenu label="Módulo" value={moduleFilter} options={[{ value: "todos", label: "Todos os módulos" }, ...Object.entries(moduleMeta).map(([value, meta]) => ({ value, label: meta.short }))]} onChange={(value) => { setModuleFilter(value as "todos" | ModuleSlug); setTopicFilter("todos"); }} />
            <SelectMenu label="Tópico" value={topicFilter} options={[{ value: "todos", label: "Todos os tópicos" }, ...topics.map((topic) => ({ value: topic.slug, label: topic.title, description: `${topic.module_title}${topic.parent_slug ? " · Funções" : ""} · ${topic.question_count === 0 ? "sem questões" : `${topic.question_count} ${topic.question_count === 1 ? "questão" : "questões"}`}` }))]} onChange={setTopicFilter} />
            <SelectMenu label="Dificuldade" value={difficultyFilter} options={[{ value: "todos", label: "Todas as dificuldades" }, ...difficultyLabels.slice(1).map((label, index) => ({ value: String(index + 1), label }))]} onChange={setDifficultyFilter} />
            <SelectMenu label="Progresso" value={progressFilter} options={[{ value: "todos", label: "Todos os estados" }, { value: "concluidos", label: "Concluídos" }, { value: "pendentes", label: "Pendentes" }]} onChange={(value) => setProgressFilter(value as ProgressFilter)} />
          </div>

          {loading && <div className="state-message">Carregando os exercícios...</div>}
          {error && <div className="state-message state-error"><p>{error}</p><button type="button" className="secondary-button" onClick={() => setBank(null)}>Tentar novamente</button></div>}
          {!loading && !error && (
            <>
              <div className="results-line" id="bank-results" tabIndex={-1}>
                <span><strong>{filteredQuestions.length}</strong> exercício{filteredQuestions.length === 1 ? "" : "s"} encontrado{filteredQuestions.length === 1 ? "" : "s"}</span>
                <span className="results-progress" title="Concluídos dentro da busca, módulo, tópico e dificuldade selecionados"><strong>{matchingCompleted}</strong> concluído{matchingCompleted === 1 ? "" : "s"}</span>
                {filteredQuestions.length > 0 && <span className="page-range">Exibindo {pageOffset + 1}–{Math.min(pageOffset + questionsPerPage, filteredQuestions.length)}</span>}
              </div>
              <div className="question-grid">
                {visibleQuestions.map((question) => {
                  const meta = moduleMeta[question.module_slug];
                  const completed = completedIds.has(question.id);
                  return (
                    <article className={`question-card ${meta.className}`} key={question.id}>
                      <div className="question-card-top">
                        <span className="question-code">{question.id}</span>
                        {completed && <span className="completed-badge">Concluído</span>}
                      </div>
                      <p className="question-topic">{question.topic_title}</p>
                      <h3><DeferredMath>{question.statement_md}</DeferredMath></h3>
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
              {totalPages > 1 && <nav className="bank-pagination" aria-label="Páginas de exercícios"><button className="secondary-button" type="button" disabled={currentPage === 1} onClick={() => changeBankPage(currentPage - 1)}>Anterior</button><span aria-live="polite">Página {currentPage} de {totalPages}</span><button className="secondary-button" type="button" disabled={currentPage === totalPages} onClick={() => changeBankPage(currentPage + 1)}>Próxima</button></nav>}
            </>
          )}
        </section>
        )}

        {isHome && (
        <section className="about-strip" id="sobre">
          <div>
            <h2>Apoio para quem está chegando às Exatas.</h2>
            <p>
              Um projeto de extensão universitária com exercícios organizados, resoluções claras e acesso gratuito.
            </p>
          </div>
          <p className="about-facts">O acervo reúne 3 módulos e {totalQuestions} exercícios. Todo o conteúdo pode ser acessado sem cadastro.</p>
        </section>
        )}
      </main>

      <footer>
        <div className="brand" aria-label="∫NTEGRA"><span aria-hidden="true">∫</span>NTEGRA</div>
        <p>Plataforma gratuita de apoio ao ensino de Cálculo.</p>
        <nav className="footer-links" aria-label="Institucional">
          <a href="/">Início</a>
          <a href="/privacidade">Política de privacidade</a>
          <a href="/termos">Termos de uso</a>
        </nav>
      </footer>
      <StorageNotice />
    </div>
  );
}

function SkipLink() {
  return <a className="skip-link" href="#conteudo" onClick={(event) => {
    event.preventDefault();
    document.getElementById("conteudo")?.focus();
  }}>Pular para o conteúdo</a>;
}

function Header({ isHome = false, isQuestionBank = false, isLaboratory = false, isConceptMap = false, isStudy = false }: { isHome?: boolean; isQuestionBank?: boolean; isLaboratory?: boolean; isConceptMap?: boolean; isStudy?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => onRouteChange(() => setMenuOpen(false)), []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      document.getElementById("menu-toggle")?.focus();
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  return (
    <header className={`site-header${menuOpen ? " menu-open" : ""}`}>
      <a className="brand" href="/" aria-label="∫NTEGRA — Início">
        <span aria-hidden="true">∫</span>NTEGRA
      </a>
      <button id="menu-toggle" className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">{menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        <span>{menuOpen ? "Fechar" : "Menu"}</span>
      </button>
      <nav id="main-navigation" aria-label="Navegação principal">
        <a href="/" aria-current={isHome ? "page" : undefined}><Icon name="home" size={18} />Início</a>
        <a href="/estudar" onMouseEnter={() => { void loadStudy(); }} onFocus={() => { void loadStudy(); }} aria-current={isStudy ? "page" : undefined}><Icon name="study" size={18} />Estudar</a>
        <a href="/questoes" aria-current={isQuestionBank ? "page" : undefined}><Icon name="book" size={18} />Banco de questões</a>
        <a href="/laboratorio" onMouseEnter={() => { void loadLaboratory(); }} onFocus={() => { void loadLaboratory(); }} aria-current={isLaboratory ? "page" : undefined}><Icon name="laboratory" size={18} />Laboratório</a>
        <a href="/mapa" onMouseEnter={() => { void loadConceptMap(); }} onFocus={() => { void loadConceptMap(); }} aria-current={isConceptMap ? "page" : undefined}><Icon name="concepts" size={18} />Mapa de conceitos</a>
        <a href="/sobre"><Icon name="info" size={18} />Sobre</a>
      </nav>
    </header>
  );
}

export default App;
