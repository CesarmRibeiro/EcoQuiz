import React from 'react';
import './OpcaoResposta.css';

// ═══════════════════════════════════════════════════════════════
// OpcaoResposta.js — Botão de opção de resposta
// Props: letra, texto, estado ('normal'|'correta'|'errada'|'nao-selecionada'),
//        onClick, desabilitado
// Heurística H6: Reconhecimento em vez de memorização
//              H1: feedback visual imediato após seleção
// ═══════════════════════════════════════════════════════════════

const LETRAS = ['A', 'B', 'C', 'D'];

function OpcaoResposta({ index, texto, estado = 'normal', onClick, desabilitado }) {
  const letra = LETRAS[index];

  const classMap = {
    normal:          'opcao-normal',
    correta:         'opcao-correta animate-pulse',
    errada:          'opcao-errada animate-shake',
    'nao-selecionada': 'opcao-nao-selecionada',
  };

  const iconMap = {
    normal:           null,
    correta:          '✅',
    errada:           '❌',
    'nao-selecionada': null,
  };

  return (
    <button
      className={`opcao-btn ${classMap[estado]}`}
      onClick={onClick}
      disabled={desabilitado}
      aria-label={`Opção ${letra}: ${texto}`}
    >
      <span className="opcao-letra">{letra}</span>
      <span className="opcao-texto">{texto}</span>
      {iconMap[estado] && <span className="opcao-icon">{iconMap[estado]}</span>}
    </button>
  );
}

export default OpcaoResposta;
