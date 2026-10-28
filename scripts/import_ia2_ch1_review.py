"""Importa a seção completa já curada. Requer Python 3.12+; não acessa a rede."""
from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path

from build_database import validate_seed
from ia2_ch1_review_content import QUESTIONS, REUSED, SOURCE_ID

ROOT = Path(__file__).resolve().parents[1]
SEED_PATH = ROOT / "database/seeds/pilot_questions.json"
DATE = "2026-10-25"
NEW_TOPICS = [
    ("topic-divisibility", "divisibilidade-multiplos-e-divisores", "Divisibilidade, múltiplos e divisores", "Critérios de divisibilidade, fatoração em primos, divisores, MDC e MMC."),
    ("topic-fractions-decimals", "fracoes-e-numeros-decimais", "Frações e números decimais", "Frações equivalentes, simplificação, operações, dízimas e arredondamento decimal."),
    ("topic-absolute-value", "modulo-e-valor-absoluto", "Módulo e valor absoluto", "Distância até zero, comparação e operações com valores absolutos."),
    ("topic-real-properties", "propriedades-dos-numeros-reais", "Propriedades dos números reais", "Propriedades comutativa e associativa, elementos neutros, opostos, inversos e divisão por zero."),
]
BASIC_ORDER = ["topic-number-sets", "topic-arithmetic", "topic-divisibility", "topic-fractions-decimals", "topic-intervals", "topic-absolute-value", "topic-ratio-percent", "topic-powers-roots", "topic-real-properties", "topic-expressions", "topic-identities", "topic-factorization", "topic-equations", "topic-linear-systems"]


def import_batch(seed: dict) -> dict:
    result = deepcopy(seed)
    numbers = [question["original_number"] for question in QUESTIONS]
    assert len(numbers) == len(set(numbers)) == 78, "Lote com duplicações ou contagem inesperada"
    assert set(numbers).isdisjoint(REUSED), "O lote não deve duplicar os três itens antigos"
    assert set(numbers) | set(REUSED) == set(range(385, 466)), "Cobertura incompleta dos exercícios 385–465"
    by_id = {question["id"]: question for question in result["questions"]}
    for number, question_id in REUSED.items():
        question = by_id[question_id]
        assert question["source_id"] == SOURCE_ID
        assert question["source_locator"].endswith(f"exercício {number}")
    source = next(source for source in result["sources"] if source["id"] == SOURCE_ID)
    assert source["license_code"] == "CC BY-NC-SA 4.0"
    source["accessed_at"] = DATE
    known_topics = {topic["id"] for topic in result["topics"]}
    for topic_id, slug, title, description in NEW_TOPICS:
        if topic_id not in known_topics:
            result["topics"].append(dict(id=topic_id, module_id="mod-basic", slug=slug, title=title, description=description, position=BASIC_ORDER.index(topic_id)+1))
    for topic in result["topics"]:
        if topic["module_id"] == "mod-basic":
            topic["position"] = BASIC_ORDER.index(topic["id"])+1
    by_id["MB-002"]["topic_id"] = "topic-divisibility"
    by_id["MB-002"]["updated_at"] = DATE
    module_order = {module["id"]: module["position"] for module in result["modules"]}
    result["topics"].sort(key=lambda topic: (module_order[topic["module_id"]], topic["position"]))
    for offset, editorial in enumerate(QUESTIONS, 9):
        question_id = f"MB-{offset:03d}"
        number = editorial["original_number"]
        question = {key: value for key, value in editorial.items() if key != "original_number"}
        question.update(id=question_id, slug=f"openstax-ia2-cap1-revisao-{number}", source_id=SOURCE_ID,
                        source_locator=f"Capítulo 1, Review Exercises, exercício {number}",
                        question_type="numeric" if isinstance(question["answer"].get("value"), (int, float)) else "short_text",
                        status="published", created_at=DATE, updated_at=DATE)
        if question_id in by_id:
            if by_id[question_id] != question:
                raise ValueError(f"ID já ocupado ou conteúdo alterado: {question_id}; não será sobrescrito")
        else:
            result["questions"].append(question)
    validate_seed(result)
    return result


if __name__ == "__main__":
    from question_catalog import load_catalog, save_catalog
    seed = load_catalog()
    updated = import_batch(seed)
    active, archived = save_catalog(updated)
    print(f"Catálogo preservado: {len(updated['questions'])}. Ativas: {active}. Arquivadas: {archived}.")
