import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SkyAndClouds({ weatherMode = 'noon' }) {
  const cloudsRef = useRef();
  const birdsGroupRef = useRef();
  const starsRef = useRef();
  const sunRaysRef = useRef();

  // 1. Generate 900+ Twinkling Night Stars Buffer Geometry
  const { starPositions, starColors } = useMemo(() => {
    const count = 950;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#f0f9ff'),
      new THREE.Color('#e0f2fe'),
      new THREE.Color('#fef08a'),
      new THREE.Color('#bae6fd')
    ];

    for (let i = 0; i < count; i++) {
      const radius = 110 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.85 + 0.15); // Y > 0

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { starPositions: positions, starColors: colors };
  }, []);

  // 2. Generate Detailed Organic 3D Fluffy Cloud Formations
  const cloudClusters = useMemo(() => [
    { x: -55, y: 26, z: -45, scale: 2.6, puffs: [
      [0, 0, 0, 2.8], [2.2, 0.5, 0.4, 2.1], [-2.0, -0.3, 0.5, 2.2],
      [0.6, 1.4, -0.5, 1.9], [-1.2, 1.1, -0.2, 1.7], [3.5, -0.2, -0.2, 1.5],
      [-3.2, 0.2, -0.4, 1.4], [1.2, -0.5, 1.2, 1.8], [-0.8, -0.4, 1.3, 1.6]
    ]},
    { x: -12, y: 30, z: -60, scale: 3.2, puffs: [
      [0, 0, 0, 3.2], [2.8, 0.6, 0.5, 2.4], [-2.5, -0.2, 0.6, 2.5],
      [0.8, 1.8, -0.6, 2.2], [-1.6, 1.4, -0.3, 2.0], [4.2, -0.1, -0.3, 1.8],
      [-3.8, 0.4, -0.5, 1.7], [1.5, -0.6, 1.5, 2.1], [-1.0, -0.5, 1.6, 1.9]
    ]},
    { x: 38, y: 28, z: -50, scale: 2.8, puffs: [
      [0, 0, 0, 3.0], [2.4, 0.5, 0.4, 2.2], [-2.2, -0.3, 0.5, 2.3],
      [0.7, 1.5, -0.5, 2.0], [-1.4, 1.2, -0.2, 1.8], [3.8, -0.2, -0.2, 1.6],
      [-3.5, 0.3, -0.4, 1.5], [1.3, -0.5, 1.3, 1.9], [-0.9, -0.4, 1.4, 1.7]
    ]},
    { x: 72, y: 24, z: -38, scale: 2.3, puffs: [
      [0, 0, 0, 2.5], [2.0, 0.4, 0.3, 1.9], [-1.8, -0.2, 0.4, 1.9],
      [0.5, 1.2, -0.4, 1.6], [-1.0, 1.0, -0.2, 1.5], [3.0, -0.1, -0.2, 1.3],
      [-2.8, 0.2, -0.3, 1.3], [1.0, -0.4, 1.0, 1.5], [-0.7, -0.3, 1.1, 1.4]
    ]},
    { x: -40, y: 27, z: 50, scale: 2.9, puffs: [
      [0, 0, 0, 3.0], [2.5, 0.5, 0.4, 2.3], [-2.3, -0.3, 0.5, 2.3],
      [0.7, 1.6, -0.5, 2.0], [-1.4, 1.3, -0.2, 1.9], [3.9, -0.2, -0.2, 1.7],
      [-3.6, 0.3, -0.4, 1.6], [1.4, -0.5, 1.4, 2.0], [-0.9, -0.4, 1.5, 1.8]
    ]},
    { x: 25, y: 29, z: 55, scale: 3.0, puffs: [
      [0, 0, 0, 3.1], [2.6, 0.6, 0.5, 2.3], [-2.4, -0.2, 0.6, 2.4],
      [0.8, 1.7, -0.6, 2.1], [-1.5, 1.4, -0.3, 1.9], [4.0, -0.1, -0.3, 1.7],
      [-3.7, 0.4, -0.5, 1.6], [1.4, -0.6, 1.4, 2.0], [-1.0, -0.5, 1.5, 1.8]
    ]}
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Drifting 3D clouds
    if (cloudsRef.current) {
      cloudsRef.current.position.x = (time * 0.7) % 130 - 65;
    }

    // 2. Solar rays rotation
    if (sunRaysRef.current) {
      sunRaysRef.current.rotation.z = time * 0.05;
    }

    // 3. Twinkling night stars opacity pulse
    if (starsRef.current && weatherMode === 'night') {
      starsRef.current.rotation.y = time * 0.008;
      if (starsRef.current.material) {
        starsRef.current.material.opacity = 0.8 + Math.sin(time * 2.5) * 0.2;
      }
    }

    // 4. Flying News Coo seagulls flock
    if (birdsGroupRef.current) {
      birdsGroupRef.current.position.x = (time * 4.5) % 190 - 95;
      birdsGroupRef.current.position.z = Math.sin(time * 0.4) * 15;

      birdsGroupRef.current.children.forEach((bird, idx) => {
        const wingL = bird.children[0];
        const wingR = bird.children[1];
        if (wingL && wingR) {
          const flap = Math.sin(time * 8 + idx * 0.8) * 0.5;
          wingL.rotation.z = flap;
          wingR.rotation.z = -flap;
        }
      });
    }
  });

  const skyColors = useMemo(() => {
    switch (weatherMode) {
      case 'sunset':
        return {
          sun: '#fde047',
          glow: '#f97316',
          corona: '#ea580c',
          cloud: '#fed7aa',
          cloudShadow: '#fdba74'
        };
      case 'noon':
        return {
          sun: '#fffbeb',
          glow: '#38bdf8',
          corona: '#fef08a',
          cloud: '#ffffff',
          cloudShadow: '#e2e8f0'
        };
      case 'night':
        return {
          sun: '#e2e8f0', // Silver lunar surface
          glow: '#38bdf8',
          corona: '#0284c7',
          cloud: '#475569',
          cloudShadow: '#334155'
        };
      default:
        return {
          sun: '#fffbeb',
          glow: '#38bdf8',
          corona: '#fef08a',
          cloud: '#ffffff',
          cloudShadow: '#e2e8f0'
        };
    }
  }, [weatherMode]);

  return (
    <group>
      {/* 🌟 1. NIGHT TWINKLING STARS DOME (VISIBLE DURING NIGHT) */}
      {weatherMode === 'night' && (
        <points ref={starsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[starPositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[starColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={1.8}
            vertexColors
            transparent
            opacity={0.9}
            sizeAttenuation={true}
          />
        </points>
      )}

      {/* ☀️ 2A. GOLDEN SUN WITH SOLAR RAYS (DAY & SUNSET MODE) */}
      {weatherMode !== 'night' && (
        <group position={weatherMode === 'sunset' ? [-40, 18, -55] : [28, 42, 28]}>
          {/* Core Sun Sphere */}
          <mesh>
            <sphereGeometry args={[5.0, 32, 32]} />
            <meshBasicMaterial color={skyColors.sun} />
          </mesh>

          {/* Inner Corona Halo */}
          <mesh scale={[1.3, 1.3, 1.3]}>
            <sphereGeometry args={[5.0, 24, 24]} />
            <meshBasicMaterial color={skyColors.corona} transparent opacity={0.45} />
          </mesh>

          {/* Outer Atmosphere Aura */}
          <mesh scale={[1.8, 1.8, 1.8]}>
            <sphereGeometry args={[5.0, 24, 24]} />
            <meshBasicMaterial color={skyColors.glow} transparent opacity={0.25} />
          </mesh>

          {/* Solar Rays Burst */}
          <group ref={sunRaysRef}>
            {[0, 30, 60, 90, 120, 150].map((angle, idx) => (
              <mesh key={idx} rotation={[0, 0, (angle * Math.PI) / 180]}>
                <boxGeometry args={[0.3, 18, 0.1]} />
                <meshBasicMaterial color={skyColors.corona} transparent opacity={0.2} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {/* 🌙 2B. AUTHENTIC 3D SILVER CRESCENT MOON (NIGHT MODE) */}
      {weatherMode === 'night' && (
        <group position={[30, 45, 30]} rotation={[0.2, -0.4, 0.3]}>
          {/* Main Silver Lunar Sphere */}
          <mesh>
            <sphereGeometry args={[4.5, 32, 32]} />
            <meshStandardMaterial
              color="#e2e8f0"
              emissive="#cbd5e1"
              emissiveIntensity={0.22}
              roughness={0.8}
            />
          </mesh>

          {/* Crescent Shadow Cutout (Creates authentic crescent moon phase) */}
          <mesh position={[1.6, 0.4, 1.4]}>
            <sphereGeometry args={[4.4, 32, 32]} />
            <meshBasicMaterial color="#0b1329" />
          </mesh>

          {/* Lunar Craters & Dark Maria Surfaces */}
          {[
            [-1.2, 0.8, 4.0, 0.9],
            [0.5, -1.2, 4.1, 0.7],
            [-0.8, -1.0, 4.1, 0.6],
            [1.2, 1.0, 3.9, 0.8]
          ].map(([cx, cy, cz, cr], cIdx) => (
            <mesh key={cIdx} position={[cx, cy, cz]}>
              <sphereGeometry args={[cr, 12, 12]} />
              <meshBasicMaterial color="#64748b" transparent opacity={0.45} />
            </mesh>
          ))}

          {/* Soft Silver Lunar Atmosphere Halo */}
          <mesh scale={[1.4, 1.4, 1.4]}>
            <sphereGeometry args={[4.5, 24, 24]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.12} />
          </mesh>

          {/* Soft Moonlight Point Light */}
          <pointLight color="#e0f2fe" intensity={1.55} distance={150} decay={1.0} />
        </group>
      )}

      {/* ☁️ 3. MULTI-LAYERED DETAILED ORGANIC 3D FLUFFY CLOUDS */}
      <group ref={cloudsRef}>
        {cloudClusters.map((cluster, cIdx) => (
          <group
            key={cIdx}
            position={[cluster.x, cluster.y, cluster.z]}
            scale={[cluster.scale, cluster.scale, cluster.scale]}
          >
            {cluster.puffs.map(([px, py, pz, pr], pIdx) => (
              <mesh key={pIdx} position={[px, py, pz]}>
                <sphereGeometry args={[pr, 16, 16]} />
                <meshStandardMaterial
                  color={pIdx % 2 === 0 ? skyColors.cloud : skyColors.cloudShadow}
                  roughness={0.95}
                  metalness={0.05}
                  transparent
                  opacity={weatherMode === 'night' ? 0.85 : 0.9}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      {/* 🕊️ 4. ANIMATED FLOCK OF NEWS COO SEAGULLS FLYING OVERHEAD */}
      <group ref={birdsGroupRef} position={[-60, 22, -10]}>
        {[
          { x: 0, y: 0, z: 0 },
          { x: -3, y: 1.5, z: 4 },
          { x: 3, y: 0.8, z: -3 },
          { x: -6, y: -1.0, z: 8 },
          { x: 6, y: 2.0, z: -7 }
        ].map((pos, bIdx) => (
          <group key={bIdx} position={[pos.x, pos.y, pos.z]} rotation={[0, Math.PI / 2, 0]}>
            {/* Left Wing */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0.2]}>
              <boxGeometry args={[0.8, 0.04, 0.3]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Right Wing */}
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, -0.2]}>
              <boxGeometry args={[0.8, 0.04, 0.3]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Bird Body */}
            <mesh position={[0, 0, 0]}>
              <coneGeometry args={[0.12, 0.6, 4]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#f8fafc" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
