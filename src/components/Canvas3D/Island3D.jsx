import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { DetailedTree, CherryBush, BrickWindmill, FooshaGroundDetails, DockPeopleAndBoats } from './FooshaDetails';
import { BaratieShip } from './BaratieShip';
import { AlabastaPalace } from './AlabastaPalace';
import { Water7City } from './Water7City';
import { WanoKingdom } from './WanoKingdom';
import { LaughTaleIsland } from './LaughTaleIsland';

// Procedural organic terrain geometry helper with height displacement
function createOrganicTerrain(radius, height, roughnessScale = 0.45) {
  const geo = new THREE.CylinderGeometry(radius * 0.85, radius * 1.1, height, 28, 10);
  const pos = geo.attributes.position;
  
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Displace top vertices and outer sides for realistic terrain contouring
    if (y > -height * 0.4) {
      const noise = (Math.sin(x * 1.3) * Math.cos(z * 1.3) + Math.sin(x * 2.8 + z * 1.8) * 0.5) * roughnessScale;
      pos.setX(i, x + noise * 0.5);
      pos.setZ(i, z + noise * 0.5);
      pos.setY(i, y + Math.abs(noise) * 0.6);
    }
  }

  geo.computeVertexNormals();
  return geo;
}

// --- CELESTIAL LIGHT RAY BEAM WITH RISING ENERGY PARTICLES ---
function CelestialLightBeam({ accentColor, isSelected }) {
  const coreRef = useRef();
  const shaftRef = useRef();
  const flareRef = useRef();
  const particlesGroupRef = useRef();
  const impactRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate light ray shafts gently
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.015;
    }
    if (shaftRef.current) {
      shaftRef.current.rotation.y -= 0.012;
      const pulse = 0.16 + Math.sin(time * 3.0) * 0.05;
      shaftRef.current.material.opacity = isSelected ? pulse + 0.15 : pulse;
    }
    if (flareRef.current) {
      flareRef.current.rotation.y += 0.008;
    }

    // Animate rising light particles floating upwards along the beam shaft
    if (particlesGroupRef.current) {
      particlesGroupRef.current.children.forEach((p, idx) => {
        const speed = 2.0 + (idx % 4) * 0.5;
        p.position.y = ((time * speed + idx * 0.9) % 22) + 0.2;
        const radius = 0.12 + (p.position.y / 22) * 0.6;
        p.position.x = Math.sin(time * 2.0 + idx * 0.7) * radius;
        p.position.z = Math.cos(time * 2.0 + idx * 0.7) * radius;

        // Soft fade out as particles reach top
        const progress = p.position.y / 22;
        p.material.opacity = Math.sin(progress * Math.PI) * (isSelected ? 0.6 : 0.35);
      });
    }

    // Animate impact ring ripple at ground level
    if (impactRingRef.current) {
      const ringScale = 1.0 + Math.sin(time * 3.5) * 0.12;
      impactRingRef.current.scale.set(ringScale, ringScale, 1);
      impactRingRef.current.material.opacity = 0.25 + Math.sin(time * 3.5) * 0.1;
    }
  });

  return (
    <group>
      {/* 1. Subtle Impact Light Ring Pool at Ground Base */}
      <mesh ref={impactRingRef} position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Soft Narrow Core Beam */}
      <mesh ref={coreRef} position={[0, 11.5, 0]}>
        <cylinderGeometry args={[0.06, 0.22, 23, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 3. Main Soft Colored Volumetric Light Shaft */}
      <mesh ref={shaftRef} position={[0, 11.5, 0]}>
        <cylinderGeometry args={[0.2, 0.8, 23, 16]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Outer Soft Volumetric Flare Cone */}
      <mesh ref={flareRef} position={[0, 11.5, 0]}>
        <cylinderGeometry args={[0.4, 1.5, 23, 16, 1, true]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* 5. Delicate Rising Sparkles Floating Upward */}
      <group ref={particlesGroupRef}>
        {Array.from({ length: 16 }).map((_, idx) => (
          <mesh key={idx} position={[0, (idx * 1.3) % 22, 0]}>
            <sphereGeometry args={[idx % 2 === 0 ? 0.07 : 0.045, 8, 8]} />
            <meshBasicMaterial
              color={idx % 3 === 0 ? '#ffffff' : idx % 2 === 0 ? '#fef08a' : accentColor}
              transparent
              opacity={0.4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function Island3D({ island, isSelected, isModalOpen, onClick }) {
  const groupRef = useRef();
  const beaconRef = useRef();
  const windmillRef = useRef();
  const foamRef = useRef();

  const { worldX, worldZ } = island.coordinates;

  // Pre-generate perfectly balanced terrain geometry once per island
  const terrainGeo = useMemo(() => {
    return createOrganicTerrain(6.8, 1.8, 0.5);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Rotate light beacon
    if (beaconRef.current) {
      beaconRef.current.rotation.y += 0.015;
    }

    // Rotate Foosha Windmill blades
    if (windmillRef.current) {
      windmillRef.current.rotation.z += 0.03;
    }

    // Animate shore water foam pulse
    if (foamRef.current) {
      const scale = 1 + Math.sin(time * 2.0) * 0.03;
      foamRef.current.scale.set(scale, 1, scale);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[worldX, 0, worldZ]}
      onClick={(e) => {
        e.stopPropagation();
        onClick(island);
      }}
    >
      {/* --- WATER SHORE FOAM RING --- */}
      <mesh ref={foamRef} position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.2, 8.6, 40]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* --- SAND BEACH BASE (Hidden for Baratie, Water 7, Wano & Raftel) --- */}
      {island.id !== 'baratie' && island.id !== 'water7' && island.id !== 'wano' && island.id !== 'raftel' && (
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[7.6, 8.4, 0.45, 28]} />
          <meshStandardMaterial
            color={island.id === 'alabasta' ? '#f59e0b' : island.id === 'wano' ? '#e2e8f0' : '#fef08a'}
            roughness={0.9}
          />
        </mesh>
      )}

      {/* --- ORGANIC ISLAND TERRAIN (Hidden for Baratie, Water 7, Wano & Raftel) --- */}
      {island.id !== 'baratie' && island.id !== 'water7' && island.id !== 'wano' && island.id !== 'raftel' && (
        <mesh geometry={terrainGeo} position={[0, 0.9, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            color={
              island.id === 'alabasta' ? '#d97706' :
              island.id === 'wano' ? '#15803d' :
              island.id === 'water7' ? '#0284c7' :
              island.id === 'raftel' ? '#451a03' : '#16a34a'
            }
            roughness={0.8}
          />
        </mesh>
      )}

      {/* --- EXTENDED THOUSAND SUNNY WOODEN DOCK PIER (Hidden for Baratie Sea Restaurant) --- */}
      {island.id !== 'baratie' && (
        <group position={[0, 0.3, 11.8]}>
          {/* Extended Wooden Planks Platform (Length: 9.6 units extending into open water) */}
          <mesh position={[0, 0.15, 0]}>
            <boxGeometry args={[2.6, 0.25, 9.6]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          
          {/* Dark Timber Edges */}
          <mesh position={[1.25, 0.28, 0]}>
            <boxGeometry args={[0.12, 0.12, 9.6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[-1.25, 0.28, 0]}>
            <boxGeometry args={[0.12, 0.12, 9.6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>

          {/* Wooden Support Posts under Pier */}
          {[
            [-1.1, -4.2], [1.1, -4.2], [-1.1, -2.1], [1.1, -2.1],
            [-1.1, 0], [1.1, 0], [-1.1, 2.1], [1.1, 2.1], [-1.1, 4.2], [1.1, 4.2]
          ].map(([px, pz], idx) => (
            <mesh key={idx} position={[px, -0.6, pz]}>
              <cylinderGeometry args={[0.14, 0.16, 1.6, 8]} />
              <meshStandardMaterial color="#3b1a07" />
            </mesh>
          ))}

          {/* Mooring Cleats / Posts along Pier Edge */}
          {[-3.8, -1.2, 1.2, 3.8].map((cz, idx) => (
            <group key={idx} position={[-1.15, 0.35, cz]}>
              <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.25, 0]}>
                <boxGeometry args={[0.08, 0.06, 0.32]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
              </mesh>
            </group>
          ))}

          {/* Dock Lantern Lamp Posts */}
          {[-4.4, 0, 4.4].map((lz, idx) => (
            <group key={idx} position={[1.1, 0.3, lz]}>
              <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.05, 0.06, 1.6, 8]} />
                <meshStandardMaterial color="#18181b" />
              </mesh>
              {/* Lantern Glowing Glass */}
              <mesh position={[0, 1.6, 0]}>
                <sphereGeometry args={[0.22, 12, 12]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.2} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* --- ISLAND SPECIFIC BIOME & ARCHITECTURE --- */}

      {/* Render Dock People & Standby Fishing Boats on the Pier for Foosha */}
      {island.id === 'foosha' && <DockPeopleAndBoats />}

      {/* 1. FOOSHA VILLAGE (Dawn Island) */}
      {island.id === 'foosha' && (
        <group>
          {/* Ground Detailing: Winding Dirt Path, Grass Patches, Cobblestones */}
          <FooshaGroundDetails />

          <group position={[0, 1.8, 0]}>
            {/* Mountain Backdrop */}
            <mesh position={[0, 1.0, -0.6]}>
              <coneGeometry args={[3.2, 2.8, 16]} />
              <meshStandardMaterial color="#15803d" roughness={0.7} />
            </mesh>

            {/* Brick Windmill */}
            <BrickWindmill position={[-2.2, 0.0, 1.0]} />

            {/* Village Houses */}
            {[
              { x: 1.8, z: 1.2, rot: 0.3 },
              { x: 1.0, z: -1.8, rot: -0.4 },
              { x: -1.4, z: -1.4, rot: 0.8 }
            ].map((house, idx) => (
              <group key={idx} position={[house.x, 0.35, house.z]} rotation={[0, house.rot, 0]}>
                <mesh position={[0, 0.4, 0]}>
                  <boxGeometry args={[1.0, 0.7, 1.0]} />
                  <meshStandardMaterial color="#fef3c7" />
                </mesh>
                <mesh position={[0, 0.9, 0]}>
                  <coneGeometry args={[0.9, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
                  <meshStandardMaterial color="#b91c1c" />
                </mesh>
              </group>
            ))}

            {/* Detailed Trees with Trunk Branches & Multi-layered Foliage */}
            {[
              { x: -1.0, z: 2.2, s: 0.95 },
              { x: 2.2, z: -0.6, s: 1.0 },
              { x: 2.6, z: 0.8, s: 1.1 },
              { x: -2.6, z: -0.6, s: 0.85 }
            ].map((tree, idx) => (
              <DetailedTree key={idx} position={[tree.x, 0.0, tree.z]} scale={tree.s} />
            ))}

            {/* Cherry Bushes with Detailed Leaves and Red Cherries */}
            {[
              { x: -0.4, z: 1.8, s: 0.9 },
              { x: 1.2, z: 1.8, s: 1.0 },
              { x: 0.2, z: -1.4, s: 0.85 },
              { x: 2.2, z: 2.0, s: 0.95 },
              { x: -1.8, z: 1.9, s: 1.0 }
            ].map((bush, idx) => (
              <CherryBush key={idx} position={[bush.x, 0.0, bush.z]} scale={bush.s} />
            ))}
          </group>
        </group>
      )}

      {/* 2. BARATIE (Sea Restaurant Floating Ship) */}
      {island.id === 'baratie' && (
        <BaratieShip position={[0, 0, 0]} />
      )}

      {/* 3. ALABASTA (Desert Oasis & Alubarna Royal Palace) */}
      {island.id === 'alabasta' && (
        <AlabastaPalace position={[0, 1.3, 0]} />
      )}

      {/* 4. WATER 7 (Capital of Water Fountain City) */}
      {island.id === 'water7' && (
        <Water7City position={[0, 0, 0]} />
      )}

      {/* 5. WANO COUNTRY (Flower Capital & Shogun Castle) */}
      {island.id === 'wano' && (
        <WanoKingdom position={[0, 0, 0]} />
      )}

      {/* 6. RAFTEL (Laugh Tale Ancient Island) */}
      {island.id === 'raftel' && (
        <LaughTaleIsland position={[0, 0, 0]} />
      )}

      {/* --- VOLUMETRIC CELESTIAL LIGHT RAY BEAM & RISING ENERGY PARTICLES --- */}
      <CelestialLightBeam accentColor={island.accentColor} isSelected={isSelected} />

      {/* --- HTML OVERLAY LABEL (Hidden when modals are open) --- */}
      {!isModalOpen && (
        <Html
          position={[0, 10.5, 0]}
          center
          distanceFactor={35}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            className={`px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-2xl transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
              isSelected
                ? 'bg-amber-950/90 border-amber-400 text-amber-300 scale-110 shadow-amber-500/30'
                : 'bg-slate-950/85 border-slate-700/80 text-slate-100 hover:border-amber-400/60'
            }`}
          >
            <span className="text-base">⚓</span>
            <span className="font-bold text-sm tracking-wider uppercase drop-shadow">
              {island.name}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}
