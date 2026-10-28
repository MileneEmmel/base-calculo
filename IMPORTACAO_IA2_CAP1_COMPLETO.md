# Capítulo 1 — listas e Try It completos

**Situação de publicação atual:** a importação completa descrita abaixo permanece preservada entre o banco e o arquivo. A política posterior limita o site a 15 questões por tópico/dificuldade; veja [LIMITES_QUESTOES.md](LIMITES_QUESTOES.md). O filtro do capítulo mostra apenas os itens ativos e não usa mais a indicação “completo”.

Concluído em 25/10/2026. Obra: **Intermediate Algebra 2e**, Lynn Marecek e Andrea Honeycutt Mathis, OpenStax, 2ª edição. Conteúdo e traduções/adaptações: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), com atribuição, uso não comercial e compartilhamento pela mesma licença.

## Cobertura

| Parte da obra | Numeração | Quantidade |
|---|---|---:|
| [1.1 Linguagem da álgebra](https://openstax.org/books/intermediate-algebra-2e/pages/1-1-use-the-language-of-algebra) | 1–58 | 58 |
| [1.2 Números inteiros](https://openstax.org/books/intermediate-algebra-2e/pages/1-2-integers) | 59–142 | 84 |
| [1.3 Frações](https://openstax.org/books/intermediate-algebra-2e/pages/1-3-fractions) | 143–238 | 96 |
| [1.4 Decimais](https://openstax.org/books/intermediate-algebra-2e/pages/1-4-decimals) | 239–312 | 74 |
| [1.5 Propriedades dos números reais](https://openstax.org/books/intermediate-algebra-2e/pages/1-5-properties-of-real-numbers) | 313–384 | 72 |
| [Revisão](https://openstax.org/books/intermediate-algebra-2e/pages/1-review-exercises) | 385–465 | 81 |
| [Teste de prática](https://openstax.org/books/intermediate-algebra-2e/pages/1-practice-test) | 466–495 | 30 |
| Try It intercalados nas seções 1.1–1.5 | 1.1–1.112 | 112 |
| **Total do capítulo** | **495 das listas + 112 Try It** | **607** |

Esta etapa acrescentou **526 questões**, preservando integralmente as 81 da revisão e seus IDs. O acervo tem agora **628 questões**, 32 tópicos e 19 referências de seções. Subitens continuam agrupados no exercício original.

O escopo inclui as listas de exercícios, as questões discursivas, a revisão, o teste e todos os blocos “Try It” intercalados na teoria. Exemplos já resolvidos e checklists de autoavaliação não foram transformados em questões do banco.

Não foi necessário criar tópicos novos: os conteúdos se encaixam nos tópicos existentes de Matemática Básica. As listas receberam IDs IA2-1-001 a IA2-1-384 e IA2-1-466 a IA2-1-495; os Try It usam IA2-1-T001 a IA2-1-T112. Todos preservam a numeração de origem.

## Uso no site

No filtro **Referência**, selecione **Intermediate Algebra 2e — Capítulo 1 completo**. As 607 questões seguem a sequência das seções: Try It de cada seção, sua lista, revisão e teste. Cada família mantém a numeração original. As setas, a busca e os filtros de tópico e dificuldade usam o mesmo conjunto; recarregar a página mantém a seleção.

Cada seção também pode ser filtrada individualmente, e cada questão exibe autoria, seção, número original, licença e link da fonte. Questões discursivas trazem respostas-modelo; localizações na reta têm desenho proporcional na resolução.

Endereço local: #/questoes?fonte=group-ia2-ch1.

## Revisão e adaptações

- Os cálculos foram feitos com frações exatas; as operações com decimais mantêm valores exatos e apresentam vírgula decimal. As resoluções incluem operações intermediárias e expansão da distributiva.
- A conferência automática usa também um leitor independente da árvore MathML original, além da comparação das respostas algébricas compatíveis com o [gabarito público de exercícios ímpares](https://openstax.org/books/intermediate-algebra-2e/pages/chapter-1). Os pares foram calculados sem usar o manual restrito a professores.
- 338: o original escreve x ≠ 1/6, embora o divisor seja y−1/6. Foi corrigido para **y ≠ 1/6**, com nota explícita de adaptação.
- 269 e 270: pedido de arredondamento ao centavo explicitado. As resoluções informam também a fração exata.
- 297: a não periodicidade do decimal infinito é uma hipótese explícita. Reticências isoladas não provam irracionalidade.
- 147–150, 159–160, 163–164, 171–172 e 215–216: restrições dos denominadores e divisores originais explicitadas, inclusive quando uma variável desaparece na simplificação.
- 490: universo real explicitado; √(−121) não tem valor real.
- Try It 1.53 e 1.54: preservadas as restrições de ambas as variáveis dos divisores originais, inclusive das variáveis canceladas.
- Try It 1.84: hipótese explícita de expansão infinita não periódica.
- Try It 1.87 e 1.88: os desenhos foram recalculados pelos valores −0,25 e −0,75 do enunciado; não foram copiadas as descrições inconsistentes de imagens do gabarito público.
- 301–308 e 473: preservada a notação original dos enunciados. Na resolução, números mistos e decimais podem ser apresentados como frações equivalentes; a ordenação complementa o desenho.
- Quantidades de moedas, valores em dólares, graus e jardas foram preservados; não houve conversão monetária nem de escalas.
- A obra repete alguns enunciados entre listas e teste. Repetições legítimas têm ligação editorial explícita ao primeiro registro; a combinação seção + número original continua única.

## Manutenção

A captura oficial está em database/sources/ia2-ch1, com HTML de origem, textos extraídos, MathML e gabarito público, inclusive para os 112 Try It. Os scripts de curadoria e importação usam a captura local e não acessam a rede.

1. Para incorporar novamente o lote: python scripts/import_ia2_ch1_full.py.
2. Para gerar SQLite e JSON público: python scripts/build_database.py.
3. Para validar o capítulo: python scripts/test_ia2_ch1_full.py e python scripts/test_ia2_ch1_try_it.py.
4. Para a suíte completa: python -m unittest discover -s scripts -p "test_*.py" e node --test scripts/*.test.mjs.

O importador não duplica exercícios e rejeita divergências em IDs existentes. Python 3.12+ é necessário. Apenas a atualização das capturas oficiais, via scripts/fetch_ia2_ch1.py, requer rede e lxml.

Validação final: 26 testes Python e 32 testes Node aprovados; build de produção concluído. Conferidos no navegador o filtro com 607 exercícios, abertura de questão, dicas, resoluções, reta numérica, navegação e persistência de conclusão após recarregar.
