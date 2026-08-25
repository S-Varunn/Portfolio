import React from 'react';
import * as Icons from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import { FrameworkIcon } from './FrameworkIcon';

export function ProjectModal({ island, isOpen, onClose, onNextIsland }) {
  const [lightboxImage, setLightboxImage] = React.useState(null);

  if (!isOpen || !island || island.isFinal) return null;

  const project = island.project;

  // Helper to render Lucide icon
  const renderIcon = (iconName, className = 'w-6 h-6') => {
    const IconComponent = (iconName && Icons[iconName]) ? Icons[iconName] : Icons.Code2;
    return <IconComponent className={className} size={24} strokeWidth={2.2} />;
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col op-torn-paper op-parchment-scroll text-[#3d2314] shadow-2xl font-serif">
        
        {/* Filigree Inner Frame Container */}
        <div className="op-filigree-frame flex flex-col h-full w-full overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-5 border-b-4 border-[#3d2314] bg-[#ebd7b3] text-[#3d2314]">
            <div className="flex items-center space-x-4">
              <div 
                onClick={() => {
                  if (island.iconImage) {
                    soundEngine.playClick();
                    setLightboxImage({ src: island.iconImage, title: island.name });
                  }
                }}
                className={`w-12 h-12 rounded-2xl bg-[#d8b15d] text-[#2b1707] border-2 border-[#3d2314] shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-0 m-0 self-center ${
                  island.iconImage ? 'cursor-pointer hover:scale-105 hover:ring-2 hover:ring-[#7a4f2b] transition-all' : ''
                }`}
                title={island.iconImage ? "Click to view full size icon image" : island.name}
              >
                {island.iconImage ? (
                  <img src={island.iconImage} alt={island.name} className="w-full h-full object-cover p-0 m-0 block" />
                ) : (
                  renderIcon(island.iconName, 'w-7 h-7')
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest font-stamp text-[#7a4f2b]">
                    {island.region} • ISLAND #{island.order}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#d8b15d]/40 text-[#2b1707] border border-[#3d2314]/50 font-stamp">
                    {island.badgeText}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#3d2314] font-wanted tracking-wide mt-0.5 leading-tight">
                  {island.name} — Logbook Entry
                </h2>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-3 rounded-2xl op-btn-tan-parchment text-[#3d2314] cursor-pointer shadow-sm"
              title="Close Logbook Entry"
            >
              <Icons.X className="w-7 h-7" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-[#f5e5c8]">
            
            {/* Main Title & Tagline */}
            <div className="space-y-3 border-b-2 border-[#3d2314]/20 pb-4">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold bg-[#d8b15d]/30 text-[#3d2314] border-2 border-[#3d2314]/60 font-stamp">
                <Icons.Layers className="w-4 h-4 mr-2 text-[#7a4f2b]" />
                {project.type}
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3d2314] font-parchment leading-tight">
                {project.title}
              </h3>
              <p className="text-base sm:text-xl font-bold text-[#5c391e] italic">"{project.tagline}"</p>
            </div>

            {/* --- BESPOKE FOOSHA VILLAGE LOGBOOK VIEW --- */}
            {island.id === 'foosha' ? (
              <div className="space-y-8">
                
                {/* 1. Executive Career Metrics Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {project.metrics?.map((metric, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314] flex flex-col items-center justify-center text-center shadow-md hover:scale-102 transition-transform"
                    >
                      <div className="p-2 rounded-xl bg-[#d8b15d]/40 text-[#7a4f2b] border border-[#3d2314]/40 mb-2">
                        {renderIcon(metric.icon, 'w-5 h-5')}
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-[#3d2314] font-wanted tracking-tight">
                        {metric.value}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#5c391e] font-stamp uppercase mt-0.5">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 2. Chapter 1: The Spark — IBM Hackathon (The Origin) */}
                <div className="p-6 sm:p-7 op-torn-paper bg-[#ebd7b3] border-4 border-[#3d2314] space-y-4 shadow-lg relative overflow-hidden">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#3d2314]/30 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="p-2 rounded-xl bg-[#d8b15d] text-[#2b1707] border border-[#3d2314]">
                        <Icons.Trophy className="w-5 h-5 text-[#2b1707]" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-widest font-stamp text-[#7a4f2b]">
                          Origin Chapter • Hackathon Genesis
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-[#3d2314] font-wanted leading-tight">
                          {project.origin?.title || "The Spark — IBM Hackathon"}
                        </h4>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-[#d8b15d] text-[#2b1707] border-2 border-[#3d2314] font-stamp shadow-sm">
                      {project.origin?.award || "2nd Place Winner"}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-[#3d2314] leading-relaxed font-sans">
                    {project.origin?.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.origin?.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-lg bg-[#f5e5c8] text-[#3d2314] border border-[#3d2314]/60 text-xs font-mono font-bold shadow-xs"
                      >
                        <Icons.Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#7a4f2b]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Chapter 2: The Forge — Zoho Corporation */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 p-4 op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314]">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-[#d8b15d] text-[#2b1707] border border-[#3d2314]">
                        <Icons.Building2 className="w-5 h-5 text-[#2b1707]" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-extrabold uppercase tracking-widest font-stamp text-[#7a4f2b]">
                            Enterprise Engineering
                          </span>
                          <span className="text-xs font-bold text-[#5c391e]">
                            • {project.zoho?.period}
                          </span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-[#3d2314] font-wanted">
                          {project.zoho?.company} — {project.zoho?.role}
                        </h4>
                      </div>
                    </div>
                    <div className="flex items-center text-xs font-bold text-[#5c391e] font-sans">
                      <Icons.MapPin className="w-4 h-4 mr-1 text-[#7a4f2b]" />
                      {project.zoho?.location}
                    </div>
                  </div>

                  {/* 4 Impact Achievement Cards in 2x2 Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.zoho?.achievements?.map((ach, idx) => (
                      <div
                        key={idx}
                        className="p-5 op-torn-paper bg-[#ebd7b3] border-3 border-[#3d2314] flex flex-col justify-between space-y-3 shadow-md hover:scale-101 transition-transform"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-base sm:text-lg font-black text-[#3d2314] font-sans leading-tight">
                              {ach.title}
                            </h5>
                            <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#d8b15d]/50 text-[#2b1707] border border-[#3d2314]/60 font-stamp shrink-0">
                              {ach.badge}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base font-semibold text-[#4a2e18] leading-relaxed font-sans">
                            {ach.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#3d2314]/20">
                          {ach.tech?.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded bg-[#f5e5c8] text-[#3d2314] border border-[#3d2314]/40 text-xs font-mono font-bold"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Core Tech Stack Arsenal */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3d2314] font-stamp flex items-center gap-2">
                    <Icons.Cpu className="w-5 h-5 text-[#7a4f2b]" />
                    Core Technical Arsenal
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-[#ebd7b3] text-[#3d2314] border-2 border-[#3d2314] font-mono font-extrabold shadow-sm hover:scale-105 transition-transform"
                      >
                        <FrameworkIcon tech={tech} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* --- STANDARD PROJECT VIEW FOR OTHER ISLANDS --- */
              <>
                {/* Project Preview Box / Visual Area */}
                <div className="relative w-full h-64 sm:h-80 op-torn-paper border-4 border-[#3d2314] bg-[#ebd7b3] flex flex-col items-center justify-center p-4 text-center group shadow-inner overflow-hidden">
                  {project.image ? (
                    <div className="w-full h-full flex items-center justify-center bg-[#1e1b2e] rounded-xl p-4 shadow-lg border-2 border-[#3d2314]/60">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="max-h-full max-w-full object-contain rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="p-5 rounded-full bg-[#d8b15d]/40 text-[#2b1707] border-2 border-[#3d2314]/60 mb-3 group-hover:scale-110 transition-transform">
                        <Icons.Image className="w-10 h-10 text-[#7a4f2b]" />
                      </div>
                      <p className="text-lg font-black text-[#3d2314] font-wanted">Project Visual Preview</p>
                      <p className="text-xs sm:text-sm text-[#5c391e] max-w-lg mt-1 font-mono font-bold">
                        {project.imagePlaceholder}
                      </p>
                    </>
                  )}
                </div>

                {/* Project Summary */}
                <div className="p-6 op-torn-paper bg-[#ebd7b3] border-4 border-[#3d2314] space-y-3 shadow-md">
                  <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3d2314] font-stamp flex items-center gap-2">
                    <Icons.FileText className="w-5 h-5 text-[#7a4f2b]" />
                    Architectural Overview
                  </h4>
                  <p className="text-base sm:text-lg font-semibold text-[#3d2314] leading-relaxed font-sans">
                    {project.summary}
                  </p>
                </div>

                {/* Key Technical Highlights */}
                <div className="space-y-4">
                  <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3d2314] font-stamp flex items-center gap-2">
                    <Icons.CheckCircle2 className="w-5 h-5 text-[#7a4f2b]" />
                    Key Engineering Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.highlights?.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3.5 p-4 op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314] text-sm sm:text-base font-bold text-[#3d2314] font-sans shadow-sm"
                      >
                        <Icons.ShieldCheck className="w-5 h-5 text-[#7a4f2b] shrink-0 mt-0.5" />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-[#3d2314] font-stamp">
                    Tech Stack & Tooling
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {project.techStack?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-[#ebd7b3] text-[#3d2314] border-2 border-[#3d2314] font-mono font-extrabold shadow-sm hover:scale-105 transition-transform"
                      >
                        <FrameworkIcon tech={tech} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 bg-[#ebd7b3] border-t-4 border-[#3d2314]">
            <div className="flex flex-wrap items-center gap-3">
              {island.id === 'foosha' ? (
                <>
                  <a
                    href="https://github.com/S-Varunn"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="inline-flex items-center px-6 py-3.5 rounded-2xl op-btn-gold-parchment font-black text-sm sm:text-base uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                  >
                    <Icons.GitBranch className="w-5 h-5 mr-2.5 text-[#2b1707]" />
                    GitHub Profile
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="inline-flex items-center px-6 py-3.5 rounded-2xl op-btn-tan-parchment text-[#3d2314] font-extrabold text-sm sm:text-base uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <Icons.Briefcase className="w-5 h-5 mr-2.5 text-[#7a4f2b]" />
                    LinkedIn Experience
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="inline-flex items-center px-6 py-3.5 rounded-2xl op-btn-gold-parchment font-black text-sm sm:text-base uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                  >
                    <Icons.ExternalLink className="w-5 h-5 mr-2.5 text-[#2b1707]" />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="inline-flex items-center px-6 py-3.5 rounded-2xl op-btn-tan-parchment text-[#3d2314] font-extrabold text-sm sm:text-base uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <Icons.GitBranch className="w-5 h-5 mr-2.5 text-[#7a4f2b]" />
                    Source Code
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                onNextIsland();
              }}
              className="inline-flex items-center px-7 py-3.5 rounded-2xl op-btn-crimson-parchment text-[#f7ebd4] font-black text-sm sm:text-base uppercase tracking-wider transition-colors shadow-xl cursor-pointer"
            >
              <span>{island.id === 'foosha' ? 'SAIL TO BARATIE (NEXT ISLAND)' : 'SAIL TO NEXT ISLAND'}</span>
              <Icons.ArrowRight className="w-5 h-5 ml-2.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Image Preview Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center p-5 bg-[#ebd7b3] border-4 border-[#3d2314] rounded-3xl shadow-2xl overflow-hidden font-serif"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between w-full pb-3 mb-4 border-b-2 border-[#3d2314]/30">
              <span className="text-xl font-black text-[#3d2314] font-wanted flex items-center gap-2">
                <Icons.Maximize2 className="w-5 h-5 text-[#7a4f2b]" />
                {lightboxImage.title} — Full Image Preview
              </span>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-2 rounded-xl bg-[#d8b15d] hover:bg-[#c9a04a] text-[#3d2314] border-2 border-[#3d2314] transition-colors cursor-pointer shadow-sm"
                title="Close Image Preview"
              >
                <Icons.X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative flex items-center justify-center bg-[#1e1b2e] rounded-2xl p-6 border-2 border-[#3d2314]/60 max-h-[70vh] overflow-hidden shadow-inner">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-h-[65vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
