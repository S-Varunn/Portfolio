import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { OceanWater } from './OceanWater';
import { ThousandSunny } from './ThousandSunny';
import { Island3D } from './Island3D';
import { IslandClimates } from './IslandClimates';
import { SeaCreaturesAndShips } from './SeaCreaturesAndShips';
import { SkyAndClouds } from './SkyAndClouds';
import { ISLANDS } from '../../data/islands';

// Dynamic Camera Controls: Smoothly frames the ship & active island when idle, tracks ship live position when sailing
function DynamicCameraControls({ ship3DRef, isSailing, targetIsland, currentIsland }) {
  const { camera } = useThree();
  const controlsRef = useRef();
  const cameraOffsetRef = useRef(new THREE.Vector3(-14, 16, 20));

  const activeIsland = targetIsland || currentIsland || ISLANDS[0];
  const dockPos = activeIsland.dockCoordinates || { worldX: activeIsland.coordinates.worldX, worldZ: activeIsland.coordinates.worldZ };
  
  // Center point between active island & dock
  const focusX = (activeIsland.coordinates.worldX + dockPos.worldX) / 2;
  const focusY = 1.2;
  const focusZ = (activeIsland.coordinates.worldZ + dockPos.worldZ) / 2;

  const isTransitioningRef = useRef(true);
  const prevIslandIdRef = useRef(null);

  useEffect(() => {
    if (activeIsland?.id !== prevIslandIdRef.current) {
      prevIslandIdRef.current = activeIsland?.id;
      isTransitioningRef.current = true;

      if (controlsRef.current) {
        // Capture current camera offset relative to target to preserve angle & zoom level without drift
        const currentOffset = camera.position.clone().sub(controlsRef.current.target);
        // Reset to crisp framing distance if offset has drifted or expanded too far
        if (currentOffset.length() > 32 || currentOffset.length() < 10) {
          currentOffset.set(-14, 16, 20);
        }
        cameraOffsetRef.current.copy(currentOffset);
      }
    }
  }, [activeIsland?.id, camera]);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    if (isSailing) {
      // ONLY track camera along with the ship when actively sailing!
      if (ship3DRef && ship3DRef.current) {
        const targetX = ship3DRef.current.position.x;
        const targetZ = ship3DRef.current.position.z;

        const lerpSpeed = Math.min(1.0, delta * 4.0);
        const dx = (targetX - controlsRef.current.target.x) * lerpSpeed;
        const dz = (targetZ - controlsRef.current.target.z) * lerpSpeed;

        controlsRef.current.target.x += dx;
        controlsRef.current.target.z += dz;

        // Keep camera position locked at exact offset relative to target
        camera.position.copy(controlsRef.current.target).add(cameraOffsetRef.current);
        controlsRef.current.update();
      }
    } else if (isTransitioningRef.current) {
      // Smoothly lerp OrbitControls target to focus on active island & ship
      const lerpSpeed = Math.min(1.0, delta * 3.5);
      const dx = (focusX - controlsRef.current.target.x) * lerpSpeed;
      const dy = (focusY - controlsRef.current.target.y) * lerpSpeed;
      const dz = (focusZ - controlsRef.current.target.z) * lerpSpeed;

      controlsRef.current.target.x += dx;
      controlsRef.current.target.y += dy;
      controlsRef.current.target.z += dz;

      // Keep camera position locked at exact offset relative to target
      camera.position.copy(controlsRef.current.target).add(cameraOffsetRef.current);
      controlsRef.current.update();

      // Once camera focus reaches target position, allow free manual orbit/pan
      if (Math.abs(focusX - controlsRef.current.target.x) < 0.15 && Math.abs(focusZ - controlsRef.current.target.z) < 0.15) {
        isTransitioningRef.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      target={[focusX, focusY, focusZ]}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      panSpeed={1.2}
      rotateSpeed={0.8}
      zoomSpeed={1.2}
      minDistance={10}
      maxDistance={45} // Prevents zooming out too far
      maxPolarAngle={Math.PI / 2.05} // Prevent camera dipping underwater
    />
  );
}

export function OceanCanvas({
  currentIsland,
  targetIsland,
  shipPos,
  targetShipPos,
  waypoints = [],
  isSailing,
  isModalOpen = false,
  weatherMode = 'noon',
  onSelectIsland,
  onArrive
}) {
  const ship3DRef = useRef();

  // Determine fog and lighting based on weatherMode
  const lighting = {
    sunset: {
      sunColor: '#fde047',
      skyColor: '#fb923c',
      groundColor: '#0284c7',
      ambientColor: '#38bdf8',
      ambientIntensity: 0.8,
      hemiIntensity: 0.9,
      sunPos: [-35, 22, -40],
      fogColor: '#0f2b48'
    },
    noon: {
      sunColor: '#fef08a',
      skyColor: '#38bdf8',
      groundColor: '#0284c7',
      ambientColor: '#0284c7',
      ambientIntensity: 0.8,
      hemiIntensity: 0.4,
      sunPos: [20, 40, 20],
      fogColor: '#075985'
    },
    night: {
      sunColor: '#e0f2fe', // Radiant Silver Moonlight
      skyColor: '#0f172a',
      groundColor: '#0284c7',
      ambientColor: '#1e293b',
      ambientIntensity: 0.42,
      hemiIntensity: 0.45,
      sunPos: [30, 45, 30], // High Silver Moon Position
      fogColor: '#0b1329'
    }
  }[weatherMode];

  // Initial focus point for Foosha Village (first island)
  const initialIsland = ISLANDS[0];
  const initialDock = initialIsland.dockCoordinates;
  const initialFocusX = (initialIsland.coordinates.worldX + initialDock.worldX) / 2; // -36.6
  const initialFocusZ = (initialIsland.coordinates.worldZ + initialDock.worldZ) / 2; // 25.9

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing">
      <Canvas shadows>
        {/* Fog & Environment */}
        <color attach="background" args={[lighting.fogColor]} />
        <fog attach="fog" args={[lighting.fogColor, 40, 240]} />

        {/* Perspective Camera focused on Foosha Village & Thousand Sunny */}
        <PerspectiveCamera
          makeDefault
          position={[initialFocusX - 14, 17.2, initialFocusZ + 20]}
          fov={50}
          near={0.1}
          far={350}
        />

        {/* BOUNDED DYNAMIC FREE CAMERA ORBIT CONTROLS */}
        <DynamicCameraControls
          ship3DRef={ship3DRef}
          isSailing={isSailing}
          currentIsland={currentIsland}
          targetIsland={targetIsland}
        />

        {/* Lighting */}
        <ambientLight color={lighting.ambientColor} intensity={lighting.ambientIntensity} />
        <hemisphereLight
          skyColor={lighting.skyColor}
          groundColor={lighting.groundColor}
          intensity={lighting.hemiIntensity}
        />
        <directionalLight
          position={lighting.sunPos}
          intensity={weatherMode === 'sunset' ? 2.5 : weatherMode === 'night' ? 1.95 : 1.8}
          color={lighting.sunColor}
          castShadow
        />

        {/* Sky, Drifting 3D Clouds & Animated News Coo Seagulls */}
        <SkyAndClouds weatherMode={weatherMode} />

        {/* Dynamic Shader 3D Ocean Surface */}
        <OceanWater weatherMode={weatherMode} />

        {/* 6 Grand Line Islands along the voyage path */}
        {ISLANDS.map((island) => {
          const isSelected = targetIsland
            ? targetIsland.id === island.id
            : targetShipPos
            ? targetShipPos.x === island.coordinates.worldX && targetShipPos.z === island.coordinates.worldZ
            : false;

          return (
            <React.Fragment key={island.id}>
              <Island3D
                island={island}
                isSelected={isSelected}
                isModalOpen={isModalOpen}
                onClick={onSelectIsland}
              />
              <IslandClimates island={island} />
            </React.Fragment>
          );
        })}

        {/* Animated Sea Creatures & Background Ships */}
        <SeaCreaturesAndShips />

        {/* Interactive 3D Thousand Sunny Ship */}
        <ThousandSunny
          ref={ship3DRef}
          position={shipPos}
          waypoints={waypoints}
          isSailing={isSailing}
          onArrive={onArrive}
          weatherMode={weatherMode}
        />
      </Canvas>
    </div>
  );
}
