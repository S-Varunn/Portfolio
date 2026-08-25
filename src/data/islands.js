// Grand Line Islands & Projects Dataset
// Zero emojis - SVG icon names & custom asset paths included

export const ISLANDS = [
  {
    id: 'foosha',
    name: 'Foosha Village',
    subtitle: 'Dawn Island — Origin & Voyage Log',
    region: 'East Blue',
    order: 1,
    coordinates: { x: 12, y: 70, worldX: -35, worldZ: 20 },
    dockCoordinates: { worldX: -38.2, worldZ: 31.8, targetHeading: Math.PI },
    iconName: 'Compass',
    accentColor: '#ef4444',
    badgeText: 'Origin & Career Log',
    isFinal: false,
    project: {
      title: 'Voyage Log: The Spark & The Enterprise Forge',
      tagline: 'From IBM Hackathon React origins to Agentic AI and WebGPU systems at Zoho.',
      type: 'Career Logbook & Origin Story',
      techStack: ['React', 'Next.js', 'Svelte', 'Rust', 'WebGPU', 'Agentic AI', 'LLMs', 'SSR Optimization', 'TypeScript', 'Python'],
      summary: 'A chronicle of how my engineering journey started and evolved. Sparked by winning 2nd place at an IBM Hackathon building a sustainable e-tagging React app, then forged over 2 years at Zoho Corporation architecting autonomous agent orchestration, WebGPU desktop components, and high-velocity SSR engines.',
      origin: {
        title: 'The Spark — IBM Hackathon',
        award: '2nd Place Winner',
        description: 'Where it all started. Dove into React to pitch and engineer a modern electronic tagging (e-tag / QR) web app for apparel—eliminating single-use retail garment tags and reducing waste. Taking 2nd place ignited an unyielding passion for reactive frontend architectures and solving real-world challenges.',
        tags: ['React Genesis', 'Apparel E-Tag & QR', 'Waste Reduction', '2nd Place Winner']
      },
      zoho: {
        company: 'Zoho Corporation',
        role: 'Software Development Engineer',
        period: 'June 2023 – July 2025',
        location: 'Chennai, India',
        achievements: [
          {
            title: 'Agentic AI Systems & Code Generation',
            badge: 'Autonomous Agent',
            description: 'Engineered the foundational orchestration layer for an autonomous web development agent. System parses natural language prompts to scaffold, resolve dependencies, and generate complete full-stack apps (React, Svelte, Next.js).',
            tech: ['Agentic AI', 'React', 'Svelte', 'Next.js', 'Orchestration']
          },
          {
            title: 'Yggdrasileval — LLM Evaluation Framework',
            badge: '-20% Eval Time',
            description: 'Built a configuration-driven evaluation framework for Large Language Models, slashing testing time by 20% through parallel execution pipelines and automated retry mechanisms.',
            tech: ['LLM Eval', 'Parallelization', 'Python', 'Automated Retries']
          },
          {
            title: 'UI Performance Optimization & Modern SSR',
            badge: '98% Latency Drop',
            description: 'Replaced legacy client-side rendering components with a high-speed Server-Side Rendering (SSR) pipeline, reducing frontend chart generation latency by 98%.',
            tech: ['SSR Engine', 'Performance', 'Chart Rendering', 'Web Vitals']
          },
          {
            title: 'Cross-Platform WebGPU & Rust Desktop Components',
            badge: 'Hardware Accelerated',
            description: 'Contributed to high-throughput cross-platform desktop UI components leveraging WebGPU compute pipelines and Rust for near-native fluid rendering.',
            tech: ['Rust', 'WebGPU', 'Desktop Systems', 'Cross-Platform']
          }
        ]
      },
      metrics: [
        { label: 'Chart Latency Reduced', value: '98%', icon: 'Zap' },
        { label: 'LLM Testing Time Cut', value: '20%', icon: 'Timer' },
        { label: 'Autonomous Web Agents', value: 'Full-Stack', icon: 'Bot' },
        { label: 'IBM Hackathon Genesis', value: '2nd Place', icon: 'Trophy' }
      ],
      highlights: [
        'Agentic AI: Core orchestration layer generating full-stack React, Svelte, and Next.js applications from natural language prompts',
        'Yggdrasileval: Config-driven evaluation framework for LLMs slashing testing turnaround by 20% with automated retries',
        'UI Performance: Replaced legacy components with modern SSR architecture, reducing chart generation latency by 98%',
        'Systems & Graphics: High-performance desktop UI components powered by WebGPU compute pipelines and Rust',
        'Origin: Won 2nd Place at IBM Hackathon with sustainable React e-tag apparel web application'
      ],
      liveDemo: 'https://github.com/S-Varunn',
      github: 'https://github.com/S-Varunn'
    }
  },
  {
    id: 'baratie',
    name: 'Baratie — Weaver',
    subtitle: 'Context Weaver & Desktop Clipboard Engine',
    region: 'East Blue',
    order: 2,
    coordinates: { x: 28, y: 45, worldX: -20, worldZ: -5 },
    dockCoordinates: { worldX: -27.0, worldZ: -5.0, targetHeading: Math.PI },
    iconName: 'Clipboard',
    iconImage: '/assets/islands/weaver-icon.png',
    accentColor: '#6366f1',
    badgeText: 'Featured Desktop App',
    isFinal: false,
    project: {
      title: 'Weaver — Shortcut Based Desktop Clipboard & Prompt Composer',
      tagline: 'Eliminating context switching when pairing with AI agents and LLMs.',
      type: 'Desktop App (Tauri 2 + Rust + React)',
      techStack: ['Tauri 2', 'Rust', 'React 18', 'Ollama', 'Unix Domain Sockets'],
      summary: 'A fast, shortcut based desktop clipboard manager built for developers. Weaves multi part prompts directly across applications using global hotkeys (append/prepend) without switching windows, and features AI image OCR extraction.',
      highlights: [
        'Prompt Weaving: Append (Ctrl+Alt+Down) and Prepend (Ctrl+Alt+Up) without window switching',
        'AI Image OCR (Ctrl+Alt+C) via local vision models or OpenAI',
        'Quick Paste Palette (Ctrl+Alt+W) with instant search',
        'Inline editing, full-text scrolling, and in place history matching',
        'Cross-platform desktop binaries for Linux, macOS, and Windows'
      ],
      liveDemo: 'https://github.com/S-Varunn/weaver/releases/latest',
      github: 'https://github.com/S-Varunn/weaver',
      imagePlaceholder: 'Add image or video assets: /assets/islands/weaver-demo.mp4'
    }
  },
  {
    id: 'alabasta',
    name: 'Alabasta Kingdom — Broomies',
    subtitle: 'Private Circle P2P File Sharing Network',
    region: 'Grand Line',
    order: 3,
    coordinates: { x: 46, y: 65, worldX: -2, worldZ: 18 },
    dockCoordinates: { worldX: -5.2, worldZ: 29.8, targetHeading: Math.PI },
    iconName: 'Share2',
    accentColor: '#3b82f6',
    badgeText: 'Live P2P Web App',
    isFinal: false,
    project: {
      title: 'Broomies — Private Circle P2P File Sharing',
      tagline: 'Zero size limits, zero cloud subscription fees, 100% local network speeds.',
      type: 'P2P Web Application (FastAPI + BitTorrent BEP 3 + React)',
      techStack: ['Python', 'FastAPI', 'BitTorrent BEP 3', 'React 19', 'WebSockets', 'SQLite'],
      summary: 'A private P2P file sharing application for roommate circles and close study groups. Slices files into 64KB SHA-1 piece chunks and transfers data directly peer-to-peer over local network.',
      highlights: [
        'BitTorrent BEP 3 HTTP Tracker & TCP Peer Wire protocol engine',
        'WebSocket event broadcasting for circle file uploads and deletions',
        'BitTorrent Piece Map visualizer tracking completed piece chunks in real time',
      ],
      liveDemo: 'https://broomies-solj.onrender.com',
      github: 'https://github.com/S-Varunn/broomies',
      imagePlaceholder: 'Add image asset: /assets/islands/broomies-preview.png'
    }
  },
  {
    id: 'water7',
    name: 'Water 7 — Horai',
    subtitle: 'Collaborative Timesheet Tracker & Multi-Channel Autonomous AI Agent',
    region: 'Grand Line',
    order: 4,
    coordinates: { x: 62, y: 35, worldX: 14, worldZ: -12 },
    dockCoordinates: { worldX: 10.8, worldZ: -0.2, targetHeading: Math.PI },
    iconName: 'Clock',
    iconImage: '/assets/islands/horai-icon.png',
    accentColor: '#0284c7',
    badgeText: 'Full-Stack & Multi-Channel AI',
    isFinal: false,
    project: {
      title: 'Horai — Collaborative Timesheet & Autonomous AI Agent',
      tagline: 'Autonomous event staffing, live session timers, collaborative payroll & multi-channel AI agents.',
      type: 'Full-Stack Web App + Multi-Channel AI Agent (WhatsApp & Discord)',
      techStack: [
        'React 19',
        'TypeScript',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Knex',
        'Baileys (WhatsApp)',
        'Discord.js',
        'Google Gemini / LLM',
        'TanStack Query',
        'Tailwind CSS'
      ],
      summary: 'Created as an Event and Staff Management platform designed to ease operation, while increasing financial transparency and payroll accuracy. During hectic event setups and busy schedules, event leads and staff rarely have time to open a dashboard—so Horai integrates an autonomous Natural Language AI Agent directly into Discord and WhatsApp. This enables teams to log shifts, submit expenses, check earnings, and manage payroll on the go.',
      highlights: [
        'Natural language timesheet management on WhatsApp & Discord using tool calling function execution',
        'Granular Role Based Data Isolation (RBAC): Strict privacy filters ensuring collaborators only access personal records while organizers manage full payroll',
        'Deterministic Offline Intelligence: Fuzzy entity resolution and rule based NLP parser ensuring zero downtime during LLM rate limits',
        'Comprehensive Payroll & Expense Engine: Dynamic calculations for hourly base pay, driving reimbursements, material expenses, and tips across events'
      ],
      liveDemo: 'https://horai.netlify.app/',
      github: 'https://github.com/S-Varunn/horai',
      backendGithub: 'https://github.com/S-Varunn/horai-backend',
      imagePlaceholder: 'Add image asset: /assets/islands/horai-preview.png'
    }
  },
  {
    id: 'wano',
    name: 'Wano Country',
    subtitle: 'Land of Samurai Code',
    region: 'New World',
    order: 5,
    coordinates: { x: 78, y: 58, worldX: 28, worldZ: 10 },
    dockCoordinates: { worldX: 24.8, worldZ: 21.8, targetHeading: Math.PI },
    iconName: 'Sword',
    accentColor: '#10b981',
    badgeText: 'Project #4',
    isFinal: false,
    project: {
      title: 'Koushirou AI - High Performance Code Engine & Neural Search',
      tagline: 'Sharp as a Meito blade. Instant semantic search & code refactoring.',
      type: 'AI & Developer Tooling',
      techStack: ['Python', 'FastAPI', 'React', 'Vector DB (Qdrant)', 'Ollama / LLM'],
      summary: 'A developer assistant tool designed to index multi-gigabyte codebases using vector embeddings and perform lightning-fast context-aware refactoring and test generation.',
      highlights: [
        'Semantic code search with HNSW vector indexing sub-10ms response',
        'Automated unit test generator targeting 95%+ branch coverage',
        'Zero data egress local LLM inference mode for confidential codebases',
        'Interactive AST visualizer showing syntax tree transformations'
      ],
      liveDemo: 'https://example.com/wano-ai',
      github: 'https://github.com/example/wano-engine',
      imagePlaceholder: 'Add image asset: /assets/islands/wano-preview.png'
    }
  },
  {
    id: 'raftel',
    name: 'Raftel (Laugh Tale)',
    subtitle: 'The Final Island',
    region: 'The End of the Grand Line',
    order: 6,
    coordinates: { x: 92, y: 30, worldX: 42, worldZ: -18 },
    dockCoordinates: { worldX: 38.8, worldZ: -6.2, targetHeading: Math.PI },
    iconName: 'Crown',
    accentColor: '#fbbf24',
    badgeText: 'The Treasure (Resume & Contact)',
    isFinal: true,
    project: {
      title: 'The Ultimate Treasure: Resume & Contact Info',
      tagline: 'You have reached the end of the Grand Line. Claim the knowledge!',
      type: 'Resume & Contact Hub',
      techStack: ['Full-Stack Engineering', '3D Graphics', 'Cloud DevOps', 'UI Architecture'],
      summary: 'Congratulations on navigating the sea! Here lies the complete record of skills, work history, downloadable Bounty Poster CV, and Den Den Mushi communication portal.',
      highlights: [
        'Ancient Poneglyph interactive skills tablet deciphering core tech stacks',
        'Straw Hat Bounty Poster CV generator (Downloadable & Printable PDF format)',
        'Den Den Mushi direct messaging form with audio chime feedback',
        'Celebratory gold coin confetti burst upon arrival'
      ],
      liveDemo: '#raftel-resume',
      github: '#contact',
      imagePlaceholder: 'Add image asset: /assets/islands/raftel-preview.png'
    }
  }
];
