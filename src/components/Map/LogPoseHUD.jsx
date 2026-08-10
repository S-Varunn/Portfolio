import React, { useRef } from 'react';
import * as Icons from 'lucide-react';
import { ISLANDS } from '../../data/islands';
import { soundEngine } from '../../utils/audio';

export function LogPoseHUD({
  currentIsland,
  targetIsland,
  isSailing,
  onSelectIsland,
  onOpenMap,
  onReturnHero,
  weatherMode = 'noon',
  onCycleWeather,
  isMuted,
  onToggleMute
}) {
  const scrollRef = useRef(null);

  // Convert vertical mouse scroll into horizontal scrolling for island pills
  const handleWheel = (e) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  // Helper to render Lucide icon
  const renderIcon = (iconName, className = 'w-3.5 h-3.5') => {
    const IconComponent = Icons[iconName] || Icons.MapPin;
    return <IconComponent className={className} />;
  };

  const currentIndex = ISLANDS.findIndex((is) => is.id === (targetIsland?.id || currentIsland?.id));
  const activeIsland = targetIsland || currentIsland || ISLANDS[0];
  const nextIsland = currentIndex < ISLANDS.length - 1 ? ISLANDS[currentIndex + 1] : null;

  return (
    /* SLEEK COMPACT FLOATING LOW-PROFILE HUD BAR */
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[94%] sm:w-auto px-3.5 py-2 rounded-2xl bg-[#ebd7b3]/90 border border-[#3d2314]/40 backdrop-blur-md flex items-center justify-between space-x-3 text-[#3d2314] pointer-events-auto shadow-xl select-none">
      
      {/* Left: Compass & Active Target */}
      <div className="flex items-center space-x-2.5 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#d8b15d] text-[#2b1707] font-bold border border-[#3d2314]/30 shadow-sm">
          <Icons.Compass className={`w-4 h-4 ${isSailing ? 'animate-spin' : ''}`} />
        </div>
        <div>
          <span className="block text-[9px] font-black uppercase tracking-widest text-[#7a4f2b] font-stamp leading-none">
            LOG POSE #{currentIndex + 1}
          </span>
          <h3 className="text-xs sm:text-sm font-black text-[#3d2314] font-serif flex items-center gap-1 truncate max-w-[100px] sm:max-w-[150px] mt-0.5">
            {renderIcon(activeIsland.iconName, 'w-3.5 h-3.5 text-[#7a4f2b]')}
            {activeIsland.name}
          </h3>
        </div>
      </div>

      {/* Center: Mouse-Wheel Scrollable Island Navigation Pills (No Scrollbar) */}
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="flex items-center space-x-1 overflow-x-auto no-scrollbar max-w-[180px] sm:max-w-[340px] md:max-w-[480px] lg:max-w-none mx-2 py-0.5 cursor-grab active:cursor-grabbing"
      >
        {ISLANDS.map((island, idx) => {
          const isActive = activeIsland.id === island.id;
          return (
            <button
              key={island.id}
              onClick={() => {
                soundEngine.playClick();
                onSelectIsland(island);
              }}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'op-btn-gold-parchment font-black'
                  : 'op-btn-tan-parchment font-semibold opacity-85 hover:opacity-100'
              }`}
              title={island.name}
            >
              <span className="font-stamp text-[9px]">{idx + 1}</span>
              <span className="font-sans whitespace-nowrap">{island.name}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Compact Action Buttons */}
      <div className="flex items-center space-x-1.5 shrink-0">
        {/* Sound Mute Control Button */}
        <button
          onClick={onToggleMute || (() => soundEngine.toggleMute())}
          className="p-1.5 rounded-lg op-btn-tan-parchment text-[#3d2314] cursor-pointer flex items-center justify-center text-xs"
          title={isMuted ? "Unmute Audio" : "Mute Audio"}
        >
          {isMuted ? <Icons.VolumeX className="w-3.5 h-3.5 text-red-700" /> : <Icons.Volume2 className="w-3.5 h-3.5 text-[#7a4f2b]" />}
        </button>

        {/* Time of Day Weather Switcher Button */}
        <button
          onClick={onCycleWeather}
          className="p-1.5 rounded-lg op-btn-tan-parchment text-[#3d2314] cursor-pointer flex items-center gap-1 text-xs"
          title={`Weather: ${weatherMode.toUpperCase()} (Click to toggle Day / Sunset / Night)`}
        >
          {weatherMode === 'noon' && <Icons.Sun className="w-3.5 h-3.5 text-[#d8b15d]" />}
          {weatherMode === 'sunset' && <Icons.Sunset className="w-3.5 h-3.5 text-[#f97316]" />}
          {weatherMode === 'night' && <Icons.Moon className="w-3.5 h-3.5 text-[#0284c7]" />}
        </button>

        {/* Next Island Button */}
        {nextIsland && (
          <button
            disabled={isSailing}
            onClick={() => {
              soundEngine.playClick();
              onSelectIsland(nextIsland);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg op-btn-gold-parchment font-black text-xs disabled:opacity-50 cursor-pointer"
            title={`Sail to ${nextIsland.name}`}
          >
            <span>NEXT</span>
            <Icons.ChevronRight className="w-3.5 h-3.5 text-[#2b1707]" />
          </button>
        )}

        {/* 2D Map Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onOpenMap();
          }}
          className="px-2.5 py-1.5 rounded-lg op-btn-tan-parchment font-bold text-xs flex items-center space-x-1 cursor-pointer"
          title="Open Parchment Sea Map"
        >
          <Icons.Map className="w-3.5 h-3.5 text-[#7a4f2b]" />
          <span className="hidden sm:inline">2D MAP</span>
        </button>

        {/* Return Home Hero Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onReturnHero();
          }}
          className="p-1.5 rounded-lg op-btn-tan-parchment text-[#3d2314] cursor-pointer"
          title="Return to Landing Hero"
        >
          <Icons.Home className="w-3.5 h-3.5 text-[#3d2314]" />
        </button>
      </div>
    </div>
  );
}
