"""Regressões do lote: origem, vagas, arquivo intacto e matemática independente."""
import hashlib
import json
import re
import unittest
from collections import Counter
from fractions import Fraction as F
from decimal import Decimal, localcontext, ROUND_HALF_UP
import math
from pathlib import Path
from import_ia2_book import import_selection
from ia2_exact_math import calculate
from test_ia2_ch1_full import mathml_value

ROOT=Path(__file__).resolve().parents[1]
def read(path):return json.loads((ROOT/path).read_text(encoding="utf-8"))
SEED=read("database/seeds/pilot_questions.json")
LOT=read("database/seeds/ia2_book_selected.json")
NEW={q["id"]:q for q in LOT["questions"]}
DATA=ROOT/"database/sources/ia2-book"

class WholeBookTests(unittest.TestCase):
    def test_coverage_caps_and_unchanged_archive(self):
        self.assertEqual(len(NEW),937)
        self.assertEqual(len(SEED["questions"]),1155)
        self.assertEqual({int(q["id"].split("-")[1]) for q in NEW.values()},set(range(2,13)))
        self.assertEqual(len({q["topic_id"] for q in SEED["questions"] if q["topic_id"] not in {
            "topic-limits","topic-continuity","topic-derivatives","topic-derivative-applications",
            "topic-integrals","topic-integration-techniques","topic-integral-applications","topic-trigonometry"}}),24)
        self.assertEqual(hashlib.sha256((ROOT/"database/archives/excess_questions.json").read_bytes()).hexdigest(),LOT["archive_sha256"])
        self.assertEqual(len(read("database/archives/excess_questions.json")["questions"]),410)
        counts=Counter((q["topic_id"],q["difficulty"]) for q in SEED["questions"])
        self.assertLessEqual(max(counts.values()),15)
        self.assertEqual(import_selection(SEED,LOT),SEED)

    def test_each_origin_exists_and_edited_record_matches_publication(self):
        published={q["id"]:q for q in SEED["questions"]}
        origins=set()
        for q in NEW.values():
            page=json.loads((DATA/(q["page"]+".json")).read_text(encoding="utf-8"))
            rows=[*page["questions"],*page.get("practice",[])]
            raw=next(row for row in rows if row["anchor"]==q["source_anchor"])
            token=(q["page"].split("-")[0],str(raw["number"]))
            self.assertNotIn(token,origins);origins.add(token)
            self.assertNotIn("writing exercise"," ".join(raw["context"]).lower())
            expected={k:v for k,v in q.items() if k not in ("page","source_anchor","verification")}
            self.assertEqual(published[q["id"]],expected)
        audit=json.loads((DATA/"public-key-audit.json").read_text(encoding="utf-8"))
        self.assertGreaterEqual(audit["comparisons"],250)
        self.assertEqual(audit["mismatches"],[])

    def test_identities_against_original_presentation_mathml(self):
        checked=0
        for q in NEW.values():
            if q["verification"]["kind"]!="identity":continue
            page=json.loads((DATA/(q["page"]+".json")).read_text(encoding="utf-8"))
            raw=next(r for r in [*page["questions"],*page.get("practice",[])] if r["anchor"]==q["source_anchor"])
            outputs=q["verification"]["output"]
            self.assertEqual(len(raw["mathml"]),len(outputs))
            for sample in (F(3,2),F(7,3)):
                variables={name:sample+F(index,7) for index,name in enumerate("abcdefghijklmnopqrstuvwxyz")}
                for original,result in zip(raw["mathml"],outputs):
                    try:
                        expected=mathml_value(original,variables)
                        actual=calculate(result,variables)[0].scalar()
                    except (ValueError,KeyError,IndexError,SyntaxError,ZeroDivisionError,TypeError):continue
                    with self.subTest(id=q["id"],sample=sample):self.assertEqual(actual,expected)
                    checked+=1
        self.assertGreater(checked,300)

    def test_source_argument_and_domain_regressions(self):
        q=NEW["IA2B-5-369"]
        self.assertIn("-2",q["statement_md"].replace(" ",""))
        self.assertEqual(q["verification"]["values"][-1],"-6")
        q=NEW["IA2B-7-009"]
        self.assertIn(r"\ne",q["solution_md"])
        self.assertIn("3 n - 36",q["solution_md"])

    def test_systems_by_exact_substitution_and_financial_rounding(self):
        systems=0
        for q in NEW.values():
            data=q["verification"]
            if data["kind"]=="system":
                values={name:calculate(value)[0].scalar() for name,value in zip(data["variables"],data["values"])}
                for equation in data["input"]:
                    left,right=equation.split("=")
                    self.assertEqual(calculate(left,values)[0].scalar(),calculate(right,values)[0].scalar(),q["id"])
                systems+=1
            elif data["kind"]=="annuity":
                with localcontext() as ctx:
                    ctx.prec=50
                    rate=Decimal(data["annual_rate"])/data["periods"]
                    value=Decimal(data["payment"])*((1+rate)**(data["periods"]*data["years"])-1)/rate
                    self.assertEqual(str(value.quantize(Decimal(".01"),rounding=ROUND_HALF_UP)),data["rounded"])
        self.assertEqual(systems,50)

    def test_plot_samples_are_finite_bounded_in_x_and_no_empty_curves(self):
        checked=0
        for q in NEW.values():
            graph=q["answer"].get("plot")
            if not graph:continue
            self.assertLess(graph["x_min"],graph["x_max"])
            self.assertLess(graph["y_min"],graph["y_max"])
            for curve in graph["curves"]:
                self.assertLessEqual(len(curve["points"]),400)
                points=[p for p in curve["points"] if p is not None]
                self.assertTrue(points,q["id"])
                self.assertTrue(all(len(p)==2 and all(math.isfinite(v) for v in p) for p in points))
                self.assertTrue(all(graph["x_min"]-1e-6<=p[0]<=graph["x_max"]+1e-6 for p in points))
            checked+=1
        self.assertGreater(checked,150)
        circle=NEW["IA2B-11-029"]["answer"]["plot"]
        # As duas metades precisam se encontrar nos extremos reais do domínio.
        for curve in circle["curves"]:
            points=[p for p in curve["points"] if p is not None]
            self.assertIn([-6.0,-3.0],points)
            self.assertIn([-4.0,-3.0],points)

if __name__=="__main__":unittest.main()
