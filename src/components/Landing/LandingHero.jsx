import React from 'react';
import * as Icons from 'lucide-react';
import { soundEngine } from '../../utils/audio';
import portfolioImg from '../../assets/portfolio.png';

export function LandingHero({ onStartAdventure, onOpenCrew, weatherMode = 'noon', onCycleWeather, isMuted, onToggleMute }) {
  return (
    <div className="relative z-20 flex flex-col justify-between min-h-screen p-6 pointer-events-none sm:p-10 select-none">

      {/* Top Bar HUD - Ancient Parchment Scroll Bar */}
      <div className="flex items-center justify-end w-full pointer-events-auto">

        {/* Sound Mute & Weather Mode Control Buttons */}
        <div className="flex items-center space-x-2">
          {/* Time of Day Cycle Button */}
          <button
            onClick={onCycleWeather}
            className="flex items-center space-x-1.5 px-3 py-2.5 rounded-2xl op-btn-tan-parchment text-[#3d2314] font-bold text-xs cursor-pointer shadow-md"
            title={`Current: ${weatherMode.toUpperCase()} Mode (Click to toggle Day / Sunset / Night)`}
          >
            {weatherMode === 'noon' && <Icons.Sun className="w-4 h-4 text-[#d8b15d]" />}
            {weatherMode === 'sunset' && <Icons.Sunset className="w-4 h-4 text-[#f97316]" />}
            {weatherMode === 'night' && <Icons.Moon className="w-4 h-4 text-[#0284c7]" />}
            <span className="hidden sm:inline font-stamp uppercase">{weatherMode}</span>
          </button>

          {/* Sound Mute Button */}
          <button
            onClick={onToggleMute || (() => soundEngine.toggleMute())}
            className="p-3 rounded-2xl op-btn-tan-parchment text-[#7a4f2b] hover:text-[#3d2314] backdrop-blur-md transition-all shadow-md cursor-pointer flex items-center justify-center"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <Icons.VolumeX className="w-4 h-4 text-red-700" /> : <Icons.Volume2 className="w-4 h-4 text-[#7a4f2b]" />}
          </button>
        </div>
      </div>

      {/* Main Center Container */}
      <div className="max-w-4xl my-auto text-center mx-auto space-y-6 pointer-events-auto w-full">

        {/* ANCIENT PARCHMENT SCROLL CONTAINER WITH AUTHENTIC TORN PAPER EDGES */}
        <div className="relative p-6 sm:p-10 op-torn-paper op-parchment-scroll text-[#3d2314] space-y-6">

          {/* Filigree Frame Inner Border */}
          <div className="op-filigree-frame p-6 sm:p-8 space-y-6">

            {/* Top Section: Portfolio Logo Image Header covering 100% of the container */}
            <div className="w-full h-64 sm:h-80 overflow-hidden rounded-2xl border-4 border-[#3d2314] shadow-md">
              <img
                src={portfolioImg}
                alt="One Piece Portfolio Logo Header"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Bottom Content Area */}
            <div className="space-y-4 pt-2">
              {/* Headline Title */}
              <h2 className="text-2xl sm:text-4xl font-black tracking-wider text-[#3d2314] font-parchment uppercase">
                LET'S START THE ADVENTURE!
              </h2>

              {/* Subtitle */}
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#5c391e] leading-relaxed font-sans font-bold">
                Sail the grand line through my project islands and reach the final island "Raftel", to find the secret behind One Piece.
              </p>

              {/* Simple Clean Parchment Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                {/* SET SAIL START BUTTON - Golden Wanted Poster Scroll */}
                <button
                  onClick={() => {
                    onStartAdventure();
                  }}
                  className="group inline-flex items-center justify-center px-8 py-4 rounded-2xl op-btn-gold-parchment font-black text-base sm:text-lg font-sans cursor-pointer"
                >
                  <Icons.Navigation className="w-5 h-5 mr-3 text-[#2b1707] transition-transform group-hover:rotate-45" />
                  <span>SET SAIL TO GRAND LINE</span>
                </button>

                {/* STRAW HAT CREW BUTTON - Tan Parchment Scroll (Temporarily hidden) */}
                {/* <button
                  onClick={() => {
                    soundEngine.playClick();
                    onOpenCrew();
                  }}
                  className="inline-flex items-center justify-center px-7 py-4 rounded-2xl op-btn-tan-parchment font-bold text-base sm:text-lg font-sans cursor-pointer"
                >
                  <Icons.Users className="w-5 h-5 mr-2.5 text-[#7a4f2b]" />
                  <span>Meet Straw Hat Crew</span>
                </button> */}
              </div>

              {/* Card Bottom Footer */}
              <div className="pt-4 mt-2 border-t-2 border-[#3d2314]/30 flex justify-center">
                <span className="text-sm sm:text-lg font-black tracking-widest text-[#3d2314] font-stamp uppercase">
                  BY VARUN SURESH KUMAR (SOFTWARE GARDENER)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
