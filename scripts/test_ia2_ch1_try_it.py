"""Cobertura, recálculo e comparação ao gabarito público dos 112 Try It."""
import json
import re
import unittest
from fractions import Fraction as F
from pathlib import Path
from ia2_ch1_try_it import RAW_TRY,SPECIAL_TRY,try_questions
from ia2_exact_math import calculate
from test_ia2_ch1_full import mathml_value
from question_catalog import load_catalog

ROOT=Path(__file__).resolve().parents[1]
SEED=load_catalog()
BY_NUMBER={int(q["id"].split("T")[-1]):q for q in SEED["questions"] if re.fullmatch(r"IA2-1-T\d+",q["id"])}

class TryItTests(unittest.TestCase):
    def test_all_112_try_it_exercises_have_content_and_source(self):
        self.assertEqual(set(BY_NUMBER),set(range(1,113)))
        self.assertEqual(len(try_questions()),112)
        for number,question in BY_NUMBER.items():
            self.assertTrue(question["source_locator"].endswith("Try It 1."+str(number)))
            self.assertTrue(question["statement_md"] and question["hint_md"] and question["solution_md"])
            self.assertEqual(question["status"],"published")

    def test_math_against_independent_mathml_reader(self):
        checks=0
        for number,raw in RAW_TRY.items():
            if number in SPECIAL_TRY:continue
            answer=BY_NUMBER[number]["answer"]
            expressions=list(answer["parts"].values()) if "parts" in answer else [answer["latex"]]
            self.assertEqual(len(expressions),len(raw["mathml"]))
            for sample in [F(-3),F(1,2),F(5)]:
                variables={name:sample for name in "abcdefghijklmnopqrstuvwxyz"}
                for source,result in zip(raw["mathml"],expressions):
                    with self.subTest(try_it=number,sample=sample):
                        self.assertEqual(mathml_value(source,variables),calculate(result,variables)[0].scalar())
                        checks+=1
        self.assertGreater(checks,180)

    def test_answers_match_public_key_including_subitems(self):
        official=json.loads((ROOT/"database/sources/ia2-ch1/official-try-it-answers.json").read_text(encoding="utf-8"))
        self.assertEqual(set(official),{"1."+str(n) for n in range(1,113)})
        variables={name:F(i+2) for i,name in enumerate("abcdefghijklmnopqrstuvwxyz")}
        checked=0
        def value(expression):
            expression=expression.replace(r"\(", "").replace(r"\)", "").replace("−","-").replace(",","").strip()
            expression=re.sub(r"^(-?\d+)\s+(\\frac)",lambda m:m[1]+("+" if not m[1].startswith("-") else "-")+m[2],expression)
            return calculate(expression,variables)[0].scalar()
        for number,question in BY_NUMBER.items():
            key=official["1."+str(number)]
            answer=question["answer"]
            parts=answer.get("parts")
            if parts and all(isinstance(v,str) for v in parts.values()):
                values=[t.strip() for t in re.split("[ⓐⓑⓒⓓⓔ]",key["text"])[1:]]
                self.assertEqual(len(values),len(parts),number)
                for label,expected in zip(parts,values):
                    actual=parts[label]
                    cleaned=expected.replace(r"\(","").replace(r"\)","").strip()
                    if actual in ("sim","não","=","<",">","não definida"):
                        self.assertEqual({"yes":"sim","no":"não","undefined":"não definida"}.get(cleaned,cleaned),actual,(number,label))
                    else:self.assertEqual(value(expected),value(actual),(number,label))
                    checked+=1
            elif "latex" in answer or "value" in answer:
                try:
                    expected=value(key["text"])
                    actual=value(answer["latex"]) if "latex" in answer else F(answer["value"])
                except (ValueError,IndexError,SyntaxError):continue
                self.assertEqual(expected,actual,number)
                checked+=1
        self.assertGreaterEqual(checked,110)

    def test_restrictions_sets_and_source_number_line_values(self):
        self.assertEqual(BY_NUMBER[53]["answer"]["restriction"],r"a\ne0,\;b\ne0")
        self.assertEqual(BY_NUMBER[54]["answer"]["restriction"],r"p\ne0,\;q\ne0")
        self.assertIn("não periódico",BY_NUMBER[84]["statement_md"])
        self.assertEqual(BY_NUMBER[87]["answer"]["number_line"]["points"][0]["value"],-0.25)
        self.assertEqual(BY_NUMBER[88]["answer"]["number_line"]["points"][0]["value"],-0.75)
        self.assertEqual(BY_NUMBER[31]["answer"]["parts"]["d"],["-4","-4"])
        self.assertEqual(BY_NUMBER[32]["answer"]["parts"]["d"],["3","3"])
        self.assertEqual(BY_NUMBER[47]["answer"]["latex"],r"-\frac{23}{40}")

if __name__=="__main__":unittest.main()
