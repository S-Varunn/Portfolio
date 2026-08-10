import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function Water7City({ position = [0, 0, 0] }) {
  const geyserRef = useRef();
  const waterStreamsRef = useRef();
  const flumesGroupRef = useRef();
  const yagaraBoatsRef = useRef();

  // Generate 60+ terraced Venetian houses across 4 concentric slope rings
  const houses = useMemo(() => {
    const houseList = [];

    // Ring 1 (Sea Wall Perimeter Deck, R=5.2, 24 houses)
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      if (i % 6 === 0) continue; // Skip gaps for dock gates
      houseList.push({
        x: Math.sin(angle) * 5.2,
        y: 1.38,
        z: Math.cos(angle) * 5.2,
        rot: angle,
        color: i % 3 === 0 ? '#dc2626' : i % 2 === 0 ? '#f97316' : '#b91c1c',
        scale: 0.32,
        hasChimney: i % 2 === 0
      });
    }

    // Ring 2 (Lower Conical Hill Slope, R=4.0, 20 houses)
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2 + 0.15;
      if (i % 5 === 0) continue;
      houseList.push({
        x: Math.sin(angle) * 4.0,
        y: 1.85,
        z: Math.cos(angle) * 4.0,
        rot: angle,
        color: i % 3 === 0 ? '#ea580c' : i % 2 === 0 ? '#dc2626' : '#d97706',
        scale: 0.3,
        hasChimney: i % 3 === 0
      });
    }

    // Ring 3 (Middle Conical Hill Slope, R=2.8, 16 houses)
    for (let i = 0; i < 16; i++) {
      const angle = (i / 16) * Math.PI * 2 + 0.3;
      if (i % 4 === 0) continue;
      houseList.push({
        x: Math.sin(angle) * 2.8,
        y: 2.5,
        z: Math.cos(angle) * 2.8,
        rot: angle,
        color: i % 2 === 0 ? '#dc2626' : '#ea580c',
        scale: 0.28,
        hasChimney: i % 2 === 1
      });
    }

    // Ring 4 (Upper Promenade Tier, R=1.8, 12 houses)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + 0.1;
      if (i % 3 === 0) continue;
      houseList.push({
        x: Math.sin(angle) * 1.8,
        y: 3.15,
        z: Math.cos(angle) * 1.8,
        rot: angle,
        color: i % 2 === 0 ? '#b91c1c' : '#d97706',
        scale: 0.25,
        hasChimney: true
      });
    }

    return houseList;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (geyserRef.current) {
      const pulse = 1.0 + Math.sin(time * 4.0) * 0.08;
      geyserRef.current.scale.set(pulse, 1.0 + Math.sin(time * 3.0) * 0.12, pulse);
    }
    if (waterStreamsRef.current) {
      waterStreamsRef.current.rotation.y = time * 0.12;
    }
    if (flumesGroupRef.current) {
      flumesGroupRef.current.children.forEach((flume, idx) => {
        flume.position.y = -0.15 + Math.sin(time * 5.0 + idx) * 0.03;
      });
    }
    if (yagaraBoatsRef.current) {
      yagaraBoatsRef.current.children.forEach((boat, idx) => {
        boat.position.y = 1.98 + Math.sin(time * 2.5 + idx) * 0.04;
      });
    }
  });

  return (
    <group position={position}>
      {/* --- WATER FOAM BASE RING --- */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.8, 7.2, 40]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* --- 1. LOWER CIRCULAR STONE SEA WALL BASE --- */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[5.8, 6.4, 1.4, 32]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
      </mesh>
      {/* Top Trim Ring */}
      <mesh position={[0, 1.32, 0]}>
        <cylinderGeometry args={[5.85, 5.85, 0.12, 32]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>

      {/* GALLEY-LA DOCK GATES & NUMBERED PILLARS (1, 2, 3, 4) */}
      {[
        { angle: 45, num: '1' },
        { angle: 135, num: '2' },
        { angle: 225, num: '3' },
        { angle: 315, num: '4' }
      ].map((dock, idx) => {
        const rad = (dock.angle * Math.PI) / 180;
        const px = Math.sin(rad) * 5.85;
        const pz = Math.cos(rad) * 5.85;
        return (
          <group key={idx} position={[px, 0.7, pz]} rotation={[0, rad, 0]}>
            {/* Dock Gate Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.2, 1.2, 0.3]} />
              <meshStandardMaterial color="#e2e8f0" />
            </mesh>
            {/* Dark Gate Opening */}
            <mesh position={[0, -0.1, 0.1]}>
              <boxGeometry args={[0.7, 0.9, 0.2]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
            {/* Bold Dock Number */}
            <Text
              position={[0, 0.45, 0.17]}
              fontSize={0.42}
              color="#0f172a"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              {dock.num}
            </Text>

            {/* GALLEY-LA DOCKYARD CRANES OVERHEAD */}
            <group position={[0, 0.9, -0.2]}>
              <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.04, 0.05, 1.2]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
              <mesh position={[0.3, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
                <boxGeometry args={[0.7, 0.06, 0.06]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
            </group>
          </group>
        );
      })}

      {/* CASCADING WATERFALL FLUMES SPEWING INTO OCEAN */}
      <group ref={flumesGroupRef}>
        {[0, 90, 180, 270].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <group key={idx} rotation={[0, rad, 0]}>
              {/* Curved Water Flume Spout */}
              <mesh position={[0, 0.5, 5.6]} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[0.7, 0.12, 1.4]} />
                <meshStandardMaterial color="#38bdf8" roughness={0.1} emissive="#0284c7" emissiveIntensity={0.3} />
              </mesh>
              {/* Ocean Foam Splash at Base */}
              <mesh position={[0, -0.05, 6.2]}>
                <sphereGeometry args={[0.4, 10, 10]} />
                <meshBasicMaterial color="#e0f2fe" transparent opacity={0.7} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* FRONT GALLEY-LA HEADQUARTERS ENTRANCE COLONNADE */}
      <group position={[0, 0.6, 5.8]}>
        {/* Colonnade Base Deck */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[2.8, 0.2, 1.0]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        {/* White Columns */}
        {[-1.1, -0.7, -0.3, 0.3, 0.7, 1.1].map((cx, idx) => (
          <mesh key={idx} position={[cx, 0.25, 0]}>
            <cylinderGeometry args={[0.06, 0.07, 0.7, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
        {/* Entrance Portico Pediment Roof */}
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[2.9, 0.2, 1.1]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.9, 0.9, 0.9]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
      </group>

      {/* PROMENADE STREET LANTERN POSTS */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <group key={idx} position={[Math.sin(rad) * 5.6, 1.38, Math.cos(rad) * 5.6]}>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.02, 0.03, 0.6]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.2} />
            </mesh>
          </group>
        );
      })}

      {/* --- 2. CONICAL HILLSIDE & TERRACED CITY HOUSES --- */}
      {/* Conical Hill Base Slope */}
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[5.2, 2.8, 32]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.7} />
      </mesh>

      {/* 4 Radial Blue Water Canals running down the slopes */}
      {[0, 90, 180, 270].map((angle, idx) => (
        <group key={idx} rotation={[0, (angle * Math.PI) / 180, 0]}>
          <mesh position={[0, 2.0, 2.6]} rotation={[0.42, 0, 0]}>
            <boxGeometry args={[0.55, 0.08, 4.4]} />
            <meshStandardMaterial color="#38bdf8" roughness={0.1} emissive="#0284c7" emissiveIntensity={0.3} />
          </mesh>

          {/* Arch Stone Bridges Crossing Canals */}
          <mesh position={[0, 2.15, 2.6]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.12, 0.3]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        </group>
      ))}

      {/* ICONIC YAGARA BULL WATER ROWBOATS IN CANALS */}
      <group ref={yagaraBoatsRef}>
        {[
          { angle: 0, r: 2.8 },
          { angle: 90, r: 3.2 },
          { angle: 180, r: 2.4 },
          { angle: 270, r: 3.0 }
        ].map((b, idx) => {
          const rad = (b.angle * Math.PI) / 180;
          return (
            <group
              key={idx}
              position={[Math.sin(rad) * b.r, 1.98, Math.cos(rad) * b.r]}
              rotation={[0, rad + Math.PI / 2, 0]}
            >
              {/* Boat Hull */}
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.25, 0.12, 0.6]} />
                <meshStandardMaterial color="#0284c7" />
              </mesh>
              {/* Cute Yagara Bull Horns at Front */}
              <mesh position={[0, 0.1, 0.3]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Terraced Houses Clusters (60+ Houses) */}
      {houses.map((house, idx) => (
        <group
          key={idx}
          position={[house.x, house.y, house.z]}
          rotation={[0, house.rot, 0]}
          scale={[house.scale, house.scale, house.scale]}
        >
          {/* House Body */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[1.2, 1.0, 1.2]} />
            <meshStandardMaterial color="#fef3c7" roughness={0.6} />
          </mesh>
          {/* Windows */}
          <mesh position={[0, 0.6, 0.61]}>
            <boxGeometry args={[0.3, 0.3, 0.02]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          {/* Roof */}
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[1.0, 0.8, 4]} rotation={[0, Math.PI / 4, 0]} />
            <meshStandardMaterial color={house.color} roughness={0.4} />
          </mesh>
          {/* Chimney */}
          {house.hasChimney && (
            <mesh position={[0.3, 1.3, 0]}>
              <boxGeometry args={[0.2, 0.4, 0.2]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
          )}
        </group>
      ))}

      {/* --- 3. UPPER CIRCULAR PROMENADE & FOUNTAIN RING --- */}
      <group position={[0, 3.7, 0]}>
        {/* Upper Ring Base */}
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[2.2, 2.6, 0.7, 24]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.5} />
        </mesh>
        {/* Arched Portals Around Ring */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh
              key={idx}
              position={[Math.sin(rad) * 2.22, 0.35, Math.cos(rad) * 2.22]}
              rotation={[0, rad, 0]}
            >
              <boxGeometry args={[0.4, 0.45, 0.1]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          );
        })}
      </group>

      {/* --- 4. COLOSSAL GIANT FOUNTAIN SPIRE & UMBRELLA WATER CANOPY --- */}
      <group position={[0, 4.4, 0]}>
        {/* Fountain Stem & Middle Catchment Basin */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.45, 0.65, 1.4, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <cylinderGeometry args={[1.3, 0.9, 0.45, 20]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.44, 0]}>
          <cylinderGeometry args={[1.18, 1.18, 0.08, 20]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.1} />
        </mesh>

        {/* --- GIANT WATER UMBRELLA CANOPY SHELL --- */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.35, 2.8, 3.8, 28, 1, true]} />
          <meshStandardMaterial
            color="#38bdf8"
            transparent
            opacity={0.55}
            emissive="#0284c7"
            emissiveIntensity={0.35}
            side={THREE.DoubleSide}
            roughness={0.1}
          />
        </mesh>

        {/* --- CASCADING STRIPED WATER UMBRELLA RIBBONS --- */}
        <group ref={waterStreamsRef} position={[0, 2.2, 0]}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <group key={idx} rotation={[0, rad, 0]}>
                <mesh position={[1.2, 0, 0]} rotation={[0, 0, -0.55]}>
                  <cylinderGeometry args={[0.08, 0.18, 4.0, 8]} />
                  <meshStandardMaterial
                    color={idx % 2 === 0 ? '#e0f2fe' : '#38bdf8'}
                    transparent
                    opacity={0.85}
                    emissive="#0284c7"
                    emissiveIntensity={0.4}
                  />
                </mesh>
              </group>
            );
          })}
        </group>

        {/* --- GEYSER FOUNTAIN APEX SPIRE (SHOOTING UP FROM UMBRELLA TOP) --- */}
        <mesh ref={geyserRef} position={[0, 4.2, 0]}>
          <coneGeometry args={[0.4, 2.2, 16]} />
          <meshStandardMaterial
            color="#e0f2fe"
            transparent
            opacity={0.9}
            emissive="#38bdf8"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Top Water Spray Tip */}
        <mesh position={[0, 5.3, 0]}>
          <coneGeometry args={[0.18, 0.7, 12]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
        </mesh>
      </group>
    </group>
  );
}
