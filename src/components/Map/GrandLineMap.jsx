import React from 'react';
import * as Icons from 'lucide-react';
import { ISLANDS } from '../../data/islands';
import { soundEngine } from '../../utils/audio';

export function GrandLineMap({ isOpen, onClose, currentIsland, onSelectIsland }) {
  if (!isOpen) return null;

  // Helper to render Lucide icon
  const renderIcon = (iconName, className = 'w-5 h-5') => {
    const IconComponent = Icons[iconName] || Icons.MapPin;
    return <IconComponent className={className} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col op-torn-paper op-parchment-scroll text-[#3d2314] shadow-2xl">
        
        {/* Filigree Inner Frame Container */}
        <div className="op-filigree-frame flex flex-col h-full w-full overflow-hidden">
          
          {/* Map Parchment Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#ebd7b3] border-b-4 border-[#3d2314] text-[#3d2314]">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-[#d8b15d] text-[#2b1707] border border-[#3d2314]">
                <Icons.Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-widest text-[#3d2314] font-wanted uppercase">
                  Grand Line Navigational Parchment Map
                </h2>
                <p className="text-xs text-[#5c391e] font-stamp">
                  Click any island along the Log Pose trajectory to set sail with the Thousand Sunny
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="p-2 rounded-xl op-btn-tan-parchment text-[#3d2314] cursor-pointer"
            >
              <Icons.X className="w-6 h-6" />
            </button>
          </div>

          {/* Parchment Canvas Area */}
          <div className="relative flex-1 w-full h-full bg-[#f5e5c8] overflow-hidden p-6 select-none">
            {/* Parchment Texture Gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3d2314]/15 via-transparent to-[#3d2314]/15 pointer-events-none" />
            
            {/* Grid Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3d2314" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Compass Rose Graphic Background */}
            <div className="absolute top-10 right-12 opacity-15 pointer-events-none text-[#3d2314]">
              <Icons.Compass className="w-48 h-48" />
            </div>

            {/* Dotted Navigation Route Path */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={ISLANDS.reduce((acc, island, idx) => {
                  const prefix = idx === 0 ? 'M' : 'L';
                  return `${acc} ${prefix} ${island.coordinates.x}% ${island.coordinates.y}%`;
                }, '')}
                fill="none"
                stroke="#c49437"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
            </svg>

            {/* Island Pin Nodes */}
            {ISLANDS.map((island, index) => {
              const isCurrent = currentIsland?.id === island.id;
              return (
                <div
                  key={island.id}
                  style={{
                    left: `${island.coordinates.x}%`,
                    top: `${island.coordinates.y}%`
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => {
                    soundEngine.playClick();
                    onSelectIsland(island);
                    onClose();
                  }}
                >
                  {/* Island Pin Node Container */}
                  <div className="relative flex flex-col items-center">
                    
                    {/* Current Thousand Sunny Boat Indicator Badge */}
                    {isCurrent && (
                      <div className="absolute -top-10 flex items-center px-2.5 py-1 rounded-full op-btn-crimson-parchment text-[#f7ebd4] font-black text-[10px] uppercase shadow-lg border border-[#3d2314] animate-bounce font-stamp">
                        <Icons.Navigation className="w-3 h-3 mr-1" />
                        SUNNY IS HERE
                      </div>
                    )}

                    {/* Marker Pin Circle */}
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 shadow-xl transition-transform group-hover:scale-125 ${
                        isCurrent
                          ? 'op-btn-gold-parchment ring-4 ring-[#c49437]/40 font-black'
                          : island.isFinal
                          ? 'op-btn-crimson-parchment font-black'
                          : 'op-btn-tan-parchment font-black'
                      }`}
                    >
                      <span className="font-bold font-mono text-xs">{index + 1}</span>
                    </div>

                    {/* Island Name & Badge Card */}
                    <div className="mt-2 text-center rounded-xl op-btn-tan-parchment px-3 py-1.5 border-2 border-[#3d2314] shadow-md text-[#3d2314] whitespace-nowrap group-hover:bg-[#d8b15d] group-hover:text-[#2b1707] transition-colors">
                      <div className="flex items-center justify-center space-x-1.5">
                        {renderIcon(island.iconName, 'w-3.5 h-3.5')}
                        <span className="text-xs font-black font-parchment">{island.name}</span>
                      </div>
                      <span className="block text-[10px] text-[#7a4f2b] font-stamp group-hover:text-[#2b1707]">
                        {island.badgeText}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer info bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#ebd7b3] text-[#5c391e] text-xs border-t-4 border-[#3d2314] font-stamp">
            <div className="flex items-center space-x-2">
              <Icons.Anchor className="w-4 h-4 text-[#7a4f2b]" />
              <span>GRAND LINE SEA CHART • 6 RECORDED ISLANDS</span>
            </div>
            <div>CLICK ANY ISLAND TO PLOT COURSE</div>
          </div>
        </div>
      </div>
    </div>
  );
}
