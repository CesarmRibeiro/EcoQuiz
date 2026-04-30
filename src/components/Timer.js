import React, { useEffect, useRef, useState } from 'react';
import './Timer.css';

// ═══════════════════════════════════════════════════════════════
// Timer.js — Cronômetro regressivo circular
// Props: total (segundos), onEsgotado (callback), resetKey
// Hooks: useState (tempoRestante), useEffect (interval)
// Heurística H1: Visibilidade do status do sistema
// ═══════════════════════════════════════════════════════════════

function Timer({ total = 30, onEsgotado, resetKey }) {
  const [tempo, setTempo] = useState(total);
  const intervalRef = useRef(null);

  // Reset quando a pergunta mudar (resetKey muda)
  useEffect(() => {
    setTempo(total);
  }, [resetKey, total]);

  // Inicia/reinicia o countdown
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTempo((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          onEsgotado && onEsgotado();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [resetKey, onEsgotado]);

  // Calcula porcentagem e cor dinamicamente
  const pct     = tempo / total;
  const cor     = pct > .5 ? '#388E3C' : pct > .25 ? '#F9A825' : '#B71C1C';
  const urgente = pct <= .25;

  // SVG circular
  const R = 28, C = 2 * Math.PI * R;
  const offset = C * (1 - pct);

  return (
    <div className={`timer-wrap ${urgente ? 'timer-urgente' : ''}`} title={`${tempo} segundos restantes`}>
      <svg width="72" height="72" viewBox="0 0 72 72" className="timer-svg">
        {/* Trilha */}
        <circle cx="36" cy="36" r={R} fill="none" stroke="#E8F5E9" strokeWidth="5" />
        {/* Progresso */}
        <circle
          cx="36" cy="36" r={R}
          fill="none"
          stroke={cor}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={offset}
          transform="rotate(-90 36 36)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }}
        />
        {/* Número */}
        <text x="36" y="41" textAnchor="middle" fontSize="18" fontWeight="700"
          fontFamily="Poppins, sans-serif" fill={cor}>
          {tempo}
        </text>
      </svg>
      <span className="timer-label" style={{ color: cor }}>seg</span>
    </div>
  );
}

export default Timer;
