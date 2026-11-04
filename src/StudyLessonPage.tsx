import type { Topic } from "./types";
import type { StudyExample, StudyLesson } from "./studyBasics";
import type { StudyModuleSlug } from "./studyNavigation";
import { studyModuleUrl, studyTopicUrl } from "./studyNavigation";
import LessonVisual, { StudyText } from "./StudyVisual";
import Icon from "./Icon";

const partId = (index: number) => `aula-parte-${index + 1}`;

function jumpTo(id: string) {
  const heading = document.getElementById(id);
  heading?.focus({ preventScroll: true });
  heading?.scrollIntoView({ block: "start" });
}

export type StudyLessonRouteProps = {
  topic: Topic;
  moduleSlug: StudyModuleSlug;
  previous?: Topic;
  next?: Topic;
};

function WorkedExample({ example }: { example: StudyExample }) {
  return <div className="study-example">
    <p className="section-kicker">Exemplo resolvido</p>
    <h3>{example.title}</h3>
    <p><StudyText>{example.prompt}</StudyText></p>
    <ol>{example.steps.map((step) => <li key={step}><StudyText>{step}</StudyText></li>)}</ol>
  </div>;
}

export default function StudyLessonPage({ topic, moduleSlug, previous, next, lesson }: StudyLessonRouteProps & { lesson: StudyLesson }) {
  const pageClass = `study-page study-${moduleSlug}`;
  return <article className={pageClass} key={topic.slug} aria-labelledby="study-title">
    <nav className="study-breadcrumb" aria-label="Localização na área de estudo">
      <a href={studyModuleUrl(moduleSlug)}><Icon name="previous" size={16} /> Todas as aulas</a>
      <span>{topic.module_title} · Aula {topic.position}</span>
    </nav>
    <header className="study-lesson-hero">
      <div>
        <p className="section-kicker">Aula {String(topic.position).padStart(2, "0")}</p>
        <h1 id="study-title">{topic.title}</h1>
        <p><StudyText>{lesson.intro}</StudyText></p>
      </div>
      <LessonVisual visual={lesson.visual} />
    </header>
    <div className="study-lesson-layout">
      <aside className="study-side" aria-label="Índice e links da aula">
        <nav className="study-panel study-index" aria-labelledby="study-index">
          <h2 id="study-index">Nesta aula</h2>
          <ol>{lesson.sections.map(({ title }, i) => <li key={title}>
            <button type="button" onClick={() => jumpTo(partId(i))}><span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{title}</button>
          </li>)}</ol>
          <button type="button" className="study-index-check" onClick={() => jumpTo("study-check-title")}>Agora é sua vez</button>
        </nav>
        <a className="primary-button study-practice" href={`#/questoes?topico=${encodeURIComponent(topic.slug)}`}><Icon name="book" size={18} /> Ver exercícios do tópico</a>
        <a className="study-map-link" href={`#/mapa?topico=${encodeURIComponent(topic.slug)}`}><Icon name="concepts" size={18} /> Ver no mapa de conceitos</a>
      </aside>
      <div className="study-main">
        {lesson.sections.map(({ title, paragraphs, example, extraExample, visual }, i) => <section className="study-panel study-part" key={title} aria-labelledby={partId(i)}>
          <p className="section-kicker">Parte {String(i + 1).padStart(2, "0")}</p>
          <h2 id={partId(i)} tabIndex={-1}>{title}</h2>
          {paragraphs.map((paragraph) => <p key={paragraph}><StudyText>{paragraph}</StudyText></p>)}
          <WorkedExample example={example} />
          {visual && <LessonVisual visual={visual} />}
          {extraExample && <WorkedExample example={extraExample} />}
        </section>)}
        <section className="study-panel study-pitfall">
          <h2><Icon name="hint" size={20} /> Erro comum</h2>
          <p><StudyText>{lesson.pitfall}</StudyText></p>
        </section>
        <section className="study-panel study-check" aria-labelledby="study-check-title">
          <h2 id="study-check-title" tabIndex={-1}>Agora é sua vez</h2>
          <ol>{lesson.checks.map(({ prompt, solution }) => <li key={prompt}>
            <p><StudyText>{prompt}</StudyText></p>
            <details>
              <summary>Conferir resolução</summary>
              <p><StudyText>{solution}</StudyText></p>
            </details>
          </li>)}</ol>
        </section>
        <a className="primary-button study-practice study-practice-end" href={`#/questoes?topico=${encodeURIComponent(topic.slug)}`}><Icon name="book" size={18} /> Praticar no banco de questões</a>
      </div>
    </div>
    <nav className="study-lesson-nav" aria-label="Navegação entre aulas">
      {previous && <a href={studyTopicUrl(previous.slug)}><span><Icon name="previous" size={16} /> Aula anterior</span><strong>{previous.title}</strong></a>}
      {next && <a href={studyTopicUrl(next.slug)}><span>Próxima aula <Icon name="next" size={16} /></span><strong>{next.title}</strong></a>}
    </nav>
  </article>;
}
