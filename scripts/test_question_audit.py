"""Regressões do acervo revisado em 25/10/2026. Não consulta a web."""
import json
import math
import unittest
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SEED = json.loads((ROOT / "database/seeds/pilot_questions.json").read_text(encoding="utf-8"))
QUESTIONS = {question["id"]: question for question in SEED["questions"]}


class QuestionAuditTests(unittest.TestCase):
    def test_basic_answers(self):
        self.assertEqual(QUESTIONS["MB-001"]["answer"]["value"], 24 / 3 + 4 * (5 - 2))
        self.assertEqual(2**2 * 3**2 * 7, 252)
        self.assertEqual(QUESTIONS["MB-002"]["answer"]["latex"], r"2^2\cdot3^2\cdot7")
        self.assertEqual(QUESTIONS["MB-003"]["answer"]["latex"], "6x^2-x+5")
        x = QUESTIONS["MB-004"]["answer"]["value"]
        self.assertEqual(5 * x + 2, 7 * x - 8)
        self.assertEqual(QUESTIONS["MB-005"]["answer"]["latex"], r"6\sqrt{2}")
        self.assertAlmostEqual(math.dist((-2, 5), (4, -1)), 6 * math.sqrt(2))
        x, y = (QUESTIONS["MB-007"]["answer"][key] for key in ("x", "y"))
        self.assertEqual((10 * x + 5 * y, 3 * x - 2 * y), (-5, -12))
        self.assertEqual(QUESTIONS["MB-006"]["answer"]["latex"], "(x-5)(x+2)")
        for x in [-7, Fraction(1, 3), 0, 8]:
            self.assertEqual(14*x*x-9*x+11-8*x*x+8*x-6, 6*x*x-x+5)
            self.assertEqual(x*x-3*x-10, (x-5)*(x+2))
        roots = QUESTIONS["MB-008"]["answer"]["values"]
        self.assertEqual(len(roots), 2)
        for x in roots:
            self.assertEqual(2 * x*x - 7*x - 4, 0)

    def test_precalculus_answers(self):
        relation = [(2, 5), (7, 11), (15, 8), (7, 9)]
        self.assertLess(len({x for x, _ in relation}), len(relation))
        self.assertEqual(QUESTIONS["PC-002"]["answer"]["values"], [4 - 2*x for x in [-2, -1, 0, 1, 2]])
        self.assertEqual(QUESTIONS["PC-003"]["answer"]["latex"], "y=-3x+26")
        for x, y in [(7, 5), (3, 17)]: self.assertEqual(-3*x+26, y)
        self.assertEqual(QUESTIONS["PC-004"]["answer"]["latex"], r"\mathbb{R}\setminus\{-2,4\}")
        for x in [-2, 4]: self.assertEqual(x*x-2*x-8, 0)
        self.assertEqual(QUESTIONS["PC-005"]["answer"]["value"], 2*(3*2+5)**2+1)
        quadratic = QUESTIONS["PC-006"]["answer"]
        self.assertEqual(quadratic["vertex"], [2, -9])
        self.assertEqual(quadratic["vertex_form"], "(x-2)^2-9")
        for x in quadratic["x_intercepts"]: self.assertEqual(x*x-4*x-5, 0)
        self.assertEqual(quadratic["y_intercept"], -5)
        self.assertEqual(QUESTIONS["PC-007"]["answer"]["value"], round(205*1.13**6))
        self.assertEqual(QUESTIONS["PC-007"]["answer"]["tolerance"], 0)
        self.assertLess(0.825, 1)
        for question_id in ["PC-001", "PC-008"]:
            question = QUESTIONS[question_id]
            self.assertEqual([c["label"] for c in question["choices"] if c["is_correct"]], [question["answer"]["choice"]])

    def test_calculus_answers_by_independent_numeric_checks(self):
        for delta in [-1e-5, 1e-5]:
            x = 2 + delta
            self.assertAlmostEqual((2*x*x-3*x-2)/(x-2), QUESTIONS["C1-001"]["answer"]["value"], places=4)
            self.assertAlmostEqual((3*x*x-2*x-8)/(x*x-4), 2.5, places=4)
        self.assertEqual(QUESTIONS["C1-002"]["answer"]["latex"], r"\frac{5}{2}")
        c = QUESTIONS["C1-003"]["answer"]["value"]
        self.assertEqual(1+c, 0)
        self.assertEqual(QUESTIONS["C1-004"]["answer"]["latex"], r"f'(x)=9x^2+\frac{8}{x^3}")
        self.assertEqual(QUESTIONS["C1-005"]["answer"]["latex"], "f'(x)=-6x(4-x^2)^2")
        for x in [-3, -0.5, 0.5, 1, 3]:
            h = 1e-5
            self.assertAlmostEqual(((3*(x+h)**3-4/(x+h)**2)-(3*(x-h)**3-4/(x-h)**2))/(2*h), 9*x*x+8/x**3, places=5)
            self.assertAlmostEqual((((4-(x+h)**2)**3)-((4-(x-h)**2)**3))/(2*h), -6*x*(4-x*x)**2, places=4)
        self.assertEqual(QUESTIONS["C1-006"]["answer"]["latex"], "y-e=(e+2)(x-1)")
        f = lambda x: x+math.exp(x)-1/x
        self.assertAlmostEqual(f(1), math.e)
        self.assertAlmostEqual((f(1+1e-5)-f(1-1e-5))/2e-5, math.e+2, places=7)
        self.assertEqual(QUESTIONS["C1-007"]["answer"]["latex"], r"\frac{9}{2}")
        self.assertEqual(3*3-3**2/2, 9/2)
        self.assertEqual(QUESTIONS["C1-008"]["answer"]["latex"], r"2\pi")
        self.assertEqual(math.pi*2**2/2, 2*math.pi)

    def test_sources_and_export_match_reviewed_records(self):
        sources = {source["id"]: source for source in SEED["sources"]}
        for question_id in ["MB-001", "MB-002", "MB-003"]:
            self.assertEqual(QUESTIONS[question_id]["source_id"], "src-intermediate-algebra-ch1")
        for source in sources.values():
            self.assertEqual(source["license_code"], "CC BY-NC-SA 4.0")
            self.assertEqual(source["accessed_at"], "2026-10-25")
        export = json.loads((ROOT / "public/data/questions.json").read_text(encoding="utf-8"))
        original_ids = {f"{prefix}-{number:03d}" for prefix in ["MB", "PC", "C1"] for number in range(1,9)}
        self.assertTrue(original_ids.issubset({question["id"] for question in export["questions"]}))
        self.assertEqual(len(export["questions"]), len(SEED["questions"]))
        for question in export["questions"]:
            source = sources[QUESTIONS[question["id"]]["source_id"]]
            self.assertEqual(question["source_url"], source["url"])
            self.assertEqual(question["source_authors"], source["authors"])
            self.assertEqual(question["license_code"], source["license_code"])


if __name__ == "__main__":
    unittest.main()
