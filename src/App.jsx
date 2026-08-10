import React, { useState, useCallback, useRef, useEffect } from 'react';
import { OceanCanvas } from './components/Canvas3D/OceanCanvas';
import { LandingHero } from './components/Landing/LandingHero';
import { StrawHatCrew } from './components/Landing/StrawHatCrew';
import { LogPoseHUD } from './components/Map/LogPoseHUD';
import { GrandLineMap } from './components/Map/GrandLineMap';
import { ProjectModal } from './components/Projects/ProjectModal';
import { RaftelResumeModal } from './components/Resume/RaftelResumeModal';
import { ISLANDS } from './data/islands';
import { soundEngine } from './utils/audio';
import { calculateSeaRoute } from './utils/navigation';

function getInitialWeatherMode() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 17) {
    return 'noon';
  } else if (hour >= 17 && hour < 19) {
    return 'sunset';
  } else {
    return 'night'; // 7:00 PM onwards is Night mode
  }
}

export function App() {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState('hero'); // 'hero' | 'map'
  const [weatherMode, setWeatherMode] = useState(getInitialWeatherMode);
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted);

  const handleToggleMute = useCallback(() => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  }, []);

  // Initialize landing BGM immediately on mount and set up load/movement/focus listeners
  useEffect(() => {
    soundEngine.playLandingBgm();

    const handleImmediateGesture = () => {
      soundEngine.handleUserGesture();
    };

    const events = ['mouseenter', 'mousemove', 'mouseover', 'pointermove', 'scroll', 'wheel', 'focus', 'click', 'keydown', 'touchstart'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleImmediateGesture, { passive: true });
      document.addEventListener(evt, handleImmediateGesture, { passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleImmediateGesture);
        document.removeEventListener(evt, handleImmediateGesture);
      });
    };
  }, []);

  // Cycle through weather modes manually: Day ☀️ -> Sunset 🌅 -> Night 🌙
  const handleCycleWeather = useCallback(() => {
    soundEngine.playClick();
    setWeatherMode((prev) => {
      if (prev === 'noon') return 'sunset';
      if (prev === 'sunset') return 'night';
      return 'noon';
    });
  }, []);

  // Island & Boat Positions
  const initialDock = ISLANDS[0].dockCoordinates || { x: ISLANDS[0].coordinates.worldX, z: ISLANDS[0].coordinates.worldZ };
  const [currentIsland, setCurrentIsland] = useState(ISLANDS[0]);
  const [targetIsland, setTargetIsland] = useState(ISLANDS[0]);
  const [shipPos, setShipPos] = useState({ x: initialDock.worldX, z: initialDock.worldZ });
  const [targetShipPos, setTargetShipPos] = useState({ x: initialDock.worldX, z: initialDock.worldZ });
  const [waypoints, setWaypoints] = useState([{ x: initialDock.worldX, z: initialDock.worldZ }]);
  const [isSailing, setIsSailing] = useState(false);

  // Modals Overlay Visibility State
  const [isCrewOpen, setIsCrewOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isRaftelOpen, setIsRaftelOpen] = useState(false);

  // Timer Ref for Foosha Project Page auto-opening
  const fooshaTimerRef = useRef(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (fooshaTimerRef.current) {
        clearTimeout(fooshaTimerRef.current);
      }
    };
  }, []);

  // Start Adventure from Landing Hero
  const handleStartAdventure = () => {
    soundEngine.playSailingBgm();
    setViewMode('map');
    // Keep the ship at Foosha Village
    setCurrentIsland(ISLANDS[0]);
    setTargetIsland(ISLANDS[0]);
    setIsSailing(false);

    if (fooshaTimerRef.current) {
      clearTimeout(fooshaTimerRef.current);
    }

    // Open Foosha Village project page after 5 seconds
    fooshaTimerRef.current = setTimeout(() => {
      setIsProjectOpen(true);
    }, 5000);
  };

  // Return to Landing Hero Screen
  const handleReturnHero = () => {
    soundEngine.playLandingBgm();
    setViewMode('hero');
  };

  // Select Target Island along the Grand Line
  const handleSelectIsland = useCallback(
    (island) => {
      if (fooshaTimerRef.current) {
        clearTimeout(fooshaTimerRef.current);
        fooshaTimerRef.current = null;
      }

      soundEngine.playSailingBgm();

      setTargetIsland(island);
      const targetDock = island.dockCoordinates || { worldX: island.coordinates.worldX, worldZ: island.coordinates.worldZ };
      setTargetShipPos({ x: targetDock.worldX, z: targetDock.worldZ });

      // Generate intermediate waypoints around obstacle islands
      const route = calculateSeaRoute(shipPos, island, ISLANDS);
      setWaypoints(route);

      setIsSailing(true);

      // Close modal overlays while sailing
      setIsProjectOpen(false);
      setIsRaftelOpen(false);
    },
    [shipPos]
  );

  // Callback when Thousand Sunny arrives at target island pier
  const handleArrival = useCallback(() => {
    setIsSailing(false);
    setCurrentIsland(targetIsland);
    setShipPos(targetShipPos);

    // Open respective project / resume modal upon arrival
    if (targetIsland.isFinal) {
      soundEngine.playRaftelBgm();
      setIsRaftelOpen(true);
    } else {
      setIsProjectOpen(true);
    }
  }, [targetIsland, targetShipPos]);

  // Compute if any modal dialog is currently open
  const isModalOpen = isCrewOpen || isMapOpen || isProjectOpen || isRaftelOpen;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d1b2a] select-none">
      
      {/* 3D WebGL Canvas Background */}
      <OceanCanvas
        currentIsland={currentIsland}
        targetIsland={targetIsland}
        shipPos={shipPos}
        targetShipPos={targetShipPos}
        waypoints={waypoints}
        isSailing={isSailing}
        onArrive={handleArrival}
        weatherMode={weatherMode}
        isModalOpen={isModalOpen}
        onSelectIsland={handleSelectIsland}
      />

      {/* 1. Landing Hero Screen Overlay */}
      {viewMode === 'hero' && (
        <LandingHero
          onStartAdventure={handleStartAdventure}
          onOpenCrew={() => setIsCrewOpen(true)}
          weatherMode={weatherMode}
          onCycleWeather={handleCycleWeather}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 2. Interactive Navigation Log Pose HUD Bar */}
      {viewMode === 'map' && (
        <LogPoseHUD
          currentIsland={currentIsland}
          targetIsland={targetIsland}
          isSailing={isSailing}
          onSelectIsland={handleSelectIsland}
          onOpenMap={() => setIsMapOpen(true)}
          onReturnHero={handleReturnHero}
          weatherMode={weatherMode}
          onCycleWeather={handleCycleWeather}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 3. Straw Hat Crew Roster Modal Overlay */}
      <StrawHatCrew isOpen={isCrewOpen} onClose={() => setIsCrewOpen(false)} />

      {/* 4. 2D Grand Line Navigational Parchment Map Modal Overlay */}
      <GrandLineMap
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentIsland={currentIsland}
        onSelectIsland={handleSelectIsland}
      />

      {/* 5. Island Project Entry Logbook Modal Overlay */}
      <ProjectModal
        island={currentIsland}
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        onNextIsland={() => {
          const currentIndex = ISLANDS.findIndex((i) => i.id === currentIsland.id);
          if (currentIndex < ISLANDS.length - 1) {
            handleSelectIsland(ISLANDS[currentIndex + 1]);
          }
        }}
      />

      {/* 6. Raftel Final Destination Resume & Contact Vault Modal Overlay */}
      <RaftelResumeModal isOpen={isRaftelOpen} onClose={() => setIsRaftelOpen(false)} />
    </div>
  );
}

export default App;
