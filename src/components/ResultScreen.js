import React, { useMemo } from 'react';
import './ResultScreen.css';

// ═══════════════════════════════════════════════════════════════
// ResultScreen.js — Tela de Resultados
// Props: jogador (string), resultado { score, total, respostas[] },
//        onReiniciar (callback)
// Heurística H2: botão reiniciar (controle do usuário)
//              H1: score, classificação e feedback visíveis
//              H8: design minimalista e focado
// ═══════════════════════════════════════════════════════════════

function ResultScreen({ jogador, resultado, onReiniciar }) {
  const { score, total, respostas } = resultado;
  const pct = Math.round((score / total) * 100);

  // Classificação calculada com useMemo (evita recalcular a cada render)
  const classificacao = useMemo(() => {
    if (pct === 100) return { emoji: '🏆', label: 'Nota 10!',        cor: '#1B5E20', bg: '#E8F5E9', msg: 'Incrível! Você domina o ODS 4 completamente. Parabéns!' };
    if (pct >= 80)  return { emoji: '🌟', label: 'Excelente!',       cor: '#2E7D32', bg: '#E8F5E9', msg: 'Ótimo desempenho! Você tem um ótimo conhecimento sobre Educação de Qualidade.' };
    if (pct >= 60)  return { emoji: '👍', label: 'Bom trabalho!',    cor: '#F57F17', bg: '#FFF8E1', msg: 'Bom resultado! Continue se aprofundando nos temas do ODS 4.' };
    if (pct >= 40)  return { emoji: '📚', label: 'Pode melhorar!',   cor: '#E65100', bg: '#FFF3E0', msg: 'Você está no caminho certo. Que tal explorar mais sobre o ODS 4 da ONU?' };
    return           { emoji: '💪', label: 'Continue tentando!', cor: '#B71C1C', bg: '#FFEBEE', msg: 'Não desanime! O aprendizado é contínuo. Releia sobre o ODS 4 e tente novamente.' };
  }, [pct]);

  // Dados para o mini-gráfico de categorias
  const categorias = useMemo(() => {
    const mapa = {};
    respostas.forEach((r) => {
      if (!mapa[r.categoria]) mapa[r.categoria] = { total: 0, acertos: 0 };
      mapa[r.categoria].total++;
      if (r.acertou) mapa[r.categoria].acertos++;
    });
    return Object.entries(mapa).map(([cat, d]) => ({ cat, ...d, pct: Math.round((d.acertos / d.total) * 100) }));
  }, [respostas]);

  return (
    <div className="result-wrapper animate-fadeIn">
      {/* Header */}
      <header className="result-header">
        <div className="container text-center">
          <span className="home-logo-text" style={{ fontSize: '1.2rem' }}>🌿 EcoQuiz</span>
        </div>
      </header>

      <main className="result-main">
        <div className="container">
          <div className="row gy-4 justify-content-center">

            {/* ── Coluna principal: score ── */}
            <div className="col-lg-5">
              <div className="result-card eco-card animate-fadeInUp text-center">
                {/* Classificação */}
                <div className="result-badge" style={{ background: classificacao.bg }}>
                  <span className="result-emoji">{classificacao.emoji}</span>
                  <span className="result-label" style={{ color: classificacao.cor }}>{classificacao.label}</span>
                </div>

                <h1 className="result-greeting">Parabéns, {jogador}!</h1>

                {/* Score circular */}
                <div className="result-score-wrap">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" fill="none" stroke="#E8F5E9" strokeWidth="10" />
                    <circle
                      cx="80" cy="80" r="68"
                      fill="none"
                      stroke={classificacao.cor}
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 68}`}
                      strokeDashoffset={`${2 * Math.PI * 68 * (1 - pct / 100)}`}
                      transform="rotate(-90 80 80)"
                      style={{ transition: 'stroke-dashoffset 1.2s ease' }}
                    />
                    <text x="80" y="72" textAnchor="middle" fontSize="38" fontWeight="800"
                      fontFamily="Poppins,sans-serif" fill={classificacao.cor}>{score}</text>
                    <text x="80" y="92" textAnchor="middle" fontSize="13"
                      fontFamily="Poppins,sans-serif" fill="#90A4AE">de {total}</text>
                    <text x="80" y="112" textAnchor="middle" fontSize="15" fontWeight="700"
                      fontFamily="Poppins,sans-serif" fill={classificacao.cor}>{pct}%</text>
                  </svg>
                </div>

                <p className="result-msg">{classificacao.msg}</p>

                {/* Botões — H2 Controle e liberdade */}
                <div className="d-flex flex-column gap-2 mt-3">
                  <button className="btn btn-eco-primary py-3" onClick={onReiniciar} style={{ fontSize: '1rem' }}>
                    🔄 Jogar Novamente
                  </button>
                  <a
                    href="https://brasil.un.org/pt-br/sdgs/4"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-eco-outline py-2"
                    style={{ fontSize: '.88rem' }}
                  >
                    🌎 Saiba mais sobre o ODS 4
                  </a>
                </div>
              </div>
            </div>

            {/* ── Coluna direita: desempenho por categoria + histórico ── */}
            <div className="col-lg-6">

              {/* Categorias */}
              <div className="result-card eco-card animate-fadeInUp mb-4" style={{ animationDelay: '.1s' }}>
                <h3 className="result-section-title">📊 Desempenho por Categoria</h3>
                {categorias.map((c) => (
                  <div key={c.cat} className="result-categoria">
                    <div className="d-flex justify-content-between mb-1">
                      <span style={{ fontSize: '.83rem', fontWeight: 600, color: '#37474F' }}>{c.cat}</span>
                      <span style={{ fontSize: '.78rem', color: '#90A4AE' }}>{c.acertos}/{c.total}</span>
                    </div>
                    <div className="progress" style={{ height: '7px', borderRadius: '7px', background: '#E8F5E9' }}>
                      <div
                        className="progress-bar"
                        style={{
                          width: `${c.pct}%`,
                          background: c.pct >= 60 ? 'linear-gradient(90deg,#388E3C,#A5D6A7)' : c.pct >= 40 ? '#F9A825' : '#EF5350',
                          borderRadius: '7px',
                          transition: 'width 1s ease',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Histórico de respostas */}
              <div className="result-card eco-card animate-fadeInUp" style={{ animationDelay: '.2s' }}>
                <h3 className="result-section-title">📋 Revisão das Respostas</h3>
                <div className="result-historico">
                  {respostas.map((r, i) => (
                    <div key={i} className={`result-item ${r.acertou ? 'result-item-ok' : 'result-item-err'}`}>
                      <div className="result-item-num">{r.acertou ? '✅' : '❌'}</div>
                      <div className="result-item-body">
                        <p className="result-item-pergunta">{r.pergunta}</p>
                        {!r.acertou && (
                          <>
                            <p className="result-item-sua">Sua resposta: <em>{r.escolha}</em></p>
                            <p className="result-item-certa">Correta: <strong>{r.correta}</strong></p>
                          </>
                        )}
                        <p className="result-item-explicacao">{r.explicacao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <footer className="home-footer mt-4">
        <div className="container text-center">
          <p className="mb-0" style={{ fontSize: '.78rem', opacity: .75 }}>
            Desenvolvido com ⚛️ React + Bootstrap 5 · Projeto A3 – Engenharia de Software · 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default ResultScreen;
