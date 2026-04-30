import React, { useState } from 'react';
import './HomeScreen.css';

// ═══════════════════════════════════════════════════════════════
// HomeScreen.js — Tela Inicial
// Componente: <HomeScreen onIniciar={fn} />
// Props recebidas: onIniciar (callback com o nome do jogador)
// Hooks: useState (nome, erro)
// Heurísticas: H5 (Prevenção de erros — valida nome vazio)
//              H8 (Design minimalista)
// ═══════════════════════════════════════════════════════════════

function HomeScreen({ onIniciar }) {
  const [nome, setNome]   = useState('');
  const [erro, setErro]   = useState('');
  const [hover, setHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nomeTrimado = nome.trim();
    // H5 – Prevenção de erros: valida antes de prosseguir
    if (!nomeTrimado) {
      setErro('Por favor, informe seu nome para começar!');
      return;
    }
    if (nomeTrimado.length < 2) {
      setErro('Seu nome deve ter pelo menos 2 caracteres.');
      return;
    }
    setErro('');
    onIniciar(nomeTrimado);
  };

  const handleChange = (e) => {
    setNome(e.target.value);
    if (erro) setErro(''); // limpa erro enquanto digita
  };

  // Estatísticas para exibição visual
  const stats = [
    { valor: '10',   label: 'Perguntas',    icon: '❓' },
    { valor: '30s',  label: 'Por Pergunta', icon: '⏱️' },
    { valor: 'ODS4', label: 'Temática',     icon: '🌱' },
  ];

  // Lista de heurísticas aplicadas
  const heuristicas = [
    { id: 'H1', nome: 'Visibilidade do status', cor: '#388E3C' },
    { id: 'H2', nome: 'Controle do usuário',    cor: '#00695C' },
    { id: 'H5', nome: 'Prevenção de erros',     cor: '#1565C0' },
    { id: 'H6', nome: 'Reconhecimento',         cor: '#6A1B9A' },
    { id: 'H8', nome: 'Design minimalista',     cor: '#E65100' },
  ];

  return (
    <div className="home-wrapper animate-fadeIn">
      {/* ── Header ── */}
      <header className="home-header">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span className="home-logo-icon">🌿</span>
              <span className="home-logo-text">EcoQuiz</span>
            </div>
            <span className="badge-ods">🎯 ODS 4 · Educação de Qualidade</span>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <main className="home-main">
        <div className="container">
          <div className="row align-items-center gy-5">

            {/* Coluna esquerda: apresentação */}
            <div className="col-lg-6 animate-fadeInUp">
              <p className="home-eyebrow">Projeto A3 · Engenharia de Software</p>
              <h1 className="home-title">
                Teste seus conhecimentos sobre
                <span className="home-title-highlight"> Educação de Qualidade</span>
              </h1>
              <p className="home-subtitle">
                Um quiz interativo desenvolvido em <strong>React</strong> e <strong>Bootstrap 5</strong>,
                alinhado ao <strong>ODS 4</strong> da ONU. Responda 10 perguntas e descubra o quanto
                você sabe sobre educação inclusiva ao redor do mundo.
              </p>

              {/* Stats */}
              <div className="home-stats">
                {stats.map((s) => (
                  <div key={s.label} className="home-stat-card">
                    <span className="home-stat-icon">{s.icon}</span>
                    <span className="home-stat-valor">{s.valor}</span>
                    <span className="home-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Heurísticas aplicadas */}
              <div className="home-heuristics">
                <p className="home-heuristics-title">🔍 Heurísticas de Nielsen aplicadas:</p>
                <div className="d-flex flex-wrap gap-2">
                  {heuristicas.map((h) => (
                    <span key={h.id} className="home-heuristic-badge" style={{ borderColor: h.cor, color: h.cor }}>
                      <strong>{h.id}</strong> · {h.nome}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Coluna direita: form */}
            <div className="col-lg-5 offset-lg-1 animate-fadeInUp" style={{ animationDelay: '.15s' }}>
              <div className="home-card eco-card">
                <div className="home-card-top">
                  <span className="home-card-emoji">🎮</span>
                  <h2 className="home-card-title">Pronto para jogar?</h2>
                  <p className="home-card-sub">Informe seu nome e clique em Jogar!</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="nomeInput" className="home-label">
                      Seu nome
                    </label>
                    <input
                      id="nomeInput"
                      type="text"
                      className={`home-input form-control ${erro ? 'is-invalid' : nome.trim().length >= 2 ? 'is-valid' : ''}`}
                      placeholder="Ex.: Maria Silva"
                      value={nome}
                      onChange={handleChange}
                      maxLength={40}
                      autoFocus
                      aria-describedby="nomeHelp"
                    />
                    {/* H5 – feedback de erro visível e descritivo */}
                    {erro && <div className="invalid-feedback">{erro}</div>}
                    {!erro && <div id="nomeHelp" className="form-text text-muted" style={{ fontSize: '.78rem' }}>
                      Mínimo 2 caracteres • Máximo 40 caracteres
                    </div>}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-eco-primary w-100 py-3 mt-1"
                    style={{ fontSize: '1.05rem' }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    {hover ? '🚀 Vamos lá!' : '🎯 Jogar Agora'}
                  </button>
                </form>

                <div className="home-card-footer">
                  <span>🌎</span>
                  <span>Gratuito · Sem cadastro · Educativo</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <div className="container text-center">
          <p className="mb-0" style={{ fontSize: '.78rem', opacity: .75 }}>
            Desenvolvido com ⚛️ React + Bootstrap 5 · Projeto A3 – Engenharia de Software · 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomeScreen;
