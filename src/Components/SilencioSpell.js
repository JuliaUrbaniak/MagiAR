import React from 'react';
import '../Styles/SpellStyle.css';

function SilencioSpell() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <svg
        className="silencio"
        viewBox="0 0 100 100"
        width="200"
        height="200"
      >
        <defs>
          <linearGradient id="magicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

{/* Pozioma linia od lewej do prawej */}
        {/* <path
          d="M5 50 L95 50"
          fill="none"
        //   stroke="url(#magicGradient)"
          stroke="#3b82f6"
          strokeWidth="6"
          strokeLinecap="round"
        /> */}
        <line
            x1="5" y1="50"
            x2="95" y2="50"
            fill="none"
            // stroke="url(#magicGradient)"
            stroke="#3b82f6"
            strokeWidth="6"
            strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default SilencioSpell;
