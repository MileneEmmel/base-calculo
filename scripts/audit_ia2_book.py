"""Confronto adicional com gabaritos públicos; não usa manuais de professores."""
import json
import re
from collections import Counter
from curate_ia2_book import DATA,OUTPUT,parse,sp,clean

def sanitize(value):
    value=value.replace(r"\(","").replace(r"\)","").replace("−","-")
    value=value.replace(r"\$","").replace("$","").replace(r"\%","").replace("%","")
    value=re.sub(r"(?<=\d),(?=\d{3}(?:\D|$))","",value)
    value=re.sub(r"\\(?:left|right)","",value).strip().rstrip(".,;")
    return value

def scalar(value):
    value=sanitize(value)
    value=re.sub(r"\([^()]*\\ne[^()]*\)","",value)
    value=value.split(r"\approx")[0]
    if "=" in value:value=value.split("=")[-1]
    value=re.sub(r"^(\d+)\s+(\\frac)",r"\1+\2",value)
    return parse(value,positive=True).subs(sp.Symbol("e",positive=True),sp.E)

def split_values(value):
    value=sanitize(value).replace(r"\{","").replace(r"\}","")
    if value.startswith("(") and value.endswith(")"):value=value[1:-1]
    if r"\pm" in value:return [scalar(value.replace(r"\pm","+")),scalar(value.replace(r"\pm","-"))]
    depth=0;pieces=[];current=""
    for char in value:
        if char in "{(":depth+=1
        if char in "})":depth-=1
        if char=="," and depth==0:pieces.append(current);current=""
        else:current+=char
    if current.strip():pieces.append(current)
    return [scalar(p) for p in pieces]

def agree(a,b):
    symbols={symbol:sp.Rational(3,2) for symbol in a.free_symbols|b.free_symbols}
    for sample in [sp.Rational(3,2),sp.Rational(7,3),sp.Rational(9,2)]:
        try:
            replacements={symbol:sample for symbol in symbols}
            delta=sp.simplify(a.subs(replacements)-b.subs(replacements))
            if delta.has(sp.zoo,sp.nan,sp.oo):continue
            if delta!=0 and abs(complex(delta.evalf()))>1e-7:return False
        except (ValueError,TypeError,ZeroDivisionError):continue
    return True

def run():
    selection=json.loads(OUTPUT.read_text(encoding="utf-8"))
    keys={str(n):json.loads((DATA/f"chapter-{n}.json").read_text(encoding="utf-8"))["answers"] for n in range(1,13)}
    checked=Counter();mismatches=[];not_comparable=Counter()
    for q in selection["questions"]:
        chapter=q["id"].split("-")[1]
        match=re.search(r"(?:exercício (\d+)|Try It (\d+\.\d+))$",q["source_locator"])
        if not match:continue
        key=keys[chapter].get(match[1] or match[2])
        if not key:continue
        kind=q["verification"]["kind"]
        outputs=q["verification"].get("output")
        try:
            if kind=="identity" and outputs and len(key["math"])==len(outputs):
                for expected,actual in zip(key["math"],outputs):
                    a,b=scalar(expected),scalar(actual)
                    if not agree(a,b):mismatches.append(dict(id=q["id"],expected=expected,actual=actual))
                checked[kind]+=1
            elif kind=="affine" and len(key["math"])==1 and "=" in key["math"][0]:
                if not agree(scalar(key["math"][0]),scalar(q["verification"]["expression"])):
                    mismatches.append(dict(id=q["id"],expected=key["math"],actual=q["verification"]["expression"]))
                checked[kind]+=1
            elif kind in ("function_values","composition","composition_values","polynomial_functions"):
                values=q["verification"].get("values",q["verification"].get("output"))
                pieces=[p.strip() for p in re.split("[ⓐⓑⓒⓓⓔ]",key["text"])[1:]]
                if not values or len(pieces)!=len(values):continue
                for expected,actual in zip(pieces,values):
                    if not agree(scalar(expected),scalar(actual)):mismatches.append(dict(id=q["id"],expected=expected,actual=actual))
                checked[kind]+=1
            elif kind=="equation" and q["verification"].get("values") is not None:
                actual=[scalar(v) for v in q["verification"]["values"]]
                expected=[]
                for formula in key["math"]:expected.extend(split_values(formula))
                if not expected:continue
                # A seleção explicita o domínio real, mesmo em seções que também tratam complexos.
                expected=[v for v in expected if not v.has(sp.I) and not v.has(sp.Symbol("i",positive=True))]
                if any(not any(agree(a,b) for b in actual) for a in expected) or any(not any(agree(a,b) for b in expected) for a in actual):
                    mismatches.append(dict(id=q["id"],expected=key["math"],actual=q["verification"]["values"]))
                checked[kind]+=1
            elif kind=="system" and len(key["math"])==1:
                expected=split_values(key["math"][0]);actual=[scalar(v) for v in q["verification"]["values"]]
                if len(expected)!=len(actual):continue
                if any(not agree(a,b) for a,b in zip(expected,actual)):mismatches.append(dict(id=q["id"],expected=key["math"],actual=q["verification"]["values"]))
                checked[kind]+=1
            else:not_comparable[kind]+=1
        except Exception as error:
            not_comparable[kind]+=1
    result=dict(checked=dict(checked),comparisons=sum(checked.values()),mismatches=mismatches,not_comparable=dict(not_comparable))
    (DATA/"public-key-audit.json").write_text(json.dumps(result,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps(result,ensure_ascii=True))
    return result

if __name__=="__main__":run()
