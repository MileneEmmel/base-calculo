# Referência completa: Intermediate Algebra 2e — revisão do capítulo 1

Concluída em 25/10/2026. Referência: [OpenStax, Intermediate Algebra 2e, Chapter 1 Review Exercises](https://openstax.org/books/intermediate-algebra-2e/pages/1-review-exercises), de Lynn Marecek e Andrea Honeycutt Mathis. Licença do conteúdo e das traduções/adaptações: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

## Cobertura

- Foram incluídos **todos os 81 exercícios numerados de 385 a 465 dessa seção**. O lote não corresponde ao livro inteiro: capítulos, testes e outras seções continuam como referências para próximas importações.
- 386, 388 e 393 já existiam como MB-002, MB-001 e MB-003. Seus IDs foram preservados, mantendo os registros de conclusão do navegador.
- Os outros **78 exercícios** foram publicados como MB-009 a MB-086. A ordem desse novo intervalo de IDs acompanha a numeração original, pulando os três exercícios já existentes.
- O acervo passou de 24 para **102 questões**, com **32 tópicos** e as mesmas 13 referências documentais. A obra Intermediate Algebra 2e passa a contribuir com 82 questões: 81 da seção importada e uma já existente da revisão do capítulo 6.
- Subitens (a), (b), etc. permanecem na mesma questão; não foram contados como exercícios separados.

## Classificação

Quatro tópicos foram criados em Matemática Básica e conectados ao Mapa de conceitos:

| Tópico novo | Motivo |
|---|---|
| Divisibilidade, múltiplos e divisores | Critérios de divisibilidade, fatores primos e MMC têm objetivos diferentes da fatoração algébrica. MB-002 foi reclassificada neste tópico. |
| Frações e números decimais | Reúne operações, simplificações, dízimas e arredondamento, facilitando a seleção desse conjunto de exercícios. |
| Módulo e valor absoluto | Comparações e operações com módulo merecem identificação própria. |
| Propriedades dos números reais | Distingue comutatividade, associatividade, identidade, opostos, inversos e divisão por zero. |

Os demais exercícios foram associados a Operações numéricas, Expressões algébricas, Potenciação e radiciação, Conjuntos numéricos ou Razão, proporção e porcentagem, conforme o objetivo principal.

## Adaptações registradas

- Todos os novos exercícios têm tradução, dica, gabarito, resolução elaborada para o projeto, número original e crédito de licença. Não foram copiados manuais de soluções restritos a professores.
- 396: as moedas foram descritas por seus valores em centavos, sem converter o valor monetário nem alterar a relação entre quantidades.
- 415: foi mantida a diferença em graus na escala do enunciado; não se presumiu uma conversão para Celsius.
- 417 e 419: a restrição y ≠ 0 foi explicitada no enunciado e na resolução.
- 438: o pedido de arredondamento ao centavo foi explicitado. A resolução informa o quociente exato 2367/52 e o valor monetário arredondado $45,52.
- 447: foi explicitado o universo real. A raiz de −121 não tem valor real; isso não foi tratado como √121 nem como uma questão introdutória de complexos.
- 448: “whole numbers” foi traduzido como inteiros não negativos, incluindo zero. As reticências sozinhas não permitem concluir que um decimal é irracional; a hipótese de expansão infinita não periódica foi explicitada e a ressalva consta da resolução.
- 449 e 450: há esboço proporcional da reta na resolução. No 449, foi acrescentada a ordenação dos pontos para complementar o desenho. As frações mistas negativas foram interpretadas com o sinal aplicado ao número misto inteiro.
- 456 e 457: a distinção entre zero dividido por número não nulo e divisão por zero foi mantida.

## Navegação por referência

O filtro **Referência** do Banco de questões permite selecionar esta seção completa. Com uma referência selecionada, a ordenação e as setas usam o número do exercício original, inclusive ao atravessar os três IDs antigos. Módulo, tópico, dificuldade e busca podem ser combinados com a referência, e todos os filtros ficam no endereço.

Link local: `#/questoes?fonte=src-intermediate-algebra-ch1`.

## Reprodução da importação e verificação

Revisão posterior dos 81 itens: [registro de conferência de enunciados, fontes, dicas e respostas](REVISAO_IA2_CAP1.md). Ela corrigiu a transcrição e o gabarito de 397(a), além de esclarecer a dica de 431.

A curadoria fica em `scripts/ia2_ch1_review_content.py`. Com Python 3.12+, `python scripts/import_ia2_ch1_review.py` incorpora o lote sem acesso à rede, preserva os itens antigos e rejeita colisões de IDs; repetir a importação não duplica exercícios. Depois, `python scripts/build_database.py` regenera SQLite e JSON. A geração do banco rejeita também duplicações de referência + localizador.

Verificações: cobertura exata 385–465, subitens, aritmética racional, decimais com arredondamento exato, amostragens racionais das simplificações algébricas, restrições de domínio, posições nas retas, compatibilidade do acervo inicial, renderização de todas as expressões por KaTeX e navegação do filtro por referência. A cobertura documental foi confrontada com a seção oficial; os testes locais não fazem nova consulta à web.
