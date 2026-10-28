"""Publica somente a seleção revisada que cabe nas vagas. Não escreve no arquivo."""
from pathlib import Path
from collections import Counter
from copy import deepcopy
import hashlib
import json
from build_database import validate_seed,validate_publication_limits
from question_catalog import ARCHIVE_PATH,SEED_PATH

ROOT=Path(__file__).resolve().parents[1]
SELECTED_PATH=ROOT/"database/seeds/ia2_book_selected.json"

def import_selection(seed,selection):
    result=deepcopy(seed)
    sources={s["id"]:s for s in result["sources"]}
    for source in selection["sources"]:
        if source["id"] not in sources:result["sources"].append(source)
        elif sources[source["id"]]!=source:raise ValueError("Fonte existente divergente")
    by_id={q["id"]:q for q in result["questions"]}
    counts=Counter((q["topic_id"],q["difficulty"]) for q in result["questions"])
    for editorial in selection["questions"]:
        question={k:v for k,v in editorial.items() if k not in ("page","source_anchor","verification")}
        if question["id"] in by_id:
            if by_id[question["id"]]!=question:raise ValueError("Questão existente divergente: "+question["id"])
            continue
        key=question["topic_id"],question["difficulty"]
        if counts[key]>=15:raise ValueError("A seleção não cabe no limite: "+str(key))
        result["questions"].append(question);by_id[question["id"]]=question;counts[key]+=1
    validate_seed(result)
    validate_publication_limits(result)
    return result

if __name__=="__main__":
    selection=json.loads(SELECTED_PATH.read_text(encoding="utf-8"))
    archive_hash=hashlib.sha256(ARCHIVE_PATH.read_bytes()).hexdigest()
    if archive_hash!=selection["archive_sha256"]:raise ValueError("O arquivo de excedentes mudou desde a curadoria")
    seed=json.loads(SEED_PATH.read_text(encoding="utf-8"))
    updated=import_selection(seed,selection)
    temporary=SEED_PATH.with_suffix(".tmp.json")
    temporary.write_text(json.dumps(updated,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    temporary.replace(SEED_PATH)
    assert hashlib.sha256(ARCHIVE_PATH.read_bytes()).hexdigest()==archive_hash
    print("Novas:",len(updated["questions"])-len(seed["questions"]),"Ativas:",len(updated["questions"]),"Arquivo de excedentes intacto.")
