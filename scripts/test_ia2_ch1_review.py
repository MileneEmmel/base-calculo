"""Cobertura editorial e recálculo independente do lote 385–465."""
import ast
import json
import math
import re
import unittest
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction as F
from pathlib import Path

from import_ia2_ch1_review import import_batch
from build_database import validate_seed
from question_catalog import load_catalog
from copy import deepcopy

ROOT = Path(__file__).resolve().parents[1]
SEED = load_catalog()
BY_NUMBER = {int(re.search(r"exercício (\d+)$",q["source_locator"]).group(1)): q for q in SEED["questions"] if q["source_id"]=="src-intermediate-algebra-ch1"}


def rational_answer(number):
    answer = BY_NUMBER[number]["answer"]
    return F(*answer["fraction"]) if "fraction" in answer else F(str(answer["value"]))


def polynomial(expression, **values):
    """Avaliador restrito só para a notação algébrica curada; aritmética racional."""
    pattern = r"\\frac(?:\{([^{}]+)\}|([a-z0-9]))(?:\{([^{}]+)\}|([a-z0-9]))"
    expression = re.sub(pattern,lambda m:f"(({m[1] or m[2]})/({m[3] or m[4]}))",expression)
    expression = expression.replace("^","**").replace(r"\cdot","*").replace(" ","")
    expression = re.sub(r"(?<=[a-z])(?=[a-z(])|(?<=\))(?=[a-z0-9(])|(?<=[0-9])(?=[a-z(])","*",expression)
    tree = ast.parse(expression,mode="eval")
    allowed = (ast.Expression,ast.BinOp,ast.UnaryOp,ast.Add,ast.Sub,ast.Mult,ast.Div,ast.Pow,ast.USub,ast.UAdd,ast.Load,ast.Name,ast.Constant)
    if any(not isinstance(node,allowed) for node in ast.walk(tree)): raise ValueError("Expressão de teste não permitida")
    if any(isinstance(node,ast.Name) and node.id not in values for node in ast.walk(tree)): raise ValueError("Variável de teste desconhecida")
    class RationalConstants(ast.NodeTransformer):
        def visit_Constant(self,node):
            if not isinstance(node.value,int): raise ValueError("Constante de teste inesperada")
            return ast.copy_location(ast.Call(func=ast.Name(id="_F",ctx=ast.Load()),args=[node],keywords=[]),node)
    transformed = ast.fix_missing_locations(RationalConstants().visit(tree))
    return eval(compile(transformed,"<curated-math>","eval"),{"__builtins__":{},"_F":F},{key:F(value) for key,value in values.items()})


class IA2ReviewTests(unittest.TestCase):
    def test_complete_source_without_duplicates_and_repeat_import(self):
        self.assertEqual(set(BY_NUMBER),set(range(385,466)))
        self.assertEqual(len([q for q in SEED["questions"] if q["source_id"]=="src-intermediate-algebra-ch1"]),81)
        self.assertEqual([BY_NUMBER[n]["id"] for n in [386,388,393]],["MB-002","MB-001","MB-003"])
        self.assertEqual(import_batch(SEED),SEED)
        self.assertGreaterEqual(len(SEED["questions"]),102)
        self.assertGreaterEqual(len(SEED["topics"]),32)
        for n,q in BY_NUMBER.items():
            with self.subTest(exercise=n):
                self.assertTrue(q["hint_md"] and q["solution_md"] and q["adaptation_note"])
                self.assertIn(q["difficulty"],range(1,5))
                self.assertEqual(q["status"],"published")

    def test_integer_and_fraction_arithmetic(self):
        expected = {
            387:math.lcm(24,40),388:24/3+4*(5-2),389:7+3*(6-4*(5-4))-3**2,391:2*3**2-4*3-3,
            398:9-abs(3*(4-8)),399:12-3*abs(1-4*(4-2)),400:-12-8+7,402:-11-(-12)+5,
            404:-(7-11)-(3-5),407:(7-11)*(6-13),408:63/-9+(-36)/(-4),409:6-3*abs(4*(1-2)-(7-5)),
            410:(-2)**4-24/(13-5),411:(-4+7)**2,412:3*(-2)**2-2*(-2)*(-3)+4*(-3)**2,
            413:-4-9+23,415:109-63,416:F(204,228),418:F(-14,15)*F(10,21),420:F(-4,9)/F(8,21),
            421:F(5,18)+F(7,12),422:F(11,36)-F(15,48),425:F(4*3-2*5,-6*3+2*3),
            426:F(4*(7-3)-2*(4-9),-3*(4+2)+7*(3-6)),427:F(4**3-4**2)/F(4,5)**2,
            428:4*F(2,3)**2*F(-3,4)**2,429:F(-4+6,-4-6),440:F("0.65"),441:F("-9.6"),
            446:math.isqrt(289),452:-32*9*F(5,8),453:F(11,15)+F(3,8)+F(5,8),
            454:F(4,7)+F(8,15)-F(4,7),455:F(13,15)*F(9,17)*F(15,13),456:0,
        }
        for number,value in expected.items():
            with self.subTest(exercise=number): self.assertEqual(rational_answer(number),value)
        self.assertEqual(BY_NUMBER[385]["answer"]["divisors"],[n for n in [2,3,5,6,10] if 180%n==0])

    def test_rejects_duplicate_exercise_from_same_source(self):
        invalid = deepcopy(SEED)
        duplicate = deepcopy(BY_NUMBER[385])
        duplicate.update(id='MB-999',slug='duplicacao-para-teste',statement_md='Outro texto não deve ocultar a duplicação de origem.')
        invalid['questions'].append(duplicate)
        with self.assertRaisesRegex(ValueError,'Exercício da fonte duplicado'):
            validate_seed(invalid)

    def test_subitems_are_all_answered(self):
        expected = {390:[4**3,5**4,2*4**2-5*4+3],397:["=","=",">","="],401:[15-7,-15-(-7),-15-7,15-(-7)],
                    403:[23-(-17),23+17],405:[-27/9,120/-8,4*-14,-1*-17],406:[(-7)**3,-7**3],414:[17-(-8),-25-17],
                    423:[F(5,8)+F(3,4),F(5,8)/F(3,4)]}
        for number,values in expected.items():
            actual=BY_NUMBER[number]["answer"]["parts"]
            self.assertEqual(list(actual),list("abcd"[:len(values)]))
            for label,value in zip("abcd",values):
                with self.subTest(exercise=number,part=label):
                    self.assertEqual(F(actual[label]) if number==423 else actual[label],value)

    def test_397_preserves_both_external_minus_signs_from_source(self):
        # Conferido na seção oficial e no Answer Key público, exercício 397.
        # Checar só o gabarito não detectava a transcrição de uma expressão diferente.
        question = BY_NUMBER[397]
        self.assertIn(r"(a) \(-|7|\;\_\;-|-7|\)", question["statement_md"])
        left, right = -abs(7), -abs(-7)
        self.assertEqual(left, right)
        self.assertEqual(question["answer"]["parts"]["a"], "=")
        self.assertIn(r"\(-7=-7\)", question["solution_md"])

    def test_decimal_and_percent_results_without_float_rounding(self):
        D=Decimal
        expected={431:D('-23.67')+D('29.84'),432:D('54.3')-D(100),433:D('79.38')-D('-17.598'),
                  434:D('-2.8')*D('3.97'),435:D('-8.43')*D('-57.91'),436:D('53.48')*10,437:D('0.563')*100,
                  438:(D('118.35')/D('2.6')).quantize(D('.01'),rounding=ROUND_HALF_UP),439:D('1.84')/D('-0.8'),442:-D(5)/D(8)}
        for number,value in expected.items():
            with self.subTest(exercise=number): self.assertEqual(D(BY_NUMBER[number]["answer"]["decimal"]),value)
        for label,places in [('a','.01'),('b','.1'),('c','1')]:
            self.assertEqual(D(BY_NUMBER[430]["answer"]["parts"][label]),D('6.738').quantize(D(places),rounding=ROUND_HALF_UP))
        self.assertEqual(D(BY_NUMBER[444]["answer"]["percent"]),D('2.43')*100)
        self.assertEqual(D(BY_NUMBER[445]["answer"]["percent"]),D('0.0475')*100)
        self.assertEqual(F(1)+F(int(BY_NUMBER[443]["answer"]["period"]),99),F(14,11))
        self.assertEqual(F(*BY_NUMBER[438]["answer"]["exact_fraction"]),F('118.35')/F('2.6'))

    def test_symbolic_simplifications_at_rational_points(self):
        source={392:'12*y+7+2*y-5',393:'14*x**2-9*x+11-8*x**2+8*x-6',396:'5*n-4',
                417:'-270*x**3/(198*y**2)',419:'(6*x/25)/(9*y/20)',451:'5*x/8+5*y/12+x/8+7*y/12',
                458:'8*(a-4)',459:'12*(2*b/3+5/6)',460:'18*5/6*(2*x-5)',461:'(x-5)*p',
                462:'-4*(y-3)',463:'12-6*(x+3)',464:'6*(3*x-4)-(-5)',465:'5*(2*y+3)-(4*y-1)'}
        for number,expression in source.items():
            for value in [F(-3),F(1,2),F(5)]:
                variables={key:value+i for i,key in enumerate(['x','y','a','b','p','n'])}
                with self.subTest(exercise=number,value=value):
                    self.assertEqual(polynomial(BY_NUMBER[number]['answer']['latex'],**variables),polynomial(expression,**variables))
        source_parts={394:{'a':'4*a*b**2+7*a**3*b**2','b':'6*y**2*3*y','c':'12+5*x','d':'8*y**2-5*y'},
                      395:{'a':'11*(y-2)','b':'11*y-2'},424:{'a':'-3*y/10-5/6','b':'-3*y/10*5/6'}}
        for number,parts in source_parts.items():
            self.assertEqual(set(BY_NUMBER[number]['answer']['parts']),set(parts))
            for label,expression in parts.items():
                for value in [F(-3),F(1,2),F(5)]:
                    variables={key:value+i for i,key in enumerate(['x','y','a','b'])}
                    self.assertEqual(polynomial(BY_NUMBER[number]['answer']['parts'][label],**variables),polynomial(expression,**variables))

    def test_domains_sets_and_number_lines(self):
        self.assertEqual(BY_NUMBER[417]['answer']['restriction'],'y != 0')
        self.assertEqual(BY_NUMBER[419]['answer']['restriction'],'y != 0')
        self.assertEqual(BY_NUMBER[456]['answer']['restriction'],'x != 3')
        self.assertFalse(BY_NUMBER[447]['answer']['real_value'])
        with self.assertRaises(ValueError): math.sqrt(-121)
        self.assertFalse(BY_NUMBER[457]['answer']['defined'])
        self.assertIn('não periódica',BY_NUMBER[448]['statement_md'])
        self.assertEqual(set(BY_NUMBER[448]['answer']['sets']),set('abcde'))
        self.assertEqual(BY_NUMBER[448]['answer']['sets']['a'],['0','sqrt(36)','9'])
        self.assertEqual(BY_NUMBER[448]['answer']['sets']['c'],['-8','0','12/5','sqrt(36)','9'])
        for number,expected in [(449,[F(-5,2),F(-5,3),F(-3,4),F(3,4),F(4,3),F(7,2)]),(450,[F('-1.35'),F('3.2')])]:
            line=BY_NUMBER[number]['answer']['number_line']
            self.assertEqual(len(line['points']),len(expected))
            for point,value in zip(line['points'],expected):
                self.assertAlmostEqual(point['value'],float(value))
                self.assertTrue(line['min']<=point['value']<=line['max'])
            self.assertEqual([point['value'] for point in line['points']],sorted(point['value'] for point in line['points']))


if __name__=='__main__': unittest.main()
