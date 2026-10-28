# Revisão das questões importadas — 25/10/2026

Escopo: os **81 exercícios 385–465** de Intermediate Algebra 2e, capítulo 1, Review Exercises. Inclui os três itens reaproveitados MB-001, MB-002 e MB-003. Não houve importação de outra referência nesta revisão.

## Evidências e método

- Enunciados e numeração confrontados com a [seção oficial da OpenStax](https://openstax.org/books/intermediate-algebra-2e/pages/1-review-exercises).
- Respostas ímpares comparadas ao [Answer Key público, seção Review Exercises](https://openstax.org/books/intermediate-algebra-2e/pages/chapter-1). O gabarito público não cobre os pares; estes foram recalculados a partir dos enunciados.
- Dicas e resoluções lidas em conjunto com cada enunciado. Operações conferidas com inteiros, frações exatas e Decimal; simplificações algébricas também verificadas por substituições racionais.
- Autoria conferida: Lynn Marecek e Andrea Honeycutt Mathis, OpenStax, Intermediate Algebra 2e. Localizadores mantêm capítulo, seção e número original. Dicas e resoluções são elaboradas para o ∫NTEGRA, identificadas como adaptação.
- A página oficial informa CC BY-NC-SA 4.0; a referência cadastrada e os créditos usam essa licença. As condições de atribuição, uso não comercial e compartilhamento pela mesma licença continuam aplicáveis.

## Correções realizadas

| Questão | Constatação | Correção |
|---|---|---|
| MB-018 / 397(a) | A transcrição omitia o sinal de menos antes do módulo do lado direito, mudando a pergunta original. Enunciado e resposta estavam coerentes entre si, mas divergiam da fonte. | Restaurado o lado direito −\|−7\|. Ambos os lados valem −7; resposta corrigida de < para =. Resolução explica os dois sinais externos. |
| MB-052 / 431 | A dica “mantenha o sinal do maior deles” era ambígua ao se referir aos módulos. | Agora orienta a subtrair o menor módulo do maior e usar o sinal do **termo** de maior módulo. Resultado 6,17 preservado. |

A correção foi aplicada à curadoria, ao seed, ao SQLite e ao JSON consumido pela interface. IDs e registros de conclusão foram preservados.

## Cobertura editorial

| Exercícios | Conferência |
|---|---|
| 385–389 | Divisibilidade, fatoração prima, MMC e prioridade das operações. |
| 390–396 | Valores substituídos, termos semelhantes e tradução das relações verbais; todos os subitens incluídos. |
| 397–410 | Sinais, módulos, parênteses, potências e operações com inteiros; 397(a) corrigido conforme acima. |
| 411–415 | Substituição de negativos, ordem da subtração e diferença de temperaturas na escala original. |
| 416–429 | Frações, operações distintas nos subitens, simplificações e restrições y ≠ 0 em 417 e 419. |
| 430–445 | Casas decimais, sinais, arredondamento, frações, dízima de período 27 e porcentagens; dica 431 esclarecida. |
| 446–450 | Raiz principal positiva, inexistência de raiz real de −121, conjuntos numéricos e posições proporcionais na reta. |
| 451–465 | Propriedades dos reais, denominadores não nulos, divisão por zero e distribuição de sinais. |

Nos outros **80 exercícios**, não foram encontradas divergências matemáticas ou de transcrição na comparação realizada. Isso inclui 431, cujo ajuste foi de clareza da dica.

## Adaptações que exigem atenção

- 438: o pedido explícito de arredondamento ao centavo é uma adaptação registrada. Valor exato 2367/52; valor arredondado $45,52.
- 448: a hipótese de expansão infinita não periódica é explícita. Reticências isoladas não permitem concluir irracionalidade. “Whole numbers” corresponde a inteiros não negativos, incluindo zero.
- 449: −1⅔ corresponde a −5/3. A ordenação acrescentada complementa o desenho solicitado pela fonte.
- 456: 0/(x−3) = 0 somente com x ≠ 3. Em 457 a divisão por zero é indefinida.

## Proteção contra regressão

O teste anterior do 397 comparava a resposta com uma expectativa também transcrita incorretamente; por isso, não detectou o erro na origem. Foi acrescentada uma verificação específica da expressão do enunciado com **ambos os sinais de menos externos**, além do recálculo e da resolução. Os testes locais não substituem a revisão da fonte e não fazem consultas à web.
