"""Catálogo editorial completo e seleção publicada por tópico/dificuldade."""
import json
from collections import Counter
from copy import deepcopy
from pathlib import Path
from build_database import validate_seed

ROOT = Path(__file__).resolve().parents[1]
SEED_PATH = ROOT / "database/seeds/pilot_questions.json"
ARCHIVE_PATH = ROOT / "database/archives/excess_questions.json"
LIMIT = 15


def load_catalog(seed_path=SEED_PATH, archive_path=ARCHIVE_PATH):
    seed = json.loads(seed_path.read_text(encoding="utf-8"))
    if not archive_path.exists():
        return seed
    archive = json.loads(archive_path.read_text(encoding="utf-8"))
    active = {q["id"]: q for q in seed["questions"]}
    archived = {q["id"]: q for q in archive["questions"]}
    if active.keys() & archived.keys():
        raise ValueError("Questão presente simultaneamente no banco e no arquivo")
    all_questions = active | archived
    order = archive["original_order"]
    if len(order) != len(set(order)) or not set(order).issubset(all_questions):
        raise ValueError("Ordem de restauração inválida")
    seed["questions"] = [all_questions[key] for key in order]
    seed["questions"].extend(q for key, q in all_questions.items() if key not in set(order))
    return seed


def split_catalog(catalog):
    """Mantém a ordem editorial existente, sem modificar questões ou dificuldades."""
    active = deepcopy(catalog)
    counts = Counter()
    kept, excess = [], []
    for question in active["questions"]:
        key = question["topic_id"], question["difficulty"]
        if counts[key] < LIMIT:
            kept.append(question)
            counts[key] += 1
        else:
            excess.append(question)
    archive = dict(
        version=1,
        reason="Excedentes do limite de 15 questões por tópico e dificuldade (até 60 por tópico).",
        selection="Primeiras questões na ordem editorial existente; dificuldades e IDs preservados.",
        max_per_topic_difficulty=LIMIT,
        original_order=[q["id"] for q in active["questions"]],
        modules=deepcopy(catalog["modules"]),
        topics=deepcopy(catalog["topics"]),
        sources=deepcopy(catalog["sources"]),
        questions=excess,
    )
    active["questions"] = kept
    validate_seed(active)
    return active, archive


def save_catalog(catalog, seed_path=SEED_PATH, archive_path=ARCHIVE_PATH):
    active, archive = split_catalog(catalog)
    archive_path.parent.mkdir(parents=True, exist_ok=True)
    # O arquivo de recuperação é salvo antes de retirar qualquer item do seed.
    archive_path.write_text(json.dumps(archive, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    seed_path.write_text(json.dumps(active, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    return len(active["questions"]), len(archive["questions"])


if __name__ == "__main__":
    active, archived = save_catalog(load_catalog())
    print(f"Ativas: {active}. Arquivadas: {archived}.")
