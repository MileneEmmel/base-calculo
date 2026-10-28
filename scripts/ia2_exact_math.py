"""Aritmética racional e polinômios de Laurent para o lote curado do capítulo 1.

Não aceita código arbitrário: a árvore permitida contém apenas números, variáveis
de uma letra e as operações aritméticas abaixo.
"""
import ast
import re
from fractions import Fraction


class Polynomial:
    def __init__(self, terms=0):
        self.terms = {k: Fraction(v) for k, v in terms.items() if v} if isinstance(terms, dict) else ({(): Fraction(terms)} if terms else {})

    @classmethod
    def variable(cls, name): return cls({((name, 1),): 1})

    def __add__(self, other):
        terms = self.terms.copy()
        for k, v in other.terms.items(): terms[k] = terms.get(k, 0) + v
        return Polynomial(terms)

    def __neg__(self): return Polynomial({k: -v for k, v in self.terms.items()})
    def __sub__(self, other): return self + -other

    def __mul__(self, other):
        terms = {}
        for a, x in self.terms.items():
            for b, y in other.terms.items():
                powers = dict(a)
                for variable, power in b: powers[variable] = powers.get(variable, 0) + power
                key = tuple(sorted((v, p) for v, p in powers.items() if p))
                terms[key] = terms.get(key, 0) + x*y
        return Polynomial(terms)

    def __truediv__(self, other):
        if len(other.terms) != 1: raise ValueError("Divisor precisa ser um monômio não nulo")
        (key, coefficient), = other.terms.items()
        return self * Polynomial({tuple((v, -p) for v, p in key): 1/coefficient})

    def __pow__(self, power):
        n = power.scalar()
        if n.denominator != 1 or abs(n) > 12: raise ValueError("Expoente não permitido")
        if n < 0: return Polynomial(1)/(self ** Polynomial(-n))
        result = Polynomial(1)
        for _ in range(int(n)): result = result*self
        return result

    def scalar(self):
        if not self.terms: return Fraction(0)
        if set(self.terms) != {()}: raise ValueError("Resultado não constante")
        return self.terms[()]

    def __eq__(self, other): return self.terms == other.terms

    def tex(self):
        if not self.terms: return "0"
        parts = []
        for powers, value in sorted(self.terms.items(), key=lambda pair: (-sum(p for _, p in pair[0]), pair[0])):
            sign = "-" if value < 0 else "+"
            value = abs(value)
            numerator = str(value.numerator) if value.numerator != 1 or not powers else ""
            denominator = str(value.denominator) if value.denominator != 1 else ""
            for variable, power in powers:
                factor = variable + ("^{" + str(abs(power)) + "}" if abs(power) != 1 else "")
                if power > 0: numerator += factor
                else: denominator += factor
            body = (r"\frac{" + (numerator or "1") + "}{" + denominator + "}") if denominator else numerator
            parts.append((sign if parts or sign == "-" else "") + body)
        return "".join(parts)


def expression_from_tex(tex):
    """Transforma o subconjunto TeX da captura em uma expressão aritmética."""
    def group(text, pos):
        while pos < len(text) and text[pos].isspace(): pos += 1
        if text[pos] != "{": raise ValueError("Grupo TeX esperado")
        depth, start = 1, pos+1
        pos += 1
        while depth:
            if text[pos] == "{": depth += 1
            if text[pos] == "}": depth -= 1
            pos += 1
        return text[start:pos-1], pos
    tex = tex.replace(r"\$", "").replace(r"\left", "").replace(r"\right", "")
    while r"\frac" in tex:
        start = tex.index(r"\frac")
        a, pos = group(tex, start+5)
        b, end = group(tex, pos)
        tex = tex[:start] + "(("+expression_from_tex(a)+")/("+expression_from_tex(b)+"))" + tex[end:]
    while r"\sqrt" in tex:
        start = tex.index(r"\sqrt")
        a, end = group(tex, start+5)
        tex = tex[:start] + "sqrt("+expression_from_tex(a)+")" + tex[end:]
    tex = re.sub(r"\\(?:cdot|times)\s*", "*", tex)
    tex = re.sub(r"\\div\s*", "/", tex)
    tex = tex.replace("{", "(").replace("}", ")").replace("[", "(").replace("]", ")").replace("^", "**")
    tex = re.sub(r"\s+", "", tex).rstrip(".,:;")
    # Cada par de barras delimita um módulo (não há módulos aninhados no lote).
    while "|" in tex:
        a, b = tex.index("|"), tex.index("|", tex.index("|")+1)
        tex = tex[:a] + "abs(" + tex[a+1:b] + ")" + tex[b+1:]
    tokens = re.findall(r"sqrt|abs|\d+(?:\.\d+)?|[a-z]|\*\*|[-+*/()]", tex)
    if "".join(tokens) != tex: raise ValueError("Notação não suportada: "+tex)
    output = []
    for token in tokens:
        if output:
            previous = output[-1]
            left = previous == ")" or previous[-1:].isdigit() or re.fullmatch("[a-z]", previous)
            right = token == "(" or token in ("abs", "sqrt") or token[0].isdigit() or re.fullmatch("[a-z]", token)
            if left and right: output.append("*")
        output.append(token)
    return "".join(output)


def calculate(tex, values=None):
    expression = expression_from_tex(tex)
    tree = ast.parse(expression, mode="eval")
    trace = []
    def visit(node):
        if isinstance(node, ast.Constant) and type(node.value) in (int, float):
            return Polynomial(Fraction(ast.get_source_segment(expression, node)))
        if isinstance(node, ast.Name) and re.fullmatch("[a-z]", node.id):
            return Polynomial(values[node.id]) if values and node.id in values else Polynomial.variable(node.id)
        if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.USub, ast.UAdd)):
            value = visit(node.operand)
            return -value if isinstance(node.op, ast.USub) else value
        if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id in ("abs", "sqrt") and len(node.args) == 1:
            value = visit(node.args[0]).scalar()
            if node.func.id == "abs": result = Polynomial(abs(value))
            else:
                from math import isqrt
                if value < 0: raise ValueError("Não existe raiz real")
                a, b = isqrt(value.numerator), isqrt(value.denominator)
                if a*a != value.numerator or b*b != value.denominator: raise ValueError("Raiz não racional")
                result = Polynomial(Fraction(a,b))
            trace.append(node.func.id + r"\left(" + fraction_tex(value) + r"\right)=" + result.tex())
            return result
        if isinstance(node, ast.BinOp):
            left, right = visit(node.left), visit(node.right)
            operations = {ast.Add: ("+", lambda: left+right), ast.Sub: ("-", lambda: left-right),
                          ast.Mult: (r"\cdot", lambda: left*right), ast.Div: (r"\div", lambda: left/right),
                          ast.Pow: ("^", lambda: left**right)}
            if type(node.op) not in operations: raise ValueError("Operação não permitida")
            symbol, operation = operations[type(node.op)]
            result = operation()
            step = (r"\left("+left.tex()+r"\right)"+"^{"+right.tex()+"}" if symbol == "^" else
                    r"\left("+left.tex()+r"\right)"+symbol+r"\left("+right.tex()+r"\right)")
            meaningful = True
            if symbol in ("+","-"):
                meaningful = bool(set(left.terms) & set(right.terms))
                if symbol=="-" and len(right.terms)>1: meaningful=True
            if symbol == r"\cdot":
                # O produto por uma variável unitária só introduz a notação 4y.
                def unit_variable(poly):
                    return len(poly.terms)==1 and next(iter(poly.terms)) and next(iter(poly.terms.values()))==1
                if (set(left.terms)=={()} and unit_variable(right)) or (set(right.terms)=={()} and unit_variable(left)):
                    meaningful=False
                expanded = None
                if len(right.terms)>1 and len(left.terms)==1:
                    expanded = "+".join(r"\left("+left.tex()+r"\right)\cdot\left("+Polynomial({key:value}).tex()+r"\right)" for key,value in right.terms.items())
                elif len(left.terms)>1 and len(right.terms)==1:
                    expanded = "+".join(r"\left("+Polynomial({key:value}).tex()+r"\right)\cdot\left("+right.tex()+r"\right)" for key,value in left.terms.items())
                if expanded: step += "=" + expanded
            if meaningful: trace.append(step + "=" + result.tex())
            return result
        raise ValueError("Árvore não permitida")
    result = visit(tree.body)
    trace = [t.replace("abs", r"\operatorname{abs}").replace("sqrt", r"\operatorname{raiz}") for t in trace]
    return result, trace


def fraction_tex(value):
    return Polynomial(value).tex()


def local_tex(tex):
    """Vírgulas decimais e porcentagens para apresentação em português."""
    tex = re.sub(r"(?<=\d)\.(?=\d)", "{,}", tex)
    return re.sub(r"(?<!\\)%", r"\\%", tex).replace("___", r"\;\_\;")


def decimal_tex(tex):
    """Apresenta coeficientes decimais finitos sem arredondamento."""
    from decimal import Decimal
    def replace(match):
        numerator, variables, denominator = match.groups()
        d = int(denominator)
        for factor in (2, 5):
            while d % factor == 0: d //= factor
        if d != 1: return match.group(0)
        coefficient = format(Decimal(numerator or "1")/Decimal(denominator), "f")
        return coefficient + variables
    return re.sub(r"\\frac\{(\d*)([a-z]*)\}\{(\d+)\}", replace, tex)
