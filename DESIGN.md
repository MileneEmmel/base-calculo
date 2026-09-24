---
version: alpha
name: Base Cálculo
description: Plataforma gratuita de exercícios para estudantes que estão construindo a base necessária para Pré-Cálculo e Cálculo 1, com clareza de apostila e leveza de caderno de estudo.
colors:
  ground: "#F5F7F3"
  paper: "#FFFEFB"
  ink: "#17324D"
  muted: "#506271"
  grid: "#B9D3E2"
  signal: "#F0C84B"
  basic: "#DDF2E8"
  precalculus: "#FFF1BC"
  calculus: "#E0ECFF"
  warm: "#FFE2D6"
  correction: "#C74632"
typography:
  display:
    fontFamily: Lexend
    fontSize: clamp(2.6rem, 6vw, 5.4rem)
    fontWeight: 600
    letterSpacing: -0.055em
  body:
    fontFamily: Atkinson Hyperlegible
    fontSize: 1rem
    lineHeight: 1.65
rounded:
  sm: 10px
  md: 18px
  lg: 24px
spacing:
  sm: 0.5rem
  md: 1rem
  lg: 2rem
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: 0.8rem 1.15rem
---

## Overview

Base Cálculo é um projeto de extensão para estudantes que precisam praticar conteúdos preparatórios e Cálculo 1 sem cadastro ou barreira de pagamento. A identidade vem de objetos reais desse contexto: cadernos quadriculados, margens de correção, fichas de exercícios e marca-texto; não de uma estética genérica de aplicativo educacional.

## Colors

- **Ground (#F5F7F3):** cinza-papel frio usado como superfície dominante, sem cair no conjunto creme e terracota.
- **Paper (#FFFEFB):** superfície de fichas e exercícios.
- **Ink (#17324D):** azul de tinta para texto e ações; contraste 12.18:1 sobre o fundo.
- **Muted (#506271):** grafite azulado para texto secundário; contraste 5.86:1 sobre o fundo.
- **Grid (#B9D3E2):** linhas de caderno e separadores contextuais.
- **Signal (#F0C84B):** amarelo de marca-texto, reservado para seleção e progresso.
- **Basic (#DDF2E8):** verde suave para identificar Matemática Básica.
- **Precalculus (#FFF1BC):** amarelo claro para identificar Pré-Cálculo.
- **Calculus (#E0ECFF):** azul claro para identificar Cálculo 1.
- **Warm (#FFE2D6):** pêssego pontual para a apresentação institucional do projeto.
- **Correction (#C74632):** vermelho de correção, reservado para erro e alerta.

## Typography

Lexend dá presença clara aos títulos e remete à leitura pedagógica sem parecer infantil. Atkinson Hyperlegible é usado no corpo e nos controles por sua legibilidade. Códigos de exercícios podem usar a fonte do corpo em peso forte; monospace decorativo não faz parte do sistema.

## Layout

A página segue a lógica de uma ficha de estudo: introdução e exercício real em destaque, índice progressivo de módulos e acervo filtrável. A página de resolução mostra o enunciado sobre papel claro quadriculado, com margem vermelha; a cor do módulo aparece somente na etiqueta e na folha inferior. As seções variam de largura conforme a função em vez de repetir um único contêiner.

## Elevation & Depth

As superfícies permanecem planas. Apenas as fichas principais recebem uma sombra rígida azul-clara, simulando folhas empilhadas. Não usar sombras suaves, brilhos coloridos ou vidro.

## Shapes

Controles usam 10px de raio, cartões usam 18px e fichas principais chegam a 24px. Pílulas ficam reservadas para metadados e estados; círculos aparecem nos indicadores de dificuldade, onde comunicam quantidade.

## Components

O cabeçalho, os botões, o índice de módulos, os filtros e a ficha de questão são compartilhados entre a página inicial e a resolução. Botões nomeiam a ação sem setas anexadas. Estados de foco, seleção, conclusão, erro e carregamento permanecem visíveis.

## Do's and Don'ts

- Reutilizar estes tokens e os componentes compartilhados em todas as telas.
- Usar papel quadriculado apenas onde há matemática ou rascunho.
- Usar as cores dos módulos de forma semântica e consistente em listas e cartões. Na ficha principal da questão, reservar a cor para a etiqueta e para a folha inferior, mantendo o papel claro.
- Manter cantos visivelmente suaves, variando o raio conforme a função do elemento.
- Manter o acesso gratuito, a fonte das questões e o progresso local visíveis.
- Não usar emojis como iconografia, brilhos, órbitas decorativas ou símbolos matemáticos como adesivos.
- Não usar roxo/índigo como CTA, fundo creme com coral, etiquetas em caixa alta, setas coladas a links ou três cartões idênticos.
- Não distribuir cores aleatoriamente nem criar raios ou sombras isoladas fora deste contrato.
