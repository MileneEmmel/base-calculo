"""Completa as listas 1–495 e os 112 Try It, preservando o lote de revisão."""
import json
import re
from copy import deepcopy
from pathlib import Path
from build_database import validate_seed
from ia2_ch1_full_content import questions, PAGES
from ia2_ch1_try_it import try_questions

ROOT=Path(__file__).resolve().parents[1]
SEED_PATH=ROOT/"database/seeds/pilot_questions.json"
DATE="2026-10-25"
PREFIX="src-ia2-ch1-"

def source_id(page): return PREFIX + ("test" if page=="1-practice-test" else "s"+page[2])

def import_batch(seed):
    result=deepcopy(seed)
    by_id={q["id"]:q for q in result["questions"]}
    source_template=next(s for s in result["sources"] if s["id"]=="src-intermediate-algebra-ch1")
    source_ids={s["id"] for s in result["sources"]}
    for page,title,_,_ in PAGES:
        identity=source_id(page)
        if identity not in source_ids:
            source=dict(source_template,id=identity,title="Intermediate Algebra 2e, "+title,
                url="https://openstax.org/books/intermediate-algebra-2e/pages/"+page)
            result["sources"].append(source)
    normalized={re.sub(r"\s+"," ",q["statement_md"].strip().lower()):q["id"] for q in seed["questions"] if not q["id"].startswith("IA2-")}
    for editorial in [*questions(), *try_questions()]:
        number=editorial["original_number"]
        # IDs próprios mantêm número original visível e não ocupam IDs do piloto.
        is_try=editorial.get("is_try_it",False)
        identity=f"IA2-1-T{int(number.split('.')[1]):03d}" if is_try else f"IA2-1-{number:03d}"
        question={key:value for key,value in editorial.items() if key not in ("original_number","page","anchor","page_title","is_try_it")}
        locator=f"Try It {number}" if is_try else f"exercício {number}"
        slug=f"ia2-capitulo-1-try-it-{number.replace('.','-')}" if is_try else f"ia2-capitulo-1-exercicio-{number}"
        question.update(id=identity,slug=slug,source_id=source_id(editorial["page"]),
            source_locator=f'Capítulo 1, {editorial["page_title"]}, {locator}',
            question_type="numeric" if isinstance(question["answer"].get("value"),(int,float)) else "short_text",
            status="published",created_at=DATE,updated_at=DATE)
        normalized_text=re.sub(r"\s+"," ",question["statement_md"].strip().lower())
        if normalized_text in normalized:
            question["intentional_repeat_of"]=normalized[normalized_text]
            question["adaptation_note"]+=" Enunciado repetido intencionalmente em outra seção da obra; a numeração original foi preservada."
        else: normalized[normalized_text]=identity
        if identity in by_id:
            if by_id[identity]!=question: raise ValueError("Conteúdo existente divergente: "+identity)
        else: result["questions"].append(question)
    validate_seed(result)
    return result

if __name__=="__main__":
    from question_catalog import load_catalog, save_catalog
    seed=load_catalog()
    updated=import_batch(seed)
    active, archived=save_catalog(updated)
    print(f"Catálogo preservado: {len(updated['questions'])}. Ativas: {active}. Arquivadas: {archived}.")
