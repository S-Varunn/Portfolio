import React from 'react';

export function FrameworkIcon({ tech, className = "w-4 h-4 mr-2 inline-block shrink-0" }) {
  const name = (tech || '').toLowerCase();

  // React & Next.js
  if (name.includes('next')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <circle cx="64" cy="64" r="64" fill="#000000"/>
        <path fill="#ffffff" d="M35.5 38h7v52h-7zm25.5 0h7v28.8l21.3-28.8h8.2L68 76.5l30 33.5h-8.8L68 85.5V110h-7z"/>
      </svg>
    );
  }

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

  // Svelte
  if (name.includes('svelte')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#FF3E00" d="M102.7 27.2C96.3 12.8 80.8 5.7 65.6 9.4c-9.1 2.2-16.7 8-21.7 15.8L27.6 51.5c-7.7 12.1-7.1 27.6 1.4 39.1 9.4 12.7 26.1 18.2 41.2 13.9 9.1-2.6 16.7-8.8 21.3-17.1l16.3-26.3c1.7-2.8.8-6.4-2-8.1-2.8-1.7-6.4-.8-8.1 2L81.4 81.3c-2.4 4.4-6.4 7.6-11.2 9-8.3 2.4-17.4-.7-22.6-7.7-4.7-6.3-5-14.8-.8-21.4l16.3-26.3c2.7-4.2 6.8-7.3 11.7-8.5 8.3-2 16.7 1.9 20.2 9.7 1.8 3.9 1.6 8.3-.4 12.1-.8 1.4-.4 3.2 1 4 1.4.8 3.2.4 4-.9 3.6-6.6 4-14.7 1.1-22.1z"/>
      </svg>
    );
  }

  // WebGPU / GPU / Graphics
  if (name.includes('webgpu') || name.includes('gpu')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#2b1707" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2"/>
        <rect x="9" y="9" width="6" height="6"/>
        <line x1="9" y1="1" x2="9" y2="4"/>
        <line x1="15" y1="1" x2="15" y2="4"/>
        <line x1="9" y1="20" x2="9" y2="23"/>
        <line x1="15" y1="20" x2="15" y2="23"/>
        <line x1="20" y1="9" x2="23" y2="9"/>
        <line x1="20" y1="14" x2="23" y2="14"/>
        <line x1="1" y1="9" x2="4" y2="9"/>
        <line x1="1" y1="14" x2="4" y2="14"/>
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

  // WhatsApp
  if (name.includes('whatsapp') || name.includes('baileys')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#25D366">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83-1.56 1.56-3.63 2.41-5.82 2.41-1.48 0-2.93-.39-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.186 8.186 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.17-.48-.3z"/>
      </svg>
    );
  }

  // Discord
  if (name.includes('discord')) {
    return (
      <svg className={className} viewBox="0 0 128 128" fill="#5865F2">
        <path d="M107.7 22.8A99.4 99.4 0 0 0 83.1 15.2a.3.3 0 0 0-.3.2 69.3 69.3 0 0 0-3.1 6.3 91.8 91.8 0 0 0-31.4 0 72 72 0 0 0-3.1-6.3.3.3 0 0 0-.3-.2A99.4 99.4 0 0 0 20.3 22.8a.3.3 0 0 0-.1.1C3.8 47.4-.7 71.4.2 95.1a.4.4 0 0 0 .1.3 99.8 99.8 0 0 0 30.1 15.2.3.3 0 0 0 .4-.1c2.3-3.2 4.4-6.6 6.1-10.2a.3.3 0 0 0-.2-.4c-3.4-1.3-6.6-2.9-9.7-4.7a.3.3 0 0 1 0-.6c.7-.5 1.3-1 2-1.5a.3.3 0 0 1 .3 0 71.4 71.4 0 0 0 69.4 0 .3.3 0 0 1 .3 0c.7.5 1.3 1 2 1.5a.3.3 0 0 1 0 .6c-3.1 1.8-6.3 3.4-9.7 4.7a.3.3 0 0 0-.2.4c1.8 3.6 3.8 7 6.1 10.2a.3.3 0 0 0 .4.1 99.5 99.5 0 0 0 30.2-15.2.4.4 0 0 0 .1-.3c1.1-27.4-8-51.2-20.1-72.2a.3.3 0 0 0-.2-.1zM45.7 78.4c-6 0-11-5.5-11-12.3s4.8-12.3 11-12.3 11.1 5.5 11 12.3c0 6.8-4.9 12.3-11 12.3zm36.6 0c-6 0-11-5.5-11-12.3s4.8-12.3 11-12.3 11.1 5.5 11 12.3c0 6.8-4.9 12.3-11 12.3z"/>
      </svg>
    );
  }

  // PostgreSQL / Knex / SQL
  if (name.includes('postgres') || name.includes('sql') || name.includes('knex')) {
    return (
      <svg className={className} viewBox="0 0 128 128">
        <path fill="#336791" d="M64 12C35.3 12 12 35.3 12 64s23.3 52 52 52 52-23.3 52-52S92.7 12 64 12zm23.6 74.3c-2.4 1.4-5.3 2.1-8.5 2.1-7.2 0-11.8-3.9-14.8-9.4-2.1 4.7-6 7.4-11.2 7.4-6.8 0-11.8-4.9-11.8-13.6 0-11.2 8.7-18.4 22.3-18.4h4.8v-2.7c0-4.8-3.1-7.8-8.8-7.8-3.9 0-7.7 1.4-10.4 3.7l-3.3-6.2c3.9-3.2 9.5-5.1 15.6-5.1 11.5 0 18.2 6.5 18.2 16.9v18.7c0 4.1 1.7 6.4 4.8 6.4 1.7 0 3.2-.5 4.3-1.3l-1.2 9.3z"/>
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
