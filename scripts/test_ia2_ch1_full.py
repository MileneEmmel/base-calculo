"""Validação do capítulo completo, com leitor MathML independente da curadoria."""
import ast
import json
import math
import re
import unittest
from copy import deepcopy
from fractions import Fraction as F
from pathlib import Path
from xml.etree import ElementTree as ET
from ia2_ch1_full_content import RAW, SPECIAL, PAGES, SUBSTITUTIONS, RESTRICTIONS, questions
from ia2_exact_math import calculate
from import_ia2_ch1_full import import_batch, PREFIX
from build_database import validate_seed
from question_catalog import load_catalog

ROOT=Path(__file__).resolve().parents[1]
SEED=load_catalog()
NEW={int(q["id"].split("-")[-1]):q for q in SEED["questions"] if re.fullmatch(r"IA2-1-\d+",q["id"])}

def mathml_value(source,variables):
    """Lê diretamente a árvore de apresentação capturada; aritmética Fraction."""
    def flatten(node):
        tag=node.tag.split("}")[-1]
        if tag in ("mrow","math","semantics"):
            return [token for child in node if child.tag not in ("annotation","annotation-xml") for token in flatten(child)]
        return [visit(node)]
    def visit(node):
        tag=node.tag.split("}")[-1]
        t="".join(node.itertext()).strip().replace("−","-")
        if tag=="mn": return F(t)
        if tag=="mi": return variables[t]
        if tag=="mspace": return ""
        if tag in ("mo","mtext"):
            if re.fullmatch(r"-?\d+(?:\.\d+)?",t): return F(t)
            return {"÷":"/","·":"*","×":"*","[":"(","]":")"}.get(t,t)
        children=list(node)
        if tag=="mfrac": return visit(children[0])/visit(children[1])
        if tag=="msup":
            exponent=visit(children[1])
            if exponent.denominator!=1: raise ValueError("Expoente não inteiro")
            return visit(children[0])**int(exponent)
        if tag=="msqrt":
            value=sequence([visit(c) for c in children])
            a,b=math.isqrt(value.numerator),math.isqrt(value.denominator)
            if a*a!=value.numerator or b*b!=value.denominator: raise ValueError("Raiz não racional")
            return F(a,b)
        if tag in ("mrow","math","semantics"): return sequence(flatten(node))
        raise ValueError("MathML desconhecido: "+tag)
    def sequence(raw):
        raw=[t for t in raw if t not in ("",",",".",":",r"$")]
        tokens=[]
        bar_open=False
        for t in raw:
            if t=="|":
                t="ABS(" if not bar_open else ")"
                bar_open=not bar_open
            if tokens:
                previous=tokens[-1]
                if (isinstance(previous,F) or previous==")") and (isinstance(t,F) or t in ("(","ABS(")): tokens.append("*")
            tokens.append(t)
        index=0
        def parse(minimum=0):
            nonlocal index
            token=tokens[index];index+=1
            if token in ("+","-"):
                left=parse(30)
                if token=="-":left=-left
            elif token in ("(","ABS("):
                left=parse()
                if tokens[index]!=")":raise ValueError("Parêntese esperado")
                index+=1
                if token=="ABS(":left=abs(left)
            elif isinstance(token,F):left=token
            else:raise ValueError("Operando inesperado: "+str(token))
            precedence={"+":10,"-":10,"*":20,"/":20}
            while index<len(tokens) and tokens[index] in precedence and precedence[tokens[index]]>=minimum:
                operator=tokens[index];index+=1
                right=parse(precedence[operator]+1)
                if operator=="+":left+=right
                elif operator=="-":left-=right
                elif operator=="*":left*=right
                else:left/=right
            return left
        result=parse()
        if index!=len(tokens):raise ValueError("Tokens não consumidos: "+str(tokens[index:]))
        return result
    return visit(ET.fromstring(source))


class FullChapterTests(unittest.TestCase):
    def test_public_odd_answer_key_when_algebraic(self):
        official=json.loads((ROOT/"database/sources/ia2-ch1/official-odd-answers.json").read_text(encoding="utf-8"))
        variables={name:F(i+2) for i,name in enumerate("abcdefghijklmnopqrstuvwxyz")}
        checked=0
        for number,question in NEW.items():
            key=official.get(str(number))
            if not key or len(key["math"])!=1 or "latex" not in question["answer"]:continue
            expression=re.sub(r"\s+"," ",key["math"][0]).strip()
            # Nos gabaritos, inteiro seguido de fração própria é número misto.
            expression=re.sub(r"^(-?\d+)\s+(\\frac)",lambda m:m[1]+("+" if not m[1].startswith("-") else "-")+m[2],expression)
            try:
                expected=calculate(expression,variables)[0].scalar()
                actual=calculate(question["answer"]["latex"].replace("{,}","."),variables)[0].scalar()
            except (ValueError,IndexError,SyntaxError):continue
            with self.subTest(exercise=number):self.assertEqual(actual,expected)
            checked+=1
        self.assertGreaterEqual(checked,115)

    def test_exact_coverage_and_idempotent_import(self):
        self.assertEqual(set(NEW),set(range(1,385))|set(range(466,496)))
        chapter=[q for q in SEED["questions"] if q["source_id"].startswith(PREFIX) or q["source_id"]=="src-intermediate-algebra-ch1"]
        numbers=[int(re.search(r"exercício (\d+)$",q["source_locator"])[1]) for q in chapter if "Try It" not in q["source_locator"]]
        self.assertEqual(sorted(numbers),list(range(1,496)))
        self.assertEqual(len(chapter),607)
        self.assertEqual(sum(not q["id"].startswith("IA2B-") for q in SEED["questions"]),628)
        self.assertEqual(import_batch(SEED),SEED)
        self.assertEqual(len(questions()),414)

    def test_generated_math_against_independent_original_mathml_reader(self):
        checked=0
        for number,raw in RAW.items():
            if number in SPECIAL and number not in RESTRICTIONS:continue
            answer=NEW[number]["answer"]
            expressions=list(answer["parts"].values()) if "parts" in answer else [answer["latex"]]
            self.assertEqual(len(expressions),len(raw["mathml"]),number)
            for sample in [F(-3),F(1,2),F(5)]:
                variables={name:sample for name in "abcdefghijklmnopqrstuvwxyz"}
                for original,result in zip(raw["mathml"],expressions):
                    with self.subTest(exercise=number,sample=sample):
                        expected=mathml_value(original,variables)
                        actual=calculate(result.replace("{,}","."),variables)[0].scalar()
                        self.assertEqual(actual,expected)
                        checked+=1
        self.assertGreater(checked,800)

    def test_substitutions_and_all_subitems(self):
        expected={31:["64","16","7"],32:["243","125","7"],33:21,34:36,35:9,36:73,
            119:["-47","16"],120:["-48","23"],121:121,122:144,123:-56,124:6,125:6,126:42,
            229:[F(1,5),F(6,5)],230:[F(1,6),F(2,3)],231:F(-1,9),232:F(-9,16),233:F(-5,11),234:3,468:3}
        for number,value in expected.items():
            with self.subTest(exercise=number):
                answer=NEW[number]["answer"]
                values=list(answer["parts"].values()) if isinstance(value,list) else [answer["latex"]]
                expected_values=value if isinstance(value,list) else [value]
                self.assertEqual([calculate(v)[0].scalar() for v in values],[F(v) for v in expected_values])
        for number in [59,60,61,62]:
            self.assertEqual(len(NEW[number]["answer"]["parts"]),4)
        self.assertEqual(NEW[59]["answer"]["parts"],dict(zip("abcd",[">",">",">",">"])))
        self.assertEqual(NEW[61]["answer"]["parts"],dict(zip("abcd",["=","=",">","="])))

    def test_decimal_rounding_money_and_percent(self):
        self.assertEqual(NEW[239]["answer"]["parts"],{"a":"5.78","b":"5.8","c":"6"})
        self.assertEqual(NEW[241]["answer"]["parts"],{"a":"0.30","b":"0.3","c":"0"})
        self.assertEqual(NEW[471]["answer"]["parts"],{"a":"28.15","b":"28.146"})
        self.assertEqual(NEW[269]["answer"]["decimal"],"2.44")
        self.assertEqual(NEW[270]["answer"]["decimal"],"3.03")
        self.assertEqual(NEW[257]["answer"]["decimal"],"-1200.47982")
        self.assertEqual(NEW[290]["answer"]["percent"],"225.400")
        self.assertEqual(NEW[286]["answer"]["decimal"],"0.078")
        self.assertIn("400%",NEW[310]["solution_md"])

    def test_domain_corrections_and_repeated_source_exercises(self):
        self.assertEqual(NEW[338]["answer"]["restriction"],r"y \ne \frac16")
        self.assertIn("corrigida para y",NEW[338]["adaptation_note"])
        self.assertIn("não periódica",NEW[297]["statement_md"])
        self.assertFalse(NEW[490]["answer"]["real_value"])
        for number in RESTRICTIONS:self.assertTrue(NEW[number]["answer"]["restriction"])
        for number in range(339,343):self.assertFalse(NEW[number]["answer"]["defined"])
        self.assertEqual(NEW[493]["answer"]["parts"],{"a":"0","b":"não definida"})
        invalid=deepcopy(SEED)
        duplicate=deepcopy(NEW[1])
        duplicate.update(id="IA2-duplicate",slug="duplicacao-teste",statement_md="Texto distinto.")
        invalid["questions"].append(duplicate)
        with self.assertRaisesRegex(ValueError,"fonte duplicado"):validate_seed(invalid)

    def test_sources_discursive_answers_and_number_lines(self):
        sources={s["id"]:s for s in SEED["sources"]}
        for number,q in NEW.items():
            self.assertTrue(q["statement_md"] and q["hint_md"] and q["solution_md"])
            self.assertEqual(sources[q["source_id"]]["url"].split("/")[-1],RAW[number]["page"])
            self.assertEqual(sources[q["source_id"]]["license_code"],"CC BY-NC-SA 4.0")
            if "sample_response" in q["answer"]:self.assertIn("Resposta-modelo:",q["solution_md"])
            if "number_line" in q["answer"]:
                points=q["answer"]["number_line"]["points"]
                self.assertEqual([p["value"] for p in points],sorted(p["value"] for p in points))
        self.assertEqual(len(NEW[303]["answer"]["number_line"]["points"]),6)
        self.assertEqual(len(NEW[473]["answer"]["number_line"]["points"]),3)

if __name__=="__main__":unittest.main()
