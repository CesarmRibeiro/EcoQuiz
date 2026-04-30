import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import OpcaoResposta from './OpcaoResposta';
import './QuizScreen.css';

// ═══════════════════════════════════════════════════════════════
// QuizScreen.js — Tela de Quiz
// Props: jogador (string), onFinalizar (callback), onSair (callback)
// Hooks: useState (perguntas, atual, score, estado, carregando, erro)
//        useEffect (busca HTTP via axios, controle de fluxo)
//        useCallback (handleResposta — evita recreação desnecessária)
// Heurísticas:
//   H1 – Visibilidade: progresso, timer, score em tempo real
//   H2 – Controle: botão Sair sempre disponível
//   H5 – Prevenção de erros: botões desabilitados após resposta
//   H6 – Reconhecimento: letras A/B/C/D visíveis
//   H8 – Design minimalista: apenas informações essenciais
// ═══════════════════════════════════════════════════════════════

const TEMPO_POR_PERGUNTA = 30;

function QuizScreen({ jogador, onFinalizar, onSair }) {
  const [perguntas,    setPerguntas]    = useState([]);
  const [atual,        setAtual]        = useState(0);
  const [score,        setScore]        = useState(0);
  const [respostas,    setRespostas]    = useState([]); // histórico completo
  const [estado,       setEstado]       = useState('carregando'); // carregando | jogando | respondido | erro
  const [erroHttp,     setErroHttp]     = useState('');
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);
  const [resetTimer,   setResetTimer]   = useState(0); // key para resetar o Timer

  // ── Requisição HTTP via axios (cumpre requisito do projeto) ──
  useEffect(() => {
    setEstado('carregando');
    axios.get('/questions.json')
      .then((res) => {
        // Embaralha as perguntas para variedade
        const embaralhadas = [...res.data].sort(() => Math.random() - .5);
        setPerguntas(embaralhadas);
        setEstado('jogando');
      })
      .catch((err) => {
        // H5 – Prevenção de erros: mensagem clara ao usuário
        console.error('Erro ao carregar perguntas:', err);
        setErroHttp('Não foi possível carregar as perguntas. Verifique sua conexão e tente novamente.');
        setEstado('erro');
      });
  }, []);

  const perguntaAtual = perguntas[atual];

  // ── Avança para próxima pergunta ou finaliza ──
  const avancar = useCallback((respostasAtualizadas) => {
    const proxima = atual + 1;
    if (proxima < perguntas.length) {
      setAtual(proxima);
      setOpcaoEscolhida(null);
      setEstado('jogando');
      setResetTimer((k) => k + 1);
    } else {
      onFinalizar({
        score: respostasAtualizadas.filter((r) => r.acertou).length,
        total: perguntas.length,
        respostas: respostasAtualizadas,
      });
    }
  }, [atual, perguntas.length, onFinalizar]);

  // ── Resposta selecionada ──
  const handleResposta = useCallback((indexOpcao) => {
    if (estado !== 'jogando') return;

    const acertou = indexOpcao === perguntaAtual.correta;
    const novasRespostas = [
      ...respostas,
      {
        pergunta:  perguntaAtual.pergunta,
        escolha:   perguntaAtual.opcoes[indexOpcao],
        correta:   perguntaAtual.opcoes[perguntaAtual.correta],
        acertou,
        explicacao: perguntaAtual.explicacao,
        categoria: perguntaAtual.categoria,
      }
    ];

    setOpcaoEscolhida(indexOpcao);
    if (acertou) setScore((s) => s + 1);
    setRespostas(novasRespostas);
    setEstado('respondido');

    // Avança automaticamente após 1.8s (mostra feedback)
    setTimeout(() => avancar(novasRespostas), 1800);
  }, [estado, perguntaAtual, respostas, avancar]);

  // ── Tempo esgotado ──
  const handleTempoEsgotado = useCallback(() => {
    if (estado !== 'jogando') return;
    const novasRespostas = [
      ...respostas,
      {
        pergunta:  perguntaAtual.pergunta,
        escolha:   '(Tempo esgotado)',
        correta:   perguntaAtual.opcoes[perguntaAtual.correta],
        acertou:   false,
        explicacao: perguntaAtual.explicacao,
        categoria: perguntaAtual.categoria,
      }
    ];
    setOpcaoEscolhida(-1); // -1 = nenhuma opção escolhida
    setRespostas(novasRespostas);
    setEstado('respondido');
    setTimeout(() => avancar(novasRespostas), 1800);
  }, [estado, perguntaAtual, respostas, avancar]);

  // ── Determina estado visual de cada opção ──
  const estadoOpcao = (index) => {
    if (estado !== 'respondido') return 'normal';
    if (index === perguntaAtual.correta) return 'correta';
    if (index === opcaoEscolhida)        return 'errada';
    return 'nao-selecionada';
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER: Carregando
  if (estado === 'carregando') {
    return (
      <div className="quiz-loading animate-fadeIn">
        <div className="spinner-border text-success mb-3" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
        <p style={{ color: '#388E3C', fontWeight: 600 }}>Carregando perguntas via HTTP...</p>
        <small style={{ color: '#90A4AE' }}>axios.get('/questions.json')</small>
      </div>
    );
  }

  // RENDER: Erro HTTP
  if (estado === 'erro') {
    return (
      <div className="quiz-loading animate-fadeIn">
        <div className="alert alert-danger text-center" style={{ maxWidth: 480, borderRadius: 14 }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>⚠️</div>
          <strong>Erro ao carregar as perguntas</strong>
          <p className="mt-2 mb-3" style={{ fontSize: '.9rem' }}>{erroHttp}</p>
          <button className="btn btn-eco-primary px-4" onClick={() => window.location.reload()}>
            🔄 Tentar Novamente
          </button>
          <button className="btn btn-eco-outline px-4 ms-2" onClick={onSair}>
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  if (!perguntaAtual) return null;

  // RENDER: Quiz em andamento
  return (
    <div className="quiz-wrapper animate-fadeIn">
      {/* ── Header da tela quiz ── */}
      <header className="quiz-header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            {/* Score em tempo real — H1 Visibilidade */}
            <div className="quiz-score-badge">
              <span className="quiz-score-icon">⭐</span>
              <span className="quiz-score-val">{score}</span>
              <span className="quiz-score-label">pts</span>
            </div>

            <div className="text-center">
              <span className="home-logo-text" style={{ fontSize: '1.1rem' }}>🌿 EcoQuiz</span>
            </div>

            {/* Botão Sair — H2 Controle e liberdade */}
            <button className="btn btn-eco-outline btn-sm" onClick={onSair} title="Sair do quiz">
              ✕ Sair
            </button>
          </div>
        </div>
      </header>

      {/* ── Corpo principal ── */}
      <main className="quiz-main">
        <div className="container">
          <div className="quiz-card eco-card animate-fadeInUp">

            {/* Progresso — H1 */}
            <div className="quiz-progress-area">
              <ProgressBar atual={atual + 1} total={perguntas.length} />
            </div>

            {/* Cabeçalho da pergunta */}
            <div className="quiz-question-header">
              <div className="quiz-info-row">
                <span className="badge-ods" style={{ fontSize: '.7rem' }}>
                  📂 {perguntaAtual.categoria}
                </span>
                <span style={{ fontSize: '.8rem', color: '#90A4AE', fontWeight: 500 }}>
                  Olá, {jogador}!
                </span>
              </div>

              <div className="quiz-question-body">
                {/* Timer circular — H1 */}
                <Timer
                  total={TEMPO_POR_PERGUNTA}
                  onEsgotado={handleTempoEsgotado}
                  resetKey={resetTimer}
                />

                {/* Pergunta */}
                <div className="quiz-question-text">
                  <h2 className="quiz-question">{perguntaAtual.pergunta}</h2>
                </div>
              </div>
            </div>

            {/* Opções — renderizadas via .map() (requisito do projeto) */}
            <div className="quiz-opcoes" role="list">
              {perguntaAtual.opcoes.map((opcao, index) => (
                <div role="listitem" key={index}>
                  <OpcaoResposta
                    index={index}
                    texto={opcao}
                    estado={estadoOpcao(index)}
                    onClick={() => handleResposta(index)}
                    desabilitado={estado === 'respondido'}
                  />
                </div>
              ))}
            </div>

            {/* Explicação pós-resposta — H1 feedback */}
            {estado === 'respondido' && (
              <div className={`quiz-explicacao animate-fadeIn ${opcaoEscolhida === perguntaAtual.correta ? 'quiz-explicacao-acerto' : 'quiz-explicacao-erro'}`}>
                <span className="quiz-explicacao-icon">
                  {opcaoEscolhida === -1 ? '⏱️' : opcaoEscolhida === perguntaAtual.correta ? '✅' : '❌'}
                </span>
                <div>
                  {opcaoEscolhida === -1 && <strong>Tempo esgotado! </strong>}
                  {opcaoEscolhida !== -1 && opcaoEscolhida !== perguntaAtual.correta && <strong>Quase! </strong>}
                  {opcaoEscolhida === perguntaAtual.correta && <strong>Correto! </strong>}
                  <span style={{ fontSize: '.88rem' }}>{perguntaAtual.explicacao}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default QuizScreen;
