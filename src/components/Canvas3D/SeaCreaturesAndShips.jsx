import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function SeaCreaturesAndShips() {
  const seaKingRef = useRef();
  const seaKingTailRef = useRef();
  const baratieFishGroupRef = useRef();
  const fooshaFishGroupRef = useRef();
  const bubblesRef = useRef();
  const foamRef = useRef();
  const backgroundShip1Ref = useRef();
  const backgroundShip2Ref = useRef();

  // Create ascending water bubble particles
  const bubbleParticles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 140;
      positions[i * 3 + 1] = -2.5 + Math.random() * 4.0;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  // Sunken Rubble & Ancient Stone Ruins coordinates on the sea floor
  const sunkenRubbleList = useMemo(() => [
    { x: -10, z: 12, scale: 1.2 },
    { x: 15, z: 5, scale: 1.5 },
    { x: -28, z: -15, scale: 1.0 },
    { x: 30, z: -8, scale: 1.8 },
    { x: 5, z: -25, scale: 1.3 },
    { x: -5, z: 28, scale: 1.1 }
  ], []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 🐉 MULTI-COLORED SEA KING (LIGHT BLUE, DARK BLUE & WHITE)
    if (seaKingRef.current) {
      const emergeY = Math.sin(time * 0.8) * 1.8 - 0.2;
      seaKingRef.current.position.y = emergeY;

      seaKingRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
      seaKingRef.current.rotation.z = Math.sin(time * 1.2) * 0.08;

      if (seaKingTailRef.current) {
        seaKingTailRef.current.rotation.y = Math.sin(time * 2.5) * 0.4;
      }
    }

    // 🐟 BARATIE FISH SCHOOL (-20, -5)
    if (baratieFishGroupRef.current) {
      baratieFishGroupRef.current.rotation.y += delta * 0.85;
    }

    // 🐟 FOOSHA FISH SCHOOL (-35, 20)
    if (fooshaFishGroupRef.current) {
      fooshaFishGroupRef.current.rotation.y += delta * 0.5;
    }

    // 🫧 ASCENDING WATER BUBBLES
    if (bubblesRef.current) {
      const positions = bubblesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] += delta * (0.8 + (i % 3) * 0.4);
        if (positions[i * 3 + 1] > 1.4) {
          positions[i * 3 + 1] = -2.5; // Reset to deep sea bed
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 🌊 ANIMATED WAVE FOAM TRAILS
    if (foamRef.current) {
      foamRef.current.rotation.z = time * 0.05;
    }

    // ⛵ DISTANT BACKGROUND SHIPS
    if (backgroundShip1Ref.current) {
      backgroundShip1Ref.current.position.y = Math.sin(time * 1.5) * 0.2 + 0.1;
      backgroundShip1Ref.current.rotation.z = Math.sin(time * 1.2) * 0.04;
    }
    if (backgroundShip2Ref.current) {
      backgroundShip2Ref.current.position.y = Math.cos(time * 1.3) * 0.2 + 0.1;
      backgroundShip2Ref.current.rotation.z = Math.cos(time * 1.0) * 0.05;
    }
  });

  return (
    <group>
      {/* 🏛️ SUNKEN ANCIENT STONE RUBBLE & CORAL REEFS ON OCEAN BED */}
      {sunkenRubbleList.map((rubble, idx) => (
        <group key={idx} position={[rubble.x, -1.8, rubble.z]} scale={[rubble.scale, rubble.scale, rubble.scale]}>
          {/* Ancient Pillar Segment */}
          <mesh position={[0, 0.4, 0]} rotation={[0.2, idx, 0.3]}>
            <cylinderGeometry args={[0.35, 0.45, 1.4, 8]} />
            <meshStandardMaterial color="#475569" roughness={0.9} />
          </mesh>
          {/* Rubble Rock Base */}
          <mesh position={[0.4, 0.2, 0.3]}>
            <dodecahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#334155" roughness={0.8} />
          </mesh>
          {/* Coral Reef Accent */}
          <mesh position={[-0.3, 0.3, -0.2]}>
            <coneGeometry args={[0.3, 0.7, 5]} />
            <meshStandardMaterial color={idx % 2 === 0 ? '#ef4444' : '#06b6d4'} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* 🐉 MULTI-COLORED SEA KING MONSTER (LIGHT BLUE, DARK BLUE & WHITE) */}
      <group position={[5, -1, 3]} ref={seaKingRef}>
        {/* Head Segment (Light Blue Main Crown) */}
        <mesh position={[0, 2.2, 0]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[1.2, 2.8, 8]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.25} metalness={0.3} />
        </mesh>

        {/* White Belly Plate */}
        <mesh position={[0, 1.8, 0.4]} rotation={[0.2, 0, 0]}>
          <coneGeometry args={[1.0, 2.4, 8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>

        {/* Dark Blue Spine Fins */}
        {[0.6, 1.2, 1.8].map((offsetY, idx) => (
          <mesh key={idx} position={[0, offsetY + 1.2, -0.8]} rotation={[-0.4, 0, 0]}>
            <coneGeometry args={[0.3, 1.2, 4]} />
            <meshStandardMaterial color="#1e3a8a" metalness={0.5} />
          </mesh>
        ))}

        {/* Red Glowing Eyes */}
        <mesh position={[0.45, 2.6, 0.7]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={1.0} />
        </mesh>
        <mesh position={[-0.45, 2.6, 0.7]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#ef4444" emissive="#b91c1c" emissiveIntensity={1.0} />
        </mesh>

        {/* Body Segment 1 (Dark Blue & Light Blue Stripes) */}
        <mesh position={[0, 0.8, -0.6]}>
          <cylinderGeometry args={[1.1, 1.3, 2.2, 12]} />
          <meshStandardMaterial color="#0f2b46" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.8, -0.58]}>
          <cylinderGeometry args={[1.12, 1.32, 0.6, 12]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>

        {/* Tail Segment */}
        <group ref={seaKingTailRef} position={[0, -0.6, -1.8]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.8, 1.1, 2.4, 12]} />
            <meshStandardMaterial color="#1e3a8a" />
          </mesh>
          <mesh position={[0, 0, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[1.1, 2.0, 4]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
        </group>

        {/* Splash Foam Ring */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.4, 3.2, 32]} />
          <meshStandardMaterial color="#e0f2fe" transparent opacity={0.75} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 🐟 LOTS OF FISHES SWIMMING AROUND BARATIE SEA RESTAURANT (-20, -5) */}
      <group position={[-20, 0, -5]} ref={baratieFishGroupRef}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <group key={`b-inner-${idx}`} rotation={[0, (angle * Math.PI) / 180, 0]}>
            <mesh position={[4.2, 0.3, 0]} rotation={[0.2, 0, 0]}>
              <coneGeometry args={[0.18, 0.7, 4]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#38bdf8' : '#0284c7'} metalness={0.7} />
            </mesh>
          </group>
        ))}
        {[20, 80, 140, 200, 260, 320].map((angle, idx) => (
          <group key={`b-outer-${idx}`} rotation={[0, (angle * Math.PI) / 180, 0]}>
            <mesh position={[6.5, 0.45, 0]} rotation={[0.4, 0, 0]}>
              <coneGeometry args={[0.22, 0.8, 4]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#ffffff' : '#0f2b46'} metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 🐟 SCHOOL OF FISH NEAR FOOSHA */}
      <group position={[-35, 0, 20]} ref={fooshaFishGroupRef}>
        {[0, 1.2, 2.4, 3.6, 4.8].map((radiusOffset, idx) => (
          <group key={idx} rotation={[0, (idx * Math.PI) / 2.5, 0]}>
            <mesh position={[4.0 + radiusOffset * 0.3, 0.4, 0]} rotation={[0.3, 0, 0]}>
              <coneGeometry args={[0.15, 0.6, 4]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.8} />
            </mesh>
          </group>
        ))}
      </group>

      {/* 🗝️ PIRATE TREASURE BOXES & GOLD COINS ON RAFTEL SHORE */}
      <group position={[42, 0.4, -18]}>
        <group position={[-2.2, 0.2, 2.8]} rotation={[0, Math.PI / 6, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.8, 0.5, 0.6]} />
            <meshStandardMaterial color="#78350f" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.8, 12, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
          </mesh>
          <mesh position={[0.3, 0.1, 0.2]}>
            <sphereGeometry args={[0.22, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>

        <group position={[2.5, 0.2, -2.5]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.0, 0.6, 0.7]} />
            <meshStandardMaterial color="#5c371d" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.35, 0.35, 1.0, 12, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* 🫧 ASCENDING DENSE WATER BUBBLES ACROSS THE OCEAN */}
      <points ref={bubblesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[bubbleParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          color="#e0f2fe"
          transparent
          opacity={0.8}
          depthWrite={false}
        />
      </points>

      {/* 🌊 WHITE WAVE FOAM SPRAY RIPPLES */}
      <group position={[0, 0.05, 0]} ref={foamRef}>
        <Sparkles
          count={150}
          scale={[140, 2, 140]}
          size={5.0}
          speed={1.0}
          color="#ffffff"
          opacity={0.65}
        />
      </group>

      {/* ⛵ DISTANT BACKGROUND SHIPS */}
      <group position={[-45, 0, -32]} ref={backgroundShip1Ref}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.8, 4.0]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 3.2]} />
          <meshStandardMaterial color="#27272a" />
        </mesh>
        <mesh position={[0, 2.2, 0.05]}>
          <planeGeometry args={[1.8, 1.4]} />
          <meshStandardMaterial color="#18181b" side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group position={[52, 0, 28]} ref={backgroundShip2Ref}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.9, 4.4]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 2.0, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 3.5]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        <mesh position={[0, 2.4, 0.05]}>
          <planeGeometry args={[2.0, 1.5]} />
          <meshStandardMaterial color="#fef3c7" side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
