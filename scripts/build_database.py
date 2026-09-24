from __future__ import annotations

import json
import os
import re
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SCHEMA_PATH = ROOT / "database" / "schema.sql"
SEED_PATH = ROOT / "database" / "seeds" / "pilot_questions.json"
DATABASE_PATH = ROOT / "database" / "questions.sqlite"
TEMP_DATABASE_PATH = ROOT / "database" / "questions.tmp.sqlite"
EXPORT_PATH = ROOT / "public" / "data" / "questions.json"
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def validate_seed(seed: dict) -> None:
    require(seed.get("version") == 1, "Versão do seed não suportada")

    modules = seed.get("modules", [])
    topics = seed.get("topics", [])
    sources = seed.get("sources", [])
    questions = seed.get("questions", [])

    require(len(modules) == 3, "O piloto deve conter três módulos")
    require(len(questions) >= 20, "O piloto deve conter pelo menos 20 questões")

    def unique(items: list[dict], field: str, label: str) -> set[str]:
        values = [item[field] for item in items]
        require(len(values) == len(set(values)), f"{label}: valores duplicados em {field}")
        return set(values)

    module_ids = unique(modules, "id", "Módulos")
    topic_ids = unique(topics, "id", "Tópicos")
    source_ids = unique(sources, "id", "Fontes")
    unique(questions, "id", "Questões")
    unique(questions, "slug", "Questões")

    for collection_name, collection in (
        ("módulo", modules),
        ("tópico", topics),
        ("questão", questions),
    ):
        for item in collection:
            require(
                SLUG_PATTERN.fullmatch(item["slug"]) is not None,
                f"Slug inválido em {collection_name}: {item['slug']}",
            )

    for topic in topics:
        require(topic["module_id"] in module_ids, f"Módulo inexistente: {topic['module_id']}")

    normalized_statements: set[str] = set()
    for question in questions:
        require(question["topic_id"] in topic_ids, f"Tópico inexistente: {question['topic_id']}")
        require(question["source_id"] in source_ids, f"Fonte inexistente: {question['source_id']}")
        require(1 <= question["difficulty"] <= 5, f"Dificuldade inválida: {question['id']}")
        require(question["statement_md"].strip(), f"Enunciado vazio: {question['id']}")
        require(question["solution_md"].strip(), f"Solução vazia: {question['id']}")
        require(question["source_locator"].strip(), f"Localização da fonte vazia: {question['id']}")
        require(question["adaptation_note"].strip(), f"Nota de adaptação vazia: {question['id']}")
        require(isinstance(question["answer"], dict), f"Resposta inválida: {question['id']}")

        normalized = re.sub(r"\s+", " ", question["statement_md"].strip().lower())
        require(normalized not in normalized_statements, f"Enunciado duplicado: {question['id']}")
        normalized_statements.add(normalized)

        choices = question.get("choices", [])
        if question["question_type"] == "multiple_choice":
            require(len(choices) >= 2, f"Poucas alternativas: {question['id']}")
            require(
                sum(1 for choice in choices if choice["is_correct"]) == 1,
                f"Questão deve ter uma alternativa correta: {question['id']}",
            )
        else:
            require(not choices, f"Alternativas inesperadas: {question['id']}")


def insert_seed(connection: sqlite3.Connection, seed: dict) -> None:
    connection.executemany(
        "INSERT INTO modules (id, slug, title, description, position) VALUES (?, ?, ?, ?, ?)",
        [
            (m["id"], m["slug"], m["title"], m["description"], m["position"])
            for m in seed["modules"]
        ],
    )
    connection.executemany(
        """
        INSERT INTO topics (id, module_id, slug, title, description, position)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        [
            (t["id"], t["module_id"], t["slug"], t["title"], t["description"], t["position"])
            for t in seed["topics"]
        ],
    )
    connection.executemany(
        """
        INSERT INTO sources (
            id, title, authors, publisher, edition, year, url,
            license_code, license_url, accessed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        [
            (
                s["id"], s["title"], s["authors"], s["publisher"], s.get("edition"),
                s.get("year"), s["url"], s["license_code"], s["license_url"], s["accessed_at"],
            )
            for s in seed["sources"]
        ],
    )

    for question in seed["questions"]:
        connection.execute(
            """
            INSERT INTO questions (
                id, slug, topic_id, source_id, source_locator, statement_md,
                question_type, difficulty, answer_json, hint_md, solution_md,
                adaptation_note, status, estimated_minutes, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                question["id"], question["slug"], question["topic_id"], question["source_id"],
                question["source_locator"], question["statement_md"], question["question_type"],
                question["difficulty"], json.dumps(question["answer"], ensure_ascii=False),
                question.get("hint_md"), question["solution_md"], question["adaptation_note"],
                question["status"], question["estimated_minutes"], question["created_at"],
                question["updated_at"],
            ),
        )
        for position, choice in enumerate(question.get("choices", []), start=1):
            connection.execute(
                """
                INSERT INTO choices (
                    id, question_id, label, content_md, is_correct, feedback_md, position
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    f"{question['id']}-choice-{position}", question["id"], choice["label"],
                    choice["content_md"], int(choice["is_correct"]), choice.get("feedback_md"), position,
                ),
            )


def validate_database(connection: sqlite3.Connection) -> dict[str, int]:
    integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
    require(integrity == "ok", f"Falha de integridade SQLite: {integrity}")

    counts = {
        table: connection.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
        for table in ("modules", "topics", "sources", "questions", "choices")
    }
    missing = connection.execute(
        """
        SELECT COUNT(*)
        FROM questions q
        LEFT JOIN topics t ON t.id = q.topic_id
        LEFT JOIN sources s ON s.id = q.source_id
        WHERE t.id IS NULL OR s.id IS NULL
        """
    ).fetchone()[0]
    require(missing == 0, "Há questões sem tópico ou fonte")
    return counts


def export_public_data(connection: sqlite3.Connection) -> None:
    rows = connection.execute(
        """
        SELECT * FROM published_questions
        ORDER BY module_slug, topic_slug, difficulty, id
        """
    ).fetchall()

    exported = []
    for row in rows:
        item = dict(row)
        item["answer"] = json.loads(item.pop("answer_json"))
        choices = connection.execute(
            """
            SELECT label, content_md, is_correct, feedback_md
            FROM choices
            WHERE question_id = ?
            ORDER BY position
            """,
            (item["id"],),
        ).fetchall()
        item["choices"] = [dict(choice) for choice in choices]
        exported.append(item)

    EXPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    EXPORT_PATH.write_text(
        json.dumps({"version": 1, "questions": exported}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    seed = json.loads(SEED_PATH.read_text(encoding="utf-8"))
    validate_seed(seed)

    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    if TEMP_DATABASE_PATH.exists():
        TEMP_DATABASE_PATH.unlink()

    connection = sqlite3.connect(TEMP_DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    try:
        connection.executescript(SCHEMA_PATH.read_text(encoding="utf-8"))
        with connection:
            insert_seed(connection, seed)
        counts = validate_database(connection)
        export_public_data(connection)
    finally:
        connection.close()

    os.replace(TEMP_DATABASE_PATH, DATABASE_PATH)
    print("Banco criado e validado:")
    for table, count in counts.items():
        print(f"  {table}: {count}")
    print(f"SQLite: {DATABASE_PATH}")
    print(f"JSON público: {EXPORT_PATH}")


if __name__ == "__main__":
    main()

