"""Inventário oficial do livro inteiro; capturas de pesquisa, fora do site."""
import json
import re
import hashlib
from pathlib import Path
from urllib.request import urlopen
from concurrent.futures import ThreadPoolExecutor
from lxml import html
from fetch_ia2_ch1 import latex,text

def book_latex(node):
    tag=node.tag.split("}")[-1]
    children=list(node)
    if tag=="semantics":return book_latex(children[0])
    if tag in ("annotation","annotation-xml","mspace"):return ""
    if tag=="mfrac":return r"\frac{"+book_latex(children[0])+"}{"+book_latex(children[1])+"}"
    if tag=="msup":return "{"+book_latex(children[0])+"}^{"+book_latex(children[1])+"}"
    if tag=="msub":
        base=book_latex(children[0]).strip()
        return (base if base in (r"\log",r"\ln") else "{"+base+"}")+"_{"+book_latex(children[1])+"}"
    if tag=="msubsup":return "{"+book_latex(children[0])+"}_{"+book_latex(children[1])+"}^{"+book_latex(children[2])+"}"
    if tag=="munderover":return book_latex(children[0])+"_{"+book_latex(children[1])+"}^{"+book_latex(children[2])+"}"
    if tag=="munder":return book_latex(children[0])+"_{"+book_latex(children[1])+"}"
    if tag=="msqrt":return r"\sqrt{"+ "".join(map(book_latex,children))+"}"
    if tag=="mroot":
        index=book_latex(children[1]).strip()
        return r"\sqrt"+("["+index+"]" if index else "")+"{"+book_latex(children[0])+"}"
    if tag=="mover":return r"\overline{"+book_latex(children[0])+"}"
    if tag=="mtable":
        return r"\begin{matrix}"+r"\\".join(" & ".join(book_latex(c) for c in row) for row in children)+r"\end{matrix}"
    if tag in ("mn","mi","mo","mtext"):
        value="".join(node.itertext()).strip()
        value={"log":r"\log","ln":r"\ln","π":r"\pi","∞":r"\infty","∑":r"\sum"}.get(value,value)
        for a,b in {"−":"-","÷":r"\div ","·":r"\cdot ","×":r"\times ","≠":r"\ne ","≤":r"\le ","≥":r"\ge ","±":r"\pm "}.items():value=value.replace(a,b)
        return value
    return (node.text or "")+"".join(book_latex(c)+(c.tail or "") for c in children)

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/"database/sources/ia2-book"
BASE="https://openstax.org/books/intermediate-algebra-2e/pages/"

def pages():
    tree=json.loads((DEST/"toc.json").read_text(encoding="utf-8"))
    result={}
    def visit(node):
        if isinstance(node,dict):
            slug=node.get("slug","")
            if re.match(r"^\d+-\d+-",slug) or re.match(r"^\d+-(review-exercises|practice-test)$",slug) or re.match(r"^chapter-\d+$",slug):
                result[slug]=re.sub(r"\s+"," ",html.fromstring("<div>"+node["title"]+"</div>").text_content()).strip()
            for value in node.values():
                if isinstance(value,(dict,list)):visit(value)
        elif isinstance(node,list):
            for value in node:visit(value)
    visit(tree)
    return result

def fetch(item):
    slug,title=item
    path=DEST/(slug+".html")
    previous=ROOT/"database/sources/ia2-ch1"/(slug+".html")
    if not path.exists():
        path.write_bytes(previous.read_bytes() if previous.exists() else urlopen(BASE+slug,timeout=60).read())
    data=path.read_bytes()
    tree=html.fromstring(data)
    rows=[]
    practice=[]
    answers={}
    if slug.startswith("chapter-"):
        for solution in tree.xpath('//*[@data-type="solution"]'):
            labels=solution.xpath('./a[@class="os-number"]')
            containers=solution.xpath('./div[contains(@class,"os-solution-container")]')
            if labels and containers:
                answers[labels[0].text_content().strip()]=dict(text=re.sub(r"\s+"," ",text(containers[0])).strip(),
                    math=[re.sub(r"\s+"," ",book_latex(m)).strip() for m in containers[0].xpath(".//math")])
    else:
        for exercise in tree.xpath('//*[@data-type="exercise"]'):
            labels=exercise.xpath('.//*[@data-type="problem"]/*[contains(concat(" ",normalize-space(@class)," ")," os-number ")]')
            containers=exercise.xpath('.//*[@class="os-problem-container"]')
            if not labels and containers:
                notes=exercise.xpath('ancestor::*[@data-type="note" and contains(concat(" ",normalize-space(@class)," ")," try ")]')
                if notes:
                    numbers=notes[-1].xpath('./header//span[@class="os-number"]')
                    if numbers:
                        container=containers[0]
                        headings=exercise.xpath('preceding::h3[not(ancestor::*[@data-type="note"]) and not(ancestor::*[@data-type="example"])]')
                        practice.append(dict(number=numbers[0].text_content().strip(),page=slug,is_try_it=True,anchor=exercise.get("id"),
                            context=[re.sub(r"\s+"," ",text(headings[-1])).strip()] if headings else [],
                            text=re.sub(r"\s+"," ",text(container)).strip(),
                            math=[re.sub(r"\s+"," ",book_latex(m)).strip() for m in container.xpath(".//math")],
                            mathml=[html.tostring(m,encoding="unicode") for m in container.xpath(".//math")],
                            figures=container.xpath(".//img/@alt")))
                continue
            if not labels or not containers:continue
            number=labels[0].text_content().strip()
            if not number.isdigit():continue
            container=containers[0]
            context=[]
            for previous_sibling in exercise.itersiblings(preceding=True):
                if previous_sibling.get("data-type")=="exercise":continue
                if previous_sibling.tag in ("p","h3","h4","h5"):
                    context.append(re.sub(r"\s+"," ",text(previous_sibling)).strip())
                if len(context)>=2:break
            rows.append(dict(number=int(number),anchor=exercise.get("id"),page=slug,
                context=list(reversed(context)),text=re.sub(r"\s+"," ",text(container)).strip(),
                math=[re.sub(r"\s+"," ",book_latex(m)).strip() for m in container.xpath(".//math")],
                mathml=[html.tostring(m,encoding="unicode") for m in container.xpath(".//math")],
                figures=container.xpath(".//img/@alt")))
    payload=dict(url=BASE+slug,title=title,sha256=hashlib.sha256(data).hexdigest(),questions=rows,practice=practice,answers=answers)
    (DEST/(slug+".json")).write_text(json.dumps(payload,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    return dict(page=slug,title=title,exercises=len(rows),try_it=len(practice),answers=len(answers),sha256=payload["sha256"])

if __name__=="__main__":
    with ThreadPoolExecutor(max_workers=5) as pool:
        report=list(pool.map(fetch,pages().items()))
    (DEST/"inventory.json").write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print("Páginas:",len(report),"Exercícios:",sum(p["exercises"] for p in report),"Try It:",sum(p["try_it"] for p in report))
