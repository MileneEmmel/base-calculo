# Banco de questões

O banco editorial usa SQLite e é gerado a partir do arquivo `seeds/pilot_questions.json`.
Não é necessário instalar um servidor de banco de dados.

## Gerar e validar

```powershell
python scripts/build_database.py
```

O comando cria:

- `database/questions.sqlite`: banco editorial;
- `public/data/questions.json`: dados que serão carregados pelo site estático.

O script usa somente a biblioteca padrão do Python. Cada questão deve possuir uma fonte,
um localizador dentro da obra e uma nota informando que houve tradução ou adaptação.

## Importação por referência

Política atual: no máximo 15 publicadas por tópico/dificuldade. São **1.155 questões ativas e 410 preservadas** em archives/excess_questions.json. A ampliação dos capítulos 2–12 acrescentou 937 questões, sem escrever no arquivo de excedentes. Veja AMPLIACAO_IA2_LIVRO.md e LIMITES_QUESTOES.md na raiz.

Para reaplicar a seleção revisada: python scripts/import_ia2_book.py e depois python scripts/build_database.py. O importador é idempotente, verifica o hash do arquivo de excedentes e rejeita qualquer lote que exceda as vagas. O snapshot editorial está em seeds/ia2_book_selected.json; somente as questões publicadas são exportadas ao site.

As descrições dos importadores antigos abaixo registram o lote histórico de 628 questões, anterior à ampliação. Não é necessário executá-los para manter o lote novo.

O capítulo 1 foi integralmente importado: 495 exercícios das listas, revisão e teste, mais 112 Try It, entre ativos e arquivados. O importador python scripts/import_ia2_ch1_full.py acrescentou 526 questões às 81 da revisão, preservando os IDs antigos. Esse lote somava 628 questões com as demais fontes. O lote é idempotente e usa capturas oficiais locais, sem rede; veja IMPORTACAO_IA2_CAP1_COMPLETO.md na raiz. Repetições intencionais entre seções precisam indicar o primeiro registro em intentional_repeat_of; uma mesma fonte + localizador continua proibida.

O lote de revisão do capítulo 1 de Intermediate Algebra 2e cobre os exercícios 385–465. Com Python 3.12+, execute `python scripts/import_ia2_ch1_review.py` e depois regenere o banco. O importador preserva os três exercícios antigos, rejeita colisões de IDs e não duplica dados ao ser repetido. A curadoria está em `scripts/ia2_ch1_review_content.py` e a documentação de cobertura em `IMPORTACAO_IA2_CAP1.md` na raiz do projeto.

O JSON público inclui `source_id`, usado pelo filtro Referência. A combinação fonte + localizador é validada para impedir que o mesmo exercício de origem seja cadastrado duas vezes. Um exercício com vários subitens é mantido numa única questão.

