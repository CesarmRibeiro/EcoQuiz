# 🌿 EcoQuiz — Jogo Web Interativo

> **Projeto A3 — Engenharia de Software**  
> Desenvolvimento de Jogo Web Interativo com React, Bootstrap e Heurísticas de Nielsen  
> **Tema:** ODS 4 — Educação de Qualidade

---

## 📋 Descrição

O **EcoQuiz** é uma aplicação web SPA (Single Page Application) desenvolvida em **React 18** com **Bootstrap 5**, que propõe um quiz interativo sobre o **ODS 4 — Educação de Qualidade** da ONU. O jogo foi construído aplicando os princípios de usabilidade de **Jakob Nielsen**.

---

## 👨‍💻 Integrantes do Grupo

| Nome                    | Curso                  |
|-------------------------|------------------------|
| Vinicius Iandoli Diogo  | Engenharia de Software |
| César Melo Ribeiro      | Engenharia de Software |
| Julia Leite Venancio    | Engenharia de Software |
| Kaue Lucas da Silva     | Engenharia de Software |

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** v16+ instalado ([nodejs.org](https://nodejs.org))
- **npm** v8+ (já vem com o Node.js)

### Passo a Passo

```bash
# 1. Clone ou extraia o projeto
# 2. Acesse a pasta do projeto
cd ecoquiz

# 3. Instale as dependências com npm
npm install

# 4. Inicie o servidor de desenvolvimento com npx
npx react-scripts start
# ou simplesmente:
npm start

# 5. Acesse no navegador
# http://localhost:3000
```

### Build de Produção

```bash
npm run build
```

---

## 📁 Estrutura do Projeto

```
ecoquiz/
├── public/
│   ├── index.html          # HTML base da SPA
│   └── questions.json      # Banco de perguntas (servido via HTTP)
├── src/
│   ├── index.js            # Entry point React
│   ├── index.css           # Estilos globais + variáveis CSS
│   ├── App.js              # Componente raiz — controla telas
│   ├── App.test.js         # Testes unitários
│   └── components/
│       ├── HomeScreen.js   # Tela inicial (form de nome)
│       ├── HomeScreen.css
│       ├── QuizScreen.js   # Tela do quiz (perguntas + timer)
│       ├── QuizScreen.css
│       ├── ResultScreen.js # Tela de resultados
│       ├── ResultScreen.css
│       ├── OpcaoResposta.js # Botão de resposta com estados visuais
│       ├── OpcaoResposta.css
│       ├── Timer.js         # Cronômetro circular SVG
│       ├── Timer.css
│       └── ProgressBar.js   # Barra de progresso (pergunta X/10)
├── package.json
├── .gitignore
└── README.md
```

---

## ⚛️ Requisitos Técnicos Atendidos

| Requisito                        | Implementação                                                           |
|----------------------------------|-------------------------------------------------------------------------|
| **React + JSX**                  | Todos os componentes usam JSX                                           |
| **3+ Componentes React**         | HomeScreen, QuizScreen, ResultScreen, OpcaoResposta, Timer, ProgressBar |
| **Props**                        | `jogador`, `onFinalizar`, `onSair`, `resultado`, `resetKey`, etc.       |
| **Eventos**                      | `onClick`, `onChange`, `onSubmit`, `onMouseEnter`                       |
| **Listas com .map()**            | Renderização das opções de resposta e histórico                         |
| **useState**                     | Nome, score, pergunta atual, estado do quiz, opção escolhida            |
| **useEffect**                    | Requisição HTTP, cronômetro, reset de estado                            |
| **useCallback / useMemo**        | Otimizações de performance nos handlers e classificação                 |
| **Requisição HTTP (axios)**      | `axios.get('/questions.json')` com tratamento de erro                   |
| **Bootstrap 5**                  | Grid, botões, progress bar, badges, alertas, responsivo                 |
| **NodeJS + npm + npx**           | `npm install` + `npx react-scripts start`                               |

---

## 🎯 Heurísticas de Nielsen Aplicadas

| # | Heurística                       | Onde é aplicada                                                            |
|---|----------------------------------|----------------------------------------------------------------------------|
| H1 | **Visibilidade do status**      | Timer regressivo, barra de progresso, score em tempo real, feedback pós-resposta |
| H2 | **Controle e liberdade**        | Botão "Sair" no quiz, botão "Jogar Novamente" nos resultados               |
| H5 | **Prevenção de erros**          | Validação do nome (mínimo 2 chars), botões desabilitados após resposta, fallback de erro HTTP |
| H6 | **Reconhecimento vs memorização** | Letras A/B/C/D visíveis em cada opção, ações claras e rotuladas          |
| H8 | **Estética e design minimalista** | Layout limpo, paleta reduzida (3 cores), sem elementos desnecessários     |

---

## 🌱 ODS 4 — Educação de Qualidade

Este jogo é temático ao **Objetivo de Desenvolvimento Sustentável 4** da Agenda 2030 da ONU:
> *"Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todas e todos."*

Referência: [brasil.un.org/pt-br/sdgs/4](https://brasil.un.org/pt-br/sdgs/4)

---

## 🛠️ Tecnologias Utilizadas

- [React 18](https://react.dev)
- [Bootstrap 5.3](https://getbootstrap.com)
- [Axios 1.x](https://axios-http.com)
- [Node.js 18+](https://nodejs.org)
- [react-scripts (CRA)](https://create-react-app.dev)

---

## 📜 Licença

Projeto acadêmico — uso livre para fins educacionais.
