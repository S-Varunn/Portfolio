import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Unusual Mystical Tree Component: Real organic tree structure with gnarled branches and unusual bioluminescent leaf clusters
function UnusualTree({ position = [0, 0, 0], scale = 1.0, leafColor = '#c026d3', glowColor = '#f472b6' }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Real Gnarled Wooden Trunk */}
      <mesh position={[0, 0.9, 0]} rotation={[0.08, 0, 0.1]}>
        <cylinderGeometry args={[0.12, 0.22, 1.8, 10]} />
        <meshStandardMaterial color="#451a03" roughness={0.85} />
      </mesh>

      {/* Primary Gnarled Side Branch */}
      <mesh position={[0.22, 1.5, 0.1]} rotation={[-0.2, 0.2, -0.55]}>
        <cylinderGeometry args={[0.07, 0.12, 1.1, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.85} />
      </mesh>

      {/* Secondary Upper Branch */}
      <mesh position={[-0.18, 1.8, -0.1]} rotation={[0.2, -0.3, 0.45]}>
        <cylinderGeometry args={[0.06, 0.1, 0.9, 8]} />
        <meshStandardMaterial color="#451a03" roughness={0.85} />
      </mesh>

      {/* Natural Multi-Cloud Leaf Canopy (Unusual Magical Colors) */}
      {/* Central Upper Foliage Cloud */}
      <group position={[0, 2.3, 0]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.85, 14, 14]} />
          <meshStandardMaterial color={leafColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.65, 12, 12]} />
          <meshStandardMaterial color={glowColor} roughness={0.5} emissive={glowColor} emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* Right Branch Foliage Cloud */}
      <group position={[0.55, 1.9, 0.2]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.65, 12, 12]} />
          <meshStandardMaterial color={leafColor} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.15, 0]}>
          <sphereGeometry args={[0.48, 10, 10]} />
          <meshStandardMaterial color={glowColor} roughness={0.5} emissive={glowColor} emissiveIntensity={0.25} />
        </mesh>
      </group>

      {/* Left Branch Foliage Cloud */}
      <group position={[-0.45, 2.1, -0.2]}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.6, 12, 12]} />
          <meshStandardMaterial color={leafColor} roughness={0.6} />
        </mesh>
      </group>

      {/* Unusual Glowing Spore Berries Hanging from Branches */}
      {[
        { x: 0.35, y: 1.4, z: 0.25 },
        { x: -0.3, y: 1.6, z: -0.15 },
        { x: 0.1, y: 1.8, z: -0.3 },
        { x: 0.45, y: 1.7, z: -0.1 }
      ].map((spore, idx) => (
        <mesh key={idx} position={[spore.x, spore.y, spore.z]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function LaughTaleIsland({ position = [0, 0, 0] }) {
  const poneglyphRef = useRef();
  const auraRingRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Pulse glowing Poneglyph ancient characters & aura ring
    if (poneglyphRef.current) {
      poneglyphRef.current.material.emissiveIntensity = 0.4 + Math.sin(time * 3.0) * 0.2;
    }
    if (auraRingRef.current) {
      const scale = 1.0 + Math.sin(time * 2.5) * 0.08;
      auraRingRef.current.scale.set(scale, scale, 1);
      auraRingRef.current.material.opacity = 0.5 + Math.sin(time * 2.5) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* --- 1. MYSTICAL ISLAND TERRAIN BASE --- */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[4.2, 5.2, 1.2, 24]} />
        <meshStandardMaterial color="#1e1b4b" roughness={0.7} />
      </mesh>
      {/* Upper Grassy Plateau */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[4.1, 4.1, 0.1, 24]} />
        <meshStandardMaterial color="#312e81" roughness={0.8} />
      </mesh>

      {/* --- 2. CENTER PIECE: THE ANCIENT ROAD PONEGLYPH --- */}
      <group position={[0, 1.3, 0]}>
        {/* Ancient Octagonal Stone Base Pedestal */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.6, 1.9, 0.5, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[1.35, 1.5, 0.2, 8]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>

        {/* Pulsing Light Aura Ring under Poneglyph */}
        <mesh ref={auraRingRef} position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 1.8, 32]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Massive Crimson Road Poneglyph Block */}
        <mesh ref={poneglyphRef} position={[0, 1.6, 0]}>
          <boxGeometry args={[1.5, 1.9, 1.5]} />
          <meshStandardMaterial
            color="#991b1b"
            emissive="#7f1d1d"
            emissiveIntensity={0.4}
            roughness={0.3}
          />
        </mesh>

        {/* Ancient Inscribed Characters (Gold/Red Engraved Lines on 4 Faces) */}
        {[-0.76, 0.76].map((offsetZ, idx) => (
          <group key={idx} position={[0, 1.6, offsetZ * (idx === 0 ? -1 : 1)]}>
            {[-0.4, 0, 0.4].map((lx, lIdx) => (
              <mesh key={lIdx} position={[lx, 0, 0]}>
                <boxGeometry args={[0.2, 1.3, 0.02]} />
                <meshBasicMaterial color="#fef08a" transparent opacity={0.9} />
              </mesh>
            ))}
          </group>
        ))}

        {/* GOLD TREASURE CHEST & ONE PIECE COINS AT PONEGLYPH BASE */}
        <group position={[0.7, 0.75, 0.7]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.5, 0.35, 0.35]} />
            <meshStandardMaterial color="#78350f" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.25, 0.25, 0.5, 12, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* --- 3. UNUSUAL MYSTICAL TREES (NATURAL BARK & MAGICAL FOLIAGE) --- */}
      {[
        { position: [-2.6, 1.25, 1.8], scale: 1.05, leafColor: '#581c87', glowColor: '#c026d3' },
        { position: [2.6, 1.25, 1.8], scale: 0.95, leafColor: '#065f46', glowColor: '#38bdf8' },
        { position: [-2.8, 1.25, -1.6], scale: 1.0, leafColor: '#9f1239', glowColor: '#fbbf24' },
        { position: [2.8, 1.25, -1.6], scale: 1.1, leafColor: '#1e1b4b', glowColor: '#a855f7' },
        { position: [0.0, 1.25, -2.8], scale: 0.9, leafColor: '#831843', glowColor: '#f472b6' }
      ].map((tree, idx) => (
        <UnusualTree
          key={idx}
          position={tree.position}
          scale={tree.scale}
          leafColor={tree.leafColor}
          glowColor={tree.glowColor}
        />
      ))}

      {/* BIOLUMINESCENT CRYSTAL MUSHROOMS SCATTERED ACROSS THE ISLAND */}
      {[
        { x: -1.4, z: 2.2, color: '#06b6d4' },
        { x: 1.5, z: 2.4, color: '#a855f7' },
        { x: -2.0, z: -0.8, color: '#f43f5e' },
        { x: 2.2, z: -0.6, color: '#eab308' }
      ].map((msh, idx) => (
        <group key={idx} position={[msh.x, 1.27, msh.z]}>
          <mesh position={[0, 0.15, 0]}>
            <cylinderGeometry args={[0.03, 0.05, 0.3, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <coneGeometry args={[0.22, 0.2, 10]} />
            <meshStandardMaterial color={msh.color} emissive={msh.color} emissiveIntensity={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
