import { lazy, Suspense } from "react";
import type { Topic } from "./types";
import type { StudyLesson } from "./studyBasics";
import type { StudyLessonRouteProps } from "./StudyLessonPage";
import { studyModules, studyModuleUrl, studyTopicUrl } from "./studyNavigation";
import Icon from "./Icon";
import "./study.css";

function loadLessonRoute(loadContent: () => Promise<(slug: string) => StudyLesson | undefined>) {
  return lazy(async () => {
    const [{ default: StudyLessonPage }, getLesson] = await Promise.all([import("./StudyLessonPage"), loadContent()]);
    return {
      default: function LessonRoute(props: StudyLessonRouteProps) {
        const lesson = getLesson(props.topic.slug);
        return lesson
          ? <StudyLessonPage {...props} lesson={lesson} />
          : <p className="state-message">A aula deste tópico ainda não está disponível.</p>;
      },
    };
  });
}

const moduleRoutes = {
  "matematica-basica": loadLessonRoute(() => import("./studyBasics").then(({ basicLessons }) => (slug) => basicLessons[slug])),
  "pre-calculo": loadLessonRoute(() => import("./studyPrecalculus").then(({ precalculusLessons }) => (slug) => precalculusLessons[slug])),
};

function loadCalculusLesson(slug: string, importLesson: () => Promise<{ default: StudyLesson }>) {
  return loadLessonRoute(() => Promise.all([importLesson(), import("./studyDeepCalculus"), import("./studyDeepening")])
    .then(([{ default: lesson }, { deepening }, { withDeepening }]) => { const full = withDeepening(lesson, deepening[slug]); return () => full; }));
}

const calculusRoutes: Partial<Record<string, (typeof moduleRoutes)["pre-calculo"]>> = {
  limites: loadCalculusLesson("limites", () => import("./studyCalcLimits")),
  continuidade: loadCalculusLesson("continuidade", () => import("./studyCalcContinuity")),
  derivadas: loadCalculusLesson("derivadas", () => import("./studyCalcDerivatives")),
  "aplicacoes-da-derivada": loadCalculusLesson("aplicacoes-da-derivada", () => import("./studyCalcDerivativeApplications")),
  integrais: loadCalculusLesson("integrais", () => import("./studyCalcIntegrals")),
  "tecnicas-de-integracao": loadCalculusLesson("tecnicas-de-integracao", () => import("./studyCalcIntegrationTechniques")),
  "aplicacoes-da-integral": loadCalculusLesson("aplicacoes-da-integral", () => import("./studyCalcIntegralApplications")),
};

export default function StudyPage({ topics, topicSlug, moduleSlug }: { topics: Topic[]; topicSlug: string | null; moduleSlug: string | null }) {
  const topicModule = topics.find((item) => item.slug === topicSlug)?.module_slug;
  const activeModule = studyModules.find(({ slug }) => slug === (topicModule ?? moduleSlug)) ?? studyModules[0];
  const lessons = topics.filter((topic) => topic.module_slug === activeModule.slug).sort((a, b) => a.position - b.position);
  const index = lessons.findIndex((topic) => topic.slug === topicSlug);
  const topic = lessons[index];

  const LessonRoute = activeModule.slug === "calculo-1" ? calculusRoutes[topicSlug ?? ""] : moduleRoutes[activeModule.slug];
  if (topic && LessonRoute) {
    return <Suspense fallback={<p className="state-message">Abrindo a aula...</p>}>
      <LessonRoute key={topic.slug} topic={topic} moduleSlug={activeModule.slug} previous={lessons[index - 1]} next={lessons[index + 1]} />
    </Suspense>;
  }

  const pageClass = `study-page study-${activeModule.slug}`;
  return <section className={pageClass} aria-labelledby="study-title">
    <nav className="study-module-nav" aria-label="Módulos de estudo">
      {studyModules.map(({ slug, title }) => <a key={slug} href={studyModuleUrl(slug)} aria-current={slug === activeModule.slug ? "page" : undefined}>{title}</a>)}
    </nav>
    <header className="study-catalog-hero">
      <div>
        <p className="section-kicker">Guia de estudo</p>
        <h1 id="study-title">{activeModule.title}</h1>
        <p>{activeModule.description}</p>
      </div>
      <div className="study-hero-count" aria-hidden="true"><Icon name="study" size={30} /><strong>{lessons.length}</strong><span>aulas disponíveis</span></div>
    </header>
    {topicSlug && <p className="study-unavailable">A aula deste tópico ainda não está disponível. Explore as aulas publicadas abaixo.</p>}
    <section aria-labelledby="study-catalog-heading">
      <div className="study-catalog-heading"><h2 id="study-catalog-heading">Escolha um tópico</h2><a href="/mapa"><Icon name="concepts" size={17} /> Ver mapa de conceitos</a></div>
      <ol className="study-catalog">
        {lessons.map((item) => <li key={item.slug}>
          <a href={studyTopicUrl(item.slug)}>
            <span className="study-card-number">{String(item.position).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="study-card-action">Abrir aula <Icon name="next" size={17} /></span>
          </a>
        </li>)}
      </ol>
    </section>
  </section>;
}
