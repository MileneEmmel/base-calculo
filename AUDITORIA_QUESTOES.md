# Revisão do acervo — 25/10/2026

Este documento registra a auditoria das **24 questões iniciais**. A expansão posterior completou uma das referências e levou o acervo a 102 questões; a revisão desse lote está em [IMPORTACAO_IA2_CAP1.md](IMPORTACAO_IA2_CAP1.md).

Foram conferidas as 24 questões publicadas: enunciado, gabarito, alternativas, dica, resolução, exercício original, autoria e licença nas páginas oficiais. A revisão matemática foi feita por recálculo independente; `scripts/test_question_audit.py` registra verificações aritméticas, algébricas e numéricas de regressão. Esses testes locais não substituem a consulta documental das fontes realizada nesta data.

## Resultado

Os 24 gabaritos iniciais estão corretos. Após as correções bibliográficas descritas abaixo, os enunciados correspondem aos exercícios indicados. Esta auditoria inicial não acrescentou questões; a expansão posterior é documentada separadamente.

| ID | Resultado conferido | Fonte e localização |
|---|---|---|
| MB-001 | 20, respeitando parênteses e precedência | [Intermediate Algebra 2e, cap. 1, revisão, 388][ia1] |
| MB-002 | 252 = 2²·3²·7 | [Intermediate Algebra 2e, cap. 1, revisão, 386][ia1] |
| MB-003 | 6x² − x + 5 | [Intermediate Algebra 2e, cap. 1, revisão, 393][ia1] |
| MB-004 | x = 5 | [College Algebra 2e, cap. 2, revisão, 12][ca2] |
| MB-005 | Distância = 6√2 | [College Algebra 2e, cap. 2, revisão, 5][ca2] |
| MB-006 | (x − 5)(x + 2) | [Intermediate Algebra 2e, cap. 6, revisão, 358][ia6] |
| MB-007 | (x, y) = (−2, 3); satisfaz ambas as equações | [College Algebra 2e, cap. 7, revisão, 3][ca7] |
| MB-008 | x = −1/2 ou x = 4 | [College Algebra 2e, cap. 2, revisão, 40][ca2] |
| PC-001 | Não é função: entrada 7 tem duas saídas; alternativa B | [Precalculus 2e, seção 1.1, 62][pc11] |
| PC-002 | 8, 6, 4, 2, 0, na ordem solicitada | [Precalculus 2e, seção 1.1, 68][pc11] |
| PC-003 | y = −3x + 26; passa pelos dois pontos | [Precalculus 2e, cap. 2, revisão, 5][pc2] |
| PC-004 | Reais exceto −2 e 4 | [Precalculus 2e, seção 3.7, 8][pc37] |
| PC-005 | g(2) = 11; f(11) = 243 | [Precalculus 2e, seção 1.4, 76][pc14] |
| PC-006 | (x − 2)² − 9; vértice (2, −9); interceptos (−1, 0), (5, 0), (0, −5) | [College Algebra 2e, cap. 5, revisão, 1][ca5] |
| PC-007 | 205·1,13⁶ ≈ 426,800; arredondamento: 427 | [Precalculus 2e, cap. 4, revisão, 2][pc4] |
| PC-008 | Decaimento exponencial; alternativa B | [Precalculus 2e, cap. 4, revisão, 1][pc4] |
| C1-001 | Limite = 5; cancelamento válido para x ≠ 2 | [Calculus Volume 1, cap. 2, revisão, 213][c2] |
| C1-002 | Limite = 5/2 | [Calculus Volume 1, cap. 2, revisão, 218][c2] |
| C1-003 | c = −1: os limites laterais e f(−1) valem zero | [Calculus Volume 1, cap. 2, revisão, 227][c2] |
| C1-004 | f′(x) = 9x² + 8/x³, para x ≠ 0 | [Calculus Volume 1, cap. 3, revisão, 373][c3] |
| C1-005 | f′(x) = −6x(4 − x²)² | [Calculus Volume 1, cap. 3, revisão, 374][c3] |
| C1-006 | Ponto (1, e); inclinação e + 2; y − e = (e + 2)(x − 1) | [Calculus Volume 1, cap. 3, revisão, 385][c3] |
| C1-007 | Integral = 9/2, área de triângulo de base e altura 3 | [Calculus Volume 1, seção 5.2, 76][c52] |
| C1-008 | Integral = 2π, área da metade superior do disco de raio 2 | [Calculus Volume 1, seção 5.2, 80][c52] |

## Correções aplicadas

- MB-001, MB-002 e MB-003 estavam atribuídas a **Prealgebra 2e**. Os exercícios 388, 386 e 393 são, de fato, de **Intermediate Algebra 2e**, capítulo 1. Foram corrigidos título, URL, referência interna e autores. A resposta anterior sobre a procedência reproduzia o cadastro antigo e estava incorreta nesses três itens.
- A autoria principal de Intermediate Algebra 2e é **Lynn Marecek e Andrea Honeycutt Mathis**, conforme o [prefácio oficial](https://openstax.org/books/intermediate-algebra-2e/pages/preface). Foi corrigida também a referência do capítulo 6.
- As três referências de Calculus Volume 1 estavam com CC BY 4.0. As páginas atuais consultadas declaram **CC BY-NC-SA 4.0**; o banco e a exportação passaram a registrar essa licença. Não foi presumida a existência de uma cópia histórica do conteúdo sob outra licença.
- MB-007: substituída a nota incorreta sobre “formato matricial” por adaptação da apresentação do sistema.
- PC-006 e C1-003: explicitado que o pedido de desenho do gráfico do original não foi reproduzido na adaptação.
- C1-004: explicitado o domínio x ≠ 0 na resolução.
- PC-007: removida a tolerância de ±1 no dado do gabarito, pois o enunciado exige o inteiro mais próximo, que é 427. Não existe correção automática de respostas numéricas na interface atual.
- Datas de consulta das fontes atualizadas; IDs das questões preservados para manter o histórico do navegador.

## Reutilização

As quatro obras utilizadas atualmente são Intermediate Algebra 2e (4 questões), College Algebra 2e (5), Precalculus 2e (7) e Calculus Volume 1 (8), da OpenStax/Rice University.

As páginas oficiais consultadas permitem compartilhar, traduzir e adaptar conteúdo sob **CC BY-NC-SA 4.0**, observadas atribuição, uso não comercial e compartilhamento das adaptações sob a mesma licença. Não se trata de domínio público, nem de autorização irrestrita para exploração comercial. [Política oficial da OpenStax](https://help.openstax.org/s/article/Licensing-information-of-OpenStax-textbooks), [termos da licença](https://creativecommons.org/licenses/by-nc-sa/4.0/).

As páginas de questões agora exibem autores, origem, nota de alterações, link da licença e o crédito de acesso gratuito ao livro. A lista de exercícios e a prévia da página inicial também exibem os créditos das obras que aparecem naquela tela. Isso segue a orientação de [atribuição da OpenStax](https://help.openstax.org/s/article/Citing-OpenStax-texts).

O licenciamento das traduções/adaptações dos exercícios não foi aplicado de forma genérica ao código da aplicação. Marcas e logotipos não foram importados. Para uso comercial do conteúdo da edição atual, a OpenStax indica seu formulário de autorização. As condições consultadas não constituem garantia sobre todo e qualquer modelo futuro de uso.

[ia1]: https://openstax.org/books/intermediate-algebra-2e/pages/1-review-exercises
[ia6]: https://openstax.org/books/intermediate-algebra-2e/pages/6-review-exercises
[ca2]: https://openstax.org/books/college-algebra-2e/pages/2-review-exercises
[ca5]: https://openstax.org/books/college-algebra-2e/pages/5-review-exercises
[ca7]: https://openstax.org/books/college-algebra-2e/pages/7-review-exercises
[pc11]: https://openstax.org/books/precalculus-2e/pages/1-1-functions-and-function-notation
[pc14]: https://openstax.org/books/precalculus-2e/pages/1-4-composition-of-functions
[pc2]: https://openstax.org/books/precalculus-2e/pages/2-review-exercises
[pc37]: https://openstax.org/books/precalculus-2e/pages/3-7-rational-functions
[pc4]: https://openstax.org/books/precalculus-2e/pages/4-review-exercises
[c2]: https://openstax.org/books/calculus-volume-1/pages/2-review-exercises
[c3]: https://openstax.org/books/calculus-volume-1/pages/3-review-exercises
[c52]: https://openstax.org/books/calculus-volume-1/pages/5-2-the-definite-integral
