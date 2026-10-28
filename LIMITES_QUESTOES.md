# Limite de questões publicadas por tópico

## Situação atual após a varredura do livro

São **1.155 questões ativas**, sempre com até 15 por dificuldade e 60 por tópico. As **410 arquivadas** permaneceram byte a byte iguais; a ampliação acrescentou 937 questões apenas nas vagas disponíveis. O catálogo reunido tem 1.565 registros.

A tabela atual por dificuldade e os critérios da ampliação estão em [AMPLIACAO_IA2_LIVRO.md](AMPLIACAO_IA2_LIVRO.md). O novo importador scripts/import_ia2_book.py não chama save_catalog() nem escreve no arquivo de excedentes. Para este lote, use esse importador e scripts/build_database.py.

## Registro histórico da redução inicial

Aplicado em 25/10/2026: **até 15 questões de cada dificuldade por tópico**, totalizando no máximo 60. Não foram criadas questões nem alteradas dificuldades para preencher vagas.

- 218 questões permanecem no banco ativo.
- 410 questões excedentes estão em database/archives/excess_questions.json.
- O catálogo editorial completo continua com 628 questões.

## Critério de seleção

Foram mantidas as primeiras 15 questões de cada combinação de tópico e dificuldade na ordem editorial existente. Isso prioriza o acervo anterior às importações mais recentes. IDs, enunciados, alternativas, dicas, respostas, resoluções, atribuições e dificuldades foram preservados integralmente.

| Tópico | Fácil | Médio | Difícil | Desafio | Ativas |
|---|---:|---:|---:|---:|---:|
| Conjuntos numéricos | 7 | 15 | 0 | 0 | 22 |
| Operações numéricas | 15 | 8 | 0 | 0 | 23 |
| Divisibilidade, múltiplos e divisores | 15 | 1 | 0 | 0 | 16 |
| Frações e números decimais | 15 | 15 | 0 | 0 | 30 |
| Módulo e valor absoluto | 14 | 11 | 0 | 0 | 25 |
| Razão, proporção e porcentagem | 12 | 1 | 0 | 0 | 13 |
| Potenciação e radiciação | 15 | 2 | 0 | 0 | 17 |
| Propriedades dos números reais | 15 | 6 | 0 | 0 | 21 |
| Expressões algébricas | 15 | 15 | 0 | 0 | 30 |

Os demais tópicos têm menos de 15 questões por dificuldade e foram mantidos como estavam. Tópicos sem questões continuam no catálogo.

## Arquivo e recuperação

O arquivo JSON guarda as 410 questões completas, os metadados de módulos, tópicos e fontes e a ordem original de todos os 628 IDs. Ele fica fora de public/ e não é carregado pelo site. Não houve exclusão de registros do histórico do navegador: uma questão restaurada com o mesmo ID poderá recuperar sua conclusão.

O seed ativo contém apenas as 218 selecionadas; SQLite e o JSON público foram regenerados a partir dele. No filtro de referência, o capítulo 1 passa a aparecer sem a indicação “completo”, porque só sua seleção ativa é mostrada.

Para trabalhar futuramente com todo o conteúdo, scripts/question_catalog.py oferece load_catalog(), que reúne banco e arquivo na ordem original. save_catalog() reaplica o limite e salva as duas partes sem modificar os registros. Reintroduzir uma questão exige escolher uma vaga no mesmo tópico/dificuldade ou revisar explicitamente a política; não basta importar o capítulo novamente.

Os dois importadores existentes usam o catálogo completo e reaplicam a seleção. A geração do banco rejeita publicação acima de 15 por tópico/dificuldade. Executar python scripts/question_catalog.py novamente é idempotente.

## Verificação

Os testes verificam que as partes são disjuntas, a união preserva as 628 questões e sua ordem, os conteúdos não são alterados, o arquivo inclui fontes e tópicos, os limites são respeitados, as setas usam apenas as questões ativas e reimportar não recoloca excedentes no site.
