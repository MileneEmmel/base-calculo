PRAGMA foreign_keys = ON;

CREATE TABLE modules (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    position INTEGER NOT NULL CHECK (position > 0)
);

CREATE TABLE topics (
    id TEXT PRIMARY KEY,
    module_id TEXT NOT NULL REFERENCES modules(id),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    position INTEGER NOT NULL CHECK (position > 0),
    UNIQUE (module_id, position)
);

CREATE TABLE sources (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    publisher TEXT NOT NULL,
    edition TEXT,
    year INTEGER,
    url TEXT NOT NULL,
    license_code TEXT NOT NULL,
    license_url TEXT NOT NULL,
    accessed_at TEXT NOT NULL
);

CREATE TABLE questions (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    topic_id TEXT NOT NULL REFERENCES topics(id),
    source_id TEXT NOT NULL REFERENCES sources(id),
    source_locator TEXT NOT NULL,
    statement_md TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (
        question_type IN ('numeric', 'short_text', 'multiple_choice')
    ),
    difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
    answer_json TEXT NOT NULL,
    hint_md TEXT,
    solution_md TEXT NOT NULL,
    adaptation_note TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (
        status IN ('draft', 'reviewed', 'published')
    ),
    estimated_minutes INTEGER NOT NULL CHECK (estimated_minutes > 0),
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE choices (
    id TEXT PRIMARY KEY,
    question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    content_md TEXT NOT NULL,
    is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
    feedback_md TEXT,
    position INTEGER NOT NULL CHECK (position > 0),
    UNIQUE (question_id, position),
    UNIQUE (question_id, label)
);

CREATE INDEX idx_topics_module ON topics(module_id);
CREATE INDEX idx_questions_topic ON questions(topic_id);
CREATE INDEX idx_questions_source ON questions(source_id);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
CREATE INDEX idx_questions_status ON questions(status);

CREATE VIEW published_questions AS
SELECT
    q.id,
    q.slug,
    q.statement_md,
    q.question_type,
    q.difficulty,
    q.answer_json,
    q.hint_md,
    q.solution_md,
    q.estimated_minutes,
    t.slug AS topic_slug,
    t.title AS topic_title,
    m.slug AS module_slug,
    m.title AS module_title,
    s.title AS source_title,
    s.authors AS source_authors,
    s.url AS source_url,
    s.license_code,
    s.license_url,
    q.source_locator,
    q.adaptation_note
FROM questions q
JOIN topics t ON t.id = q.topic_id
JOIN modules m ON m.id = t.module_id
JOIN sources s ON s.id = q.source_id
WHERE q.status = 'published';

