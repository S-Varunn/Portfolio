import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { STRAW_HAT_CREW } from '../../data/characters';
import { soundEngine } from '../../utils/audio';

export function StrawHatCrew({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(STRAW_HAT_CREW[0]);

  if (!isOpen) return null;

  // Helper to dynamically render Lucide icon by name
  const renderIcon = (iconName, className = 'w-5 h-5') => {
    const IconComponent = Icons[iconName] || Icons.Shield;
    return <IconComponent className={className} />;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl overflow-hidden border-8 border-[#3d2314] op-torn-paper op-parchment-scroll text-[#3d2314] shadow-2xl font-serif">
        
        {/* Filigree Inner Frame */}
        <div className="op-filigree-frame flex flex-col h-full w-full overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b-4 border-[#3d2314] bg-[#ebd7b3] text-[#3d2314]">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl op-btn-crimson-parchment text-[#f7ebd4]">
                <Icons.Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-wider text-[#3d2314] font-wanted uppercase">
                  Straw Hat Pirates Crew Roster
                </h2>
                <p className="text-xs text-[#5c391e] font-stamp">
                  WANTED BOUNTY RECORDS • THOUSAND SUNNY FLEET
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

          {/* Content Body */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[80vh] overflow-y-auto">
            {/* Left Sidebar: Character Selector */}
            <div className="md:col-span-5 border-r-4 border-[#3d2314] bg-[#ebd7b3] p-4 space-y-2">
              {STRAW_HAT_CREW.map((member) => {
                const isSelected = activeTab.id === member.id;
                return (
                  <button
                    key={member.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveTab(member);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border-2 cursor-pointer ${
                      isSelected
                        ? 'op-btn-gold-parchment font-black'
                        : 'op-btn-tan-parchment font-bold opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${isSelected ? 'bg-[#3d2314] text-[#f7ebd4]' : 'bg-[#ebd7b3] text-[#3d2314]'}`}
                      >
                        {renderIcon(member.iconName)}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-sm leading-tight font-parchment">{member.name}</p>
                        <p className={`text-xs ${isSelected ? 'text-[#2b1707]' : 'text-[#5c391e]'}`}>{member.title}</p>
                      </div>
                    </div>
                    <Icons.ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#2b1707] translate-x-1' : 'text-[#5c391e]'}`} />
                  </button>
                );
              })}
            </div>

            {/* Right Main Area: Wanted Poster Character Card */}
            <div className="md:col-span-7 p-6 space-y-6 bg-[#f5e5c8] text-[#3d2314]">
              {/* Wanted Poster Card Header */}
              <div className="p-4 op-torn-paper bg-[#ebd7b3] border-4 border-[#3d2314] text-center space-y-2">
                <span className="block text-xs font-black uppercase tracking-widest text-[#b91c1c] font-stamp">
                  WANTED DEAD OR ALIVE
                </span>
                <h3 className="text-3xl font-black text-[#3d2314] font-wanted tracking-wide">{activeTab.name}</h3>
                <p className="text-xs font-bold text-[#5c391e] uppercase font-stamp">{activeTab.epithet} • {activeTab.title}</p>
                
                {/* Bounty Value Badge */}
                <div className="mt-2 py-2 px-4 rounded-xl op-btn-gold-parchment inline-block font-mono border-2 border-[#3d2314] shadow-sm">
                  <span className="block text-[9px] uppercase tracking-widest text-[#7a4f2b] font-stamp">REWARD</span>
                  <span className="text-lg font-black text-[#2b1707]">{activeTab.bounty}</span>
                </div>
              </div>

              {/* Quote Block */}
              <div className="p-4 op-torn-paper border-l-4 bg-[#ebd7b3]/80 border-[#3d2314] italic text-[#5c391e] text-base font-bold">
                "{activeTab.quote}"
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#3d2314] font-stamp">Architectural Role</h4>
                <p className="text-base font-semibold text-[#3d2314] leading-relaxed font-sans">{activeTab.description}</p>
              </div>

              {/* Stats Breakdown */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#3d2314] font-stamp mb-2">Attribute Metrics</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.entries(activeTab.stats).map(([statKey, statVal]) => (
                    <div key={statKey} className="p-3 op-torn-paper bg-[#ebd7b3] border-2 border-[#3d2314] text-center">
                      <span className="block text-xs font-bold text-[#3d2314] font-stamp">{statKey}</span>
                      <span className="text-sm font-black text-[#7a4f2b] font-mono mt-1 block">{statVal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
