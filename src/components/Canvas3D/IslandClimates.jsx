import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export function IslandClimates() {
  const sakuraRef = useRef();
  const snowRef = useRef();
  const smokeRef = useRef();

  // Create custom particle positions for Sakura Petals over Wano (X: 28, Z: 10)
  const sakuraParticles = useMemo(() => {
    const count = 70;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 28 + (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = 2 + Math.random() * 14;
      positions[i * 3 + 2] = 10 + (Math.random() - 0.5) * 16;
    }
    return positions;
  }, []);

  // Create custom particle positions for Snow over Water 7 (X: 14, Z: -12)
  const snowParticles = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = 14 + (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = 2 + Math.random() * 15;
      positions[i * 3 + 2] = -12 + (Math.random() - 0.5) * 16;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 🌸 Animate Sakura petals falling gently over Wano
    if (sakuraRef.current) {
      const positions = sakuraRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] -= delta * (0.8 + (i % 3) * 0.3);
        positions[i * 3] += Math.sin(time + i) * 0.02;
        if (positions[i * 3 + 1] < 0.2) {
          positions[i * 3 + 1] = 13 + Math.random() * 4;
        }
      }
      sakuraRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // ❄️ Animate Snow falling over Water 7
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        positions[i * 3 + 1] -= delta * (1.2 + (i % 2) * 0.4);
        positions[i * 3] += Math.cos(time * 1.5 + i) * 0.03;
        if (positions[i * 3 + 1] < 0.2) {
          positions[i * 3 + 1] = 14 + Math.random() * 4;
        }
      }
      snowRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // ⚓ Animate Baratie chimney smoke
    if (smokeRef.current) {
      smokeRef.current.position.y = (time * 0.6) % 2.8;
      smokeRef.current.scale.setScalar(1.0 + (time * 0.3) % 0.9);
    }
  });

  return (
    <group>
      {/* 🌸 WANO COUNTRY: Falling Pink Sakura Cherry Blossom Petals */}
      <points ref={sakuraRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sakuraParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.45}
          color="#f472b6"
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      {/* ⚙️ WATER 7: Falling White Snow Animation */}
      <points ref={snowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[snowParticles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.4}
          color="#ffffff"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      {/* 🏜️ ALABASTA KINGDOM: Thick Swirling Desert Sandstorm Dust */}
      <group position={[-2, 4, 18]}>
        <Sparkles
          count={130}
          scale={[22, 10, 22]}
          size={4.5}
          speed={1.8}
          color="#d97706"
          opacity={0.85}
        />
      </group>

      {/* ⚓ BARATIE SEA RESTAURANT: Kitchen Chimney Smoke */}
      <group position={[-20, 2.5, -5]}>
        <mesh ref={smokeRef} position={[0, 0, 0]}>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshStandardMaterial color="#e5e7eb" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* 🗝️ RAFTEL (LAUGH TALE): Ancient Poneglyph Energy Beam & Golden Dust */}
      <group position={[42, 0, -18]}>
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[0.35, 1.4, 15, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#f59e0b"
            emissiveIntensity={0.9}
            transparent
            opacity={0.3}
          />
        </mesh>
        <Sparkles
          count={110}
          scale={[16, 12, 16]}
          size={5.0}
          speed={1.2}
          color="#fbbf24"
          opacity={0.9}
        />
      </group>
    </group>
  );
}
