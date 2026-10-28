"""Seleção publicada, arquivo sem perda e proteção contra reimportação."""
import json
import unittest
from collections import Counter
from pathlib import Path
from question_catalog import load_catalog, split_catalog, ARCHIVE_PATH, SEED_PATH
from build_database import validate_publication_limits
from import_ia2_ch1_full import import_batch

ROOT=Path(__file__).resolve().parents[1]

def legacy_catalog():
    archive=json.loads(ARCHIVE_PATH.read_text(encoding="utf-8"))
    full=load_catalog()
    original=set(archive["original_order"])
    return {**full, "sources":archive["sources"], "questions":[q for q in full["questions"] if q["id"] in original]}

class QuestionLimitTests(unittest.TestCase):
    def test_active_archive_partition_and_exact_reassembly(self):
        active=json.loads(SEED_PATH.read_text(encoding="utf-8"))
        archive=json.loads(ARCHIVE_PATH.read_text(encoding="utf-8"))
        full=legacy_catalog()
        active={**active,"sources":archive["sources"],"questions":[q for q in active["questions"] if q["id"] in set(archive["original_order"])]}
        selected,saved=split_catalog(full)
        self.assertEqual(selected,active)
        self.assertEqual(saved,archive)
        self.assertEqual((len(active["questions"]),len(archive["questions"]),len(full["questions"])),(218,410,628))
        self.assertFalse({q["id"] for q in active["questions"]}&{q["id"] for q in archive["questions"]})
        self.assertEqual([q["id"] for q in full["questions"]],archive["original_order"])
        self.assertEqual(selected["questions"]+saved["questions"],
            [q for q in full["questions"] if q["id"] in {a["id"] for a in selected["questions"]}]+
            [q for q in full["questions"] if q["id"] in {a["id"] for a in saved["questions"]}])
        self.assertEqual(saved["topics"],full["topics"])
        self.assertEqual(saved["sources"],full["sources"])

    def test_limits_without_reclassifying_and_export_excludes_archive(self):
        full=load_catalog()
        active,archive=split_catalog(full)
        by_id={q["id"]:q for q in full["questions"]}
        counts=Counter((q["topic_id"],q["difficulty"]) for q in active["questions"])
        self.assertTrue(all(count<=15 for count in counts.values()))
        self.assertTrue(all(count<=60 for count in Counter(q["topic_id"] for q in active["questions"]).values()))
        for question in active["questions"]+archive["questions"]:
            self.assertEqual(question,by_id[question["id"]])
        export=json.loads((ROOT/"public/data/questions.json").read_text(encoding="utf-8"))
        self.assertEqual({q["id"] for q in export["questions"]},{q["id"] for q in active["questions"]})
        validate_publication_limits(active)
        with self.assertRaisesRegex(ValueError,"Limite de publicação excedido"):
            validate_publication_limits(full)

    def test_import_cannot_bypass_publication_policy(self):
        full=legacy_catalog()
        self.assertEqual(import_batch(full),full)
        active,archive=split_catalog(import_batch(full))
        self.assertEqual(len(active["questions"]),218)
        self.assertEqual(archive,json.loads(ARCHIVE_PATH.read_text(encoding="utf-8")))

if __name__=="__main__":unittest.main()
