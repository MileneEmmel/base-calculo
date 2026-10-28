import copy
import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import build_database as builder


class TopicCatalogTests(unittest.TestCase):
    def setUp(self):
        self.seed = json.loads(builder.SEED_PATH.read_text(encoding="utf-8"))
        self.db = sqlite3.connect(":memory:")
        self.db.row_factory = sqlite3.Row
        self.db.executescript(builder.SCHEMA_PATH.read_text(encoding="utf-8"))
        builder.validate_seed(self.seed)
        builder.insert_seed(self.db, self.seed)

    def tearDown(self):
        self.db.close()

    def test_export_includes_empty_topics_and_published_counts(self):
        with tempfile.TemporaryDirectory() as directory:
            destination = Path(directory) / "questions.json"
            with patch.object(builder, "EXPORT_PATH", destination):
                builder.export_public_data(self.db)
            payload = json.loads(destination.read_text(encoding="utf-8"))
        self.assertEqual({t["id"] for t in payload["topics"]}, {t["id"] for t in self.seed["topics"]})
        self.assertTrue(any(t["question_count"] == 0 for t in payload["topics"]))
        self.assertEqual(sum(t["question_count"] for t in payload["topics"]), len(payload["questions"]))
        for topic in payload["topics"]:
            actual = sum(q["topic_slug"] == topic["slug"] for q in payload["questions"])
            self.assertEqual(topic["question_count"], actual)
            if topic["parent_slug"]:
                parent = next(t for t in payload["topics"] if t["slug"] == topic["parent_slug"])
                self.assertEqual(parent["module_slug"], topic["module_slug"])

    def test_all_existing_question_ids_and_solutions_are_preserved(self):
        published = self.db.execute("SELECT id, solution_md FROM published_questions").fetchall()
        self.assertEqual({row["id"]: row["solution_md"] for row in published}, {q["id"]: q["solution_md"] for q in self.seed["questions"] if q["status"] == "published"})
        self.assertEqual(len(published), len([q for q in self.seed["questions"] if q["status"] == "published"]))
        self.assertEqual(builder.validate_database(self.db)["topics"], len(self.seed["topics"]))

    def test_rejects_parent_cycles_and_cross_module_parents(self):
        invalid = copy.deepcopy(self.seed)
        invalid["topics"][0]["parent_id"] = invalid["topics"][1]["id"]
        invalid["topics"][1]["parent_id"] = invalid["topics"][0]["id"]
        with self.assertRaisesRegex(ValueError, "Ciclo"):
            builder.validate_seed(invalid)
        invalid = copy.deepcopy(self.seed)
        foreign_parent = next(t for t in invalid["topics"] if t["module_id"] != invalid["topics"][0]["module_id"])
        invalid["topics"][0]["parent_id"] = foreign_parent["id"]
        with self.assertRaisesRegex(ValueError, "módulos diferentes"):
            builder.validate_seed(invalid)


if __name__ == "__main__":
    unittest.main()
