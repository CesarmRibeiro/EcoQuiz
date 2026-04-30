import React, { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

// ═══════════════════════════════════════════════════════════════
// App.js — Componente raiz / controlador de telas
// Gerencia qual tela está ativa e passa dados via props
// Aplica: H2 - Controle e liberdade (usuário pode reiniciar)
// ═══════════════════════════════════════════════════════════════

const TELA = { HOME: 'home', QUIZ: 'quiz', RESULT: 'result' };

function App() {
  const [tela, setTela]         = useState(TELA.HOME);
  const [jogador, setJogador]   = useState('');
  const [resultado, setResultado] = useState(null); // { score, total, respostas }

  const iniciarJogo = (nome) => {
    setJogador(nome);
    setTela(TELA.QUIZ);
  };

  const finalizarJogo = (dados) => {
    setResultado(dados);
    setTela(TELA.RESULT);
  };

  const reiniciar = () => {
    setResultado(null);
    setTela(TELA.HOME);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {tela === TELA.HOME   && <HomeScreen onIniciar={iniciarJogo} />}
      {tela === TELA.QUIZ   && <QuizScreen jogador={jogador} onFinalizar={finalizarJogo} onSair={reiniciar} />}
      {tela === TELA.RESULT && <ResultScreen jogador={jogador} resultado={resultado} onReiniciar={reiniciar} />}
    </div>
  );
}

export default App;
