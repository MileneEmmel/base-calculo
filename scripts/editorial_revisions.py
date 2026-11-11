"""Revisões editoriais aplicadas por cima das questões geradas pelos importadores.

Os importadores do capítulo 1 recriam cada questão a partir do conteúdo curado em Python e
comparam o resultado com o seed. Correções feitas depois da curadoria ficam em
database/seeds/editorial_revisions.json e são aplicadas aqui, mantendo a importação idempotente.
"""
import json
from pathlib import Path

PATH = Path(__file__).resolve().parents[1] / "database/seeds/editorial_revisions.json"


def load_revisions() -> dict:
    if not PATH.exists():
        return {}
    return json.loads(PATH.read_text(encoding="utf8"))["questoes"]


def apply_revision(question: dict, revisions: dict) -> dict:
    question.update(revisions.get(question["id"], {}))
    return question
