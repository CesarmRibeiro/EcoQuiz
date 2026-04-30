import React from 'react';

// ═══════════════════════════════════════════════════════════════
// ProgressBar.js — Barra de progresso do quiz
// Props: atual (número da pergunta), total
// Heurística H1: Visibilidade do status do sistema
// ═══════════════════════════════════════════════════════════════

function ProgressBar({ atual, total }) {
  const pct = Math.round((atual / total) * 100);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <span style={{ fontSize: '.78rem', fontWeight: 600, color: '#546E7A' }}>
          Pergunta <strong style={{ color: '#1B5E20' }}>{atual}</strong> de <strong>{total}</strong>
        </span>
        <span style={{ fontSize: '.78rem', fontWeight: 700, color: '#388E3C' }}>{pct}%</span>
      </div>
      <div className="progress" style={{ height: '8px', borderRadius: '8px', background: '#E8F5E9' }}>
        <div
          className="progress-bar"
          role="progressbar"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #388E3C, #A5D6A7)',
            borderRadius: '8px',
            transition: 'width .5s ease',
          }}
          aria-valuenow={pct}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
