import React from 'react';

export function FrameworkIcon({ tech, className = "w-4 h-4 mr-2 inline-block shrink-0" }) {
  const name = (tech || '').toLowerCase();

  // React
  if (name.includes('react')) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    );
  }

  // Rust
  if (name.includes('rust')) {
    return (
      <svg className={className} viewBox="0 0 512 512">
        <path fill="#2b1707" d="M496 230h-47.5a183.3 183.3 0 00-11-26.6l33.6-33.6a16 16 0 000-22.6l-33.9-33.9a16 16 0 00-22.6 0l-33.6 33.6a183.3 183.3 0 00-26.6-11V72a16 16 0 00-16-16h-48a16 16 0 00-16 16v47.5a183.3 183.3 0 00-26.6 11l-33.6-33.6a16 16 0 00-22.6 0L157.7 147a16 16 0 000 22.6l33.6 33.6a183.3 183.3 0 00-11 26.6H132a16 16 0 00-16 16v48a16 16 0 0016 16h47.5a183.3 183.3 0 0011 26.6l-33.6 33.6a16 16 0 000 22.6l33.9 33.9a16 16 0 0022.6 0l33.6-33.6a183.3 183.3 0 0026.6 11V440a16 16 0 0016 16h48a16 16 0 0016-16v-47.5a183.3 183.3 0 0026.6-11l33.6 33.6a16 16 0 0022.6 0l33.9-33.9a16 16 0 000-22.6l-33.6-33.6a183.3 183.3 0 0011-26.6H496a16 16 0 0016-16v-48a16 16 0 00-16-16zm-240 98a72 72 0 1172-72 72.1 72.1 0 01-72 72z"/>
      </svg>
    );
  }

  // Tauri
  if (name.includes('tauri')) {
    return (
      <svg className={className} viewBox="0 0 512 512">
        <circle cx="200" cy="200" r="140" fill="#24C8DB"/>
        <circle cx="312" cy="312" r="140" fill="#FFC131"/>
      </svg>
    );
  }

  // Ollama / AI / LLM
  if (name.includes('ollama') || name.includes('llm') || name.includes('ai')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#2b1707">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 12 2zm-3 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm6 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
      </svg>
    );
  }

  // Python
  if (name.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#3776AB" d="M63.3 15.3c-23.7 0-22.2 10.3-22.2 10.3l.1 10.7h22.7v3.2H31.7S15 37.6 15 61.5c0 23.9 14.6 23.1 14.6 23.1h8.7V72.1s-.5-14.6 14.4-14.6h24.7s13.9.2 13.9-13.6V29.5s1.7-14.2-28-14.2zM49.2 22.3a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4z"/>
        <path fill="#FFD43B" d="M64.7 112.7c23.7 0 22.2-10.3 22.2-10.3l-.1-10.7H64.1v-3.2h32.2s16.7 1.9 16.7-22c0-23.9-14.6-23.1-14.6-23.1h-8.7V55.9s.5 14.6-14.4 14.6H50.6s-13.9-.2-13.9 13.6v14.4s-1.7 14.2 28 14.2zM78.8 105.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4z"/>
      </svg>
    );
  }

  // TypeScript / JavaScript
  if (name.includes('type') || name.includes('js') || name.includes('script')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <rect width="128" height="128" rx="16" fill="#3178C6"/>
        <path fill="#FFF" d="M42.8 54.1H30.5v51.6h12.3V54.1zm22.4 12.3c2.7-2.6 6.3-4.1 10.6-4.1 7.8 0 12.8 4.6 12.8 12.8v26.6h12.3V73.7c0-14.5-9.1-23.3-23.4-23.3-8.2 0-14.6 3.6-18.1 9.4V54.1H52.9v51.6h12.3V66.4z"/>
      </svg>
    );
  }

  // Node.js / Express / Server
  if (name.includes('node') || name.includes('express') || name.includes('server')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#339933" d="M64 14.2L20.8 39.1v49.8L64 113.8l43.2-24.9V39.1L64 14.2z"/>
      </svg>
    );
  }

  // MongoDB / Vector DB
  if (name.includes('mongo') || name.includes('db') || name.includes('qdrant') || name.includes('redis')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#47A248" d="M62.6 16.3c-2.4 22.9-22 36.8-22 57.6 0 18.2 12.7 30 22 36.4 9.3-6.4 22-18.2 22-36.4 0-20.8-19.6-34.7-22-57.6z"/>
      </svg>
    );
  }

  // Three.js / WebGL / 3D
  if (name.includes('three') || name.includes('webgl') || name.includes('shader') || name.includes('3d')) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="none" stroke="#2b1707" strokeWidth="8">
        <path d="M64 16L16 48v48l48 16 48-16V48L64 16zM64 16v96M16 48l48 48M112 48L64 96"/>
      </svg>
    );
  }

  // Tailwind CSS
  if (name.includes('tail') || name.includes('css')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#06B6D4" d="M32 40c8-16 24-20 36-12 12 8 16 20 28 20 8 0 16-4 20-12-8 16-24 20-36 12-12-8-16-20-28-20-8 0-16 4-20 12zm-20 36c8-16 24-20 36-12 12 8 16 20 28 20 8 0 16-4 20-12-8 16-24 20-36 12-12-8-16-20-28-20-8 0-16 4-20 12z"/>
      </svg>
    );
  }

  // Stripe
  if (name.includes('stripe') || name.includes('pay')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#635BFF" d="M57.6 46.1c0-4.8 3.9-6.6 10.4-6.6 9.3 0 21.1 2.9 30.5 7.9V21.1C87.8 17.5 76.5 16 67.2 16 42.4 16 26 29.1 26 47.9c0 28.5 39.2 23.9 39.2 36.2 0 5.7-4.9 7.6-11.8 7.6-10.4 0-23.9-4.3-34.6-10.1v27.2c11.8 5.2 23.9 7.2 34.6 7.2 25.8 0 43.1-12.7 43.1-32.3-.1-30.8-39-25.2-39-37.6z"/>
      </svg>
    );
  }

  // Socket / Sockets / Network / IPC
  if (name.includes('socket') || name.includes('domain') || name.includes('ipc') || name.includes('network') || name.includes('kafka')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#2b1707" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    );
  }

  // Default fallback SVG
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#2b1707" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
