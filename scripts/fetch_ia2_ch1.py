"""Captura oficial para curadoria local; requer lxml no ambiente de manutenção."""
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
import json
import re
from lxml import html

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / "database" / "sources" / "ia2-ch1"
BASE = "https://openstax.org/books/intermediate-algebra-2e/pages/"
SLUGS = [
    "1-1-use-the-language-of-algebra", "1-2-integers", "1-3-fractions",
    "1-4-decimals", "1-5-properties-of-real-numbers", "1-practice-test", "chapter-1",
]

def latex(node):
    tag = node.tag.split("}")[-1]
    children = list(node)
    if tag == "semantics": return latex(children[0])
    if tag in ("annotation-xml", "annotation"): return ""
    if tag == "mfrac": return r"\frac{" + latex(children[0]) + "}{" + latex(children[1]) + "}"
    if tag == "msup": return "{" + latex(children[0]) + "}^{" + latex(children[1]) + "}"
    if tag == "msub": return "{" + latex(children[0]) + "}_{" + latex(children[1]) + "}"
    if tag == "msqrt": return r"\sqrt{" + "".join(map(latex, children)) + "}"
    if tag == "mover": return r"\overline{" + latex(children[0]) + "}"
    if tag in ("mn", "mi", "mo", "mtext"):
        t = "".join(node.itertext()).strip()
        return t.replace("−", "-").replace("÷", r"\div ").replace("·", r"\cdot ").replace("×", r"\times ").replace("≠", r"\ne ").replace("$", r"\$")
    return (node.text or "") + "".join(latex(c) + (c.tail or "") for c in children)

def text(node):
    if node.tag == "math": return r"\(" + re.sub(r"\s+", " ", latex(node)).strip() + r"\)"
    if node.tag == "img": return "[FIGURA: " + node.get("alt", "") + "]"
    value = (node.text or "") + "".join(text(c) + (c.tail or "") for c in node)
    if node.tag in ("p", "li", "tr"): value += "\n"
    return value

def fetch(slug):
    path = DEST / (slug + ".html")
    if not path.exists(): path.write_bytes(urlopen(BASE + slug, timeout=60).read())
    tree = html.fromstring(path.read_bytes())
    result = []
    try_it = []
    for exercise in tree.xpath('//*[@data-type="exercise"]'):
        number = exercise.xpath('.//*[@data-type="problem"]/*[contains(concat(" ", normalize-space(@class), " "), " os-number ")]')
        if not number:
            notes=exercise.xpath('ancestor::*[@data-type="note" and contains(concat(" ",normalize-space(@class)," ")," try ")]')
            if notes:
                labels=notes[-1].xpath('./header//span[@class="os-number"]')
                containers=exercise.xpath('.//*[@class="os-problem-container"]')
                if labels and containers:
                    container=containers[0]
                    try_it.append(dict(number=labels[0].text_content().strip(),anchor=exercise.get("id"),
                        text=re.sub(r"[ \t]+"," ",text(container)).strip(),
                        math=[latex(m) for m in container.xpath(".//math")],
                        mathml=[html.tostring(m.xpath("./semantics/*[1]")[0],encoding="unicode") for m in container.xpath(".//math")]))
            continue
        container = exercise.xpath('.//*[@class="os-problem-container"]')[0]
        headers = exercise.xpath('preceding::*[self::h3 or self::h4 or @data-type="exercise-instructions"]')
        result.append(dict(number=int(number[0].text_content()), anchor=exercise.get("id"), text=re.sub(r"[ \t]+", " ", text(container)).strip(),
                           instruction=re.sub(r"\s+", " ", text(headers[-1])).strip() if headers else "",
                           math=[latex(m) for m in container.xpath(".//math")],
                           mathml=[html.tostring(m.xpath("./semantics/*[1]")[0],encoding="unicode") for m in container.xpath(".//math")]))
    if slug != "chapter-1":
        if try_it:
            (DEST/(slug+"-try-it.json")).write_text(json.dumps(try_it,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
            (DEST/(slug+"-try-it.txt")).write_text("\n\n".join(f'{q["number"]}\n{q["text"]}' for q in try_it),encoding="utf-8")
        (DEST / (slug + ".json")).write_text(json.dumps(result, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
        (DEST / (slug + ".txt")).write_text("\n\n".join(f'{q["number"]} | {q["instruction"]}\n{q["text"]}' for q in result),encoding="utf-8")
    else:
        answers={}
        try_answers={}
        for solution in tree.xpath('//*[@data-type="solution"]'):
            numbers=solution.xpath('./a[@class="os-number"]')
            containers=solution.xpath('./div[contains(@class,"os-solution-container")]')
            if numbers and containers and numbers[0].text_content().isdigit():
                container=containers[0]
                answers[int(numbers[0].text_content())]=dict(text=text(container).strip(),
                    math=[re.sub(r"\s+"," ",latex(m)).strip() for m in container.xpath(".//math")])
            elif numbers and containers and re.fullmatch(r"1\.\d+",numbers[0].text_content()):
                try_answers[numbers[0].text_content()]=dict(text=text(containers[0]).strip(),
                    math=[re.sub(r"\s+"," ",latex(m)).strip() for m in containers[0].xpath(".//math")])
        (DEST/"official-odd-answers.json").write_text(json.dumps(answers,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
        (DEST/"official-try-it-answers.json").write_text(json.dumps(try_answers,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    return slug, len(result)

if __name__ == "__main__":
    DEST.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=4) as pool:
        for item in pool.map(fetch, SLUGS): print(item)
