import React from 'react';
import '../Styles/SpellStyle.css';

function LuxSpell() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <svg
        className="lux"
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

        <path
          d="M15 5 L15 95 L95 95"
          fill="none"
          stroke="url(#magicGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default LuxSpell;
