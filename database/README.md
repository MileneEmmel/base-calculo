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

