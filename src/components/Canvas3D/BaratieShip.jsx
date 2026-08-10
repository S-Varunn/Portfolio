import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export function BaratieShip({ position = [0, 0, 0] }) {
  const shipGroupRef = useRef();
  const smokeRef = useRef();

  // Create striped sail texture procedurally (Yellow & White stripes as seen in reference image)
  const stripedSailTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Alternate yellow & cream stripes
    const stripeHeight = 32;
    for (let y = 0; y < 256; y += stripeHeight) {
      ctx.fillStyle = (y / stripeHeight) % 2 === 0 ? '#f59e0b' : '#fffbeb';
      ctx.fillRect(0, y, 256, stripeHeight);
    }

    // Border stroke
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 248, 248);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Gentle ocean floating motion for Baratie
    if (shipGroupRef.current) {
      shipGroupRef.current.position.y = Math.sin(time * 1.2) * 0.08;
      shipGroupRef.current.rotation.z = Math.sin(time * 0.9) * 0.015;
      shipGroupRef.current.rotation.x = Math.cos(time * 0.8) * 0.01;
    }

    // Chimney smoke drift
    if (smokeRef.current) {
      smokeRef.current.children.forEach((p, idx) => {
        p.position.y = ((time * 0.8 + idx * 0.4) % 1.5) + 0.2;
        p.scale.setScalar(0.15 + p.position.y * 0.2);
        p.material.opacity = Math.max(0, 0.6 - p.position.y * 0.35);
      });
    }
  });

  return (
    <group ref={shipGroupRef} position={position}>
      {/* --- WATER FOAM SPLASH AROUND BARATIE HULL --- */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 5.8, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* --- 1. LOWER TIMBER HULL BASE --- */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[4.8, 0.9, 7.8]} />
        <meshStandardMaterial color="#78350f" roughness={0.6} />
      </mesh>
      {/* Red Mahogany Keel Trim */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[5.0, 0.12, 8.0]} />
        <meshStandardMaterial color="#991b1b" />
      </mesh>

      {/* --- 2. ICONIC OPEN-MOUTH FISH FIGUREHEAD (BOW / FRONT) --- */}
      <group position={[0, 0.45, 3.8]}>
        {/* Yellow & Cream Striped Neck Collar Rings */}
        <mesh position={[0, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.05, 1.15, 0.35, 24]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.98, 1.05, 0.2, 24]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>

        {/* Elongated Sweeping Fish Snout (Creamy White Horizontal Body) */}
        <mesh position={[0, 0.2, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.82, 0.98, 1.4, 24]} />
          <meshStandardMaterial color="#fffbeb" roughness={0.3} />
        </mesh>

        {/* Outer Yellow Lip Collar framing the Gaping Mouth */}
        <mesh position={[0, 0.2, 1.82]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.78, 0.12, 16, 24]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 1.84]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.74, 0.08, 16, 24]} />
          <meshStandardMaterial color="#fef08a" roughness={0.3} />
        </mesh>

        {/* Dark Hollow Mouth Interior Cavity */}
        <mesh position={[0, 0.2, 1.7]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.2, 20]} />
          <meshBasicMaterial color="#09090b" />
        </mesh>

        {/* Wide Curved Orange Tongue Lolling Outward */}
        <group position={[0, -0.05, 1.7]} rotation={[0.25, 0, 0]}>
          {/* Main Tongue Slab */}
          <mesh position={[0, 0, 0.5]}>
            <boxGeometry args={[0.72, 0.14, 0.95]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
          {/* Rounded Tongue Tip */}
          <mesh position={[0, 0, 0.975]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.36, 0.36, 0.14, 16]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
        </group>

        {/* Round Cartoon Eyes on the Sides of the Snout */}
        <group position={[0.85, 0.35, 1.0]}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.08, 0.0, 0.14]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#09090b" />
          </mesh>
          <mesh position={[0.12, 0.04, 0.18]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>

        <group position={[-0.85, 0.35, 1.0]}>
          <mesh>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.08, 0.0, 0.14]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color="#09090b" />
          </mesh>
          <mesh position={[-0.12, 0.04, 0.18]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      </group>

      {/* --- 3. LEVEL 1: MINT GREEN MAIN DINING DECK --- */}
      <group position={[0, 1.4, 0]}>
        {/* Mint Green Wall */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4.6, 1.0, 7.2]} />
          <meshStandardMaterial color="#5eead4" roughness={0.5} />
        </mesh>

        {/* Arched Entrance Door (Side Boarding Entrance) */}
        <group position={[2.31, 0.4, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.05, 0.8, 0.9]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 0.06, 12, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.7} />
          </mesh>

          {/* Boarding Gangplank Bridge out to water */}
          <mesh position={[0.6, -0.35, 0]} rotation={[0, 0, -0.05]}>
            <boxGeometry args={[1.3, 0.1, 1.1]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
        </group>

        {/* Arched Windows with Criss-Cross Frames */}
        {[-2.6, -1.3, 0, 1.3, 2.6].map((zPos, idx) => (
          <group key={idx}>
            {/* Left side windows */}
            <mesh position={[-2.31, 0.5, zPos]}>
              <boxGeometry args={[0.05, 0.42, 0.35]} />
              <meshStandardMaterial color="#0284c7" roughness={0.1} />
            </mesh>
            {/* Right side windows */}
            <mesh position={[2.31, 0.5, zPos]}>
              <boxGeometry args={[0.05, 0.42, 0.35]} />
              <meshStandardMaterial color="#0284c7" roughness={0.1} />
            </mesh>
          </group>
        ))}

        {/* Level 1 Balcony Floor */}
        <mesh position={[0, 1.05, 0]}>
          <boxGeometry args={[4.9, 0.1, 7.5]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>

        {/* Level 1 X-Lattice Railings (Dark Timber) */}
        {[-2.42, 2.42].map((xSide, sideIdx) => (
          <group key={sideIdx} position={[xSide, 1.25, 0]}>
            <mesh position={[0, 0.15, 0]}>
              <boxGeometry args={[0.06, 0.3, 7.4]} />
              <meshStandardMaterial color="#1e293b" />
            </mesh>
          </group>
        ))}
      </group>

      {/* --- 4. LEVEL 2: MIDDLE DINING DECK & BARATIE BANNER --- */}
      <group position={[0, 2.5, 0]}>
        {/* Mint Green Middle Wall */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[4.2, 0.9, 6.4]} />
          <meshStandardMaterial color="#5eead4" roughness={0.5} />
        </mesh>

        {/* --- WHITE BOLD "BARATIE" SIGN BANNER --- */}
        <group position={[0, 0.5, 3.22]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.8, 0.38, 0.05]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0, 0, 0.04]}
            fontSize={0.24}
            color="#991b1b"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            ⚓ BARATIE ⚓
          </Text>
        </group>

        {/* Side Banners */}
        {[-2.11, 2.11].map((xSide, idx) => (
          <group key={idx} position={[xSide, 0.5, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.05, 0.35, 5.2]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <Text
              position={[xSide > 0 ? 0.04 : -0.04, 0, 0]}
              rotation={[0, xSide > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}
              fontSize={0.22}
              color="#991b1b"
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              BARATIE
            </Text>
          </group>
        ))}

        {/* "RESTAURANT" Text on upper wall */}
        <Text
          position={[0, 0.82, 3.22]}
          fontSize={0.18}
          color="#1e293b"
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
        >
          RESTAURANT
        </Text>

        {/* Level 2 Balcony Floor */}
        <mesh position={[0, 0.98, 0]}>
          <boxGeometry args={[4.4, 0.08, 6.6]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
      </group>

      {/* --- 5. LEVEL 3: TERRACOTTA MANSARD ROOF & CHIMNEY --- */}
      <group position={[0, 3.5, -0.2]}>
        {/* Main Mansard Roof Structure */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[3.8, 1.2, 5.4]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.4} />
        </mesh>
        {/* Sloped Roof Top Cap */}
        <mesh position={[0, 1.35, 0]}>
          <boxGeometry args={[3.2, 0.3, 4.8]} />
          <meshStandardMaterial color="#991b1b" roughness={0.4} />
        </mesh>

        {/* White Scalloped Roof Eaves Trim */}
        <mesh position={[0, 0.02, 2.72]}>
          <boxGeometry args={[3.9, 0.08, 0.08]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
        <mesh position={[0, 0.02, -2.72]}>
          <boxGeometry args={[3.9, 0.08, 0.08]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>

        {/* Kitchen Chimney */}
        <group position={[0, 1.6, -1.2]}>
          <mesh>
            <boxGeometry args={[0.45, 0.6, 0.45]} />
            <meshStandardMaterial color="#57534e" roughness={0.9} />
          </mesh>

          {/* Animated Cooking Smoke Particles */}
          <group ref={smokeRef} position={[0, 0.3, 0]}>
            {[0, 1, 2].map((idx) => (
              <mesh key={idx} position={[0, 0, 0]}>
                <sphereGeometry args={[0.2, 8, 8]} />
                <meshBasicMaterial color="#e2e8f0" transparent opacity={0.5} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* --- 6. MASTS, YARDARMS & STRIPED SAILS --- */}
      {/* Fore Mast (Front) */}
      <group position={[0, 3.6, 2.2]}>
        <mesh position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 5.2]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
        {/* Fore Crow's Nest */}
        <mesh position={[0, 3.6, 0]}>
          <cylinderGeometry args={[0.4, 0.3, 0.35, 12]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>

        {/* Lower Striped Sail */}
        <mesh position={[0, 1.6, 0.05]}>
          <planeGeometry args={[2.8, 1.4]} />
          <meshStandardMaterial map={stripedSailTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* Upper Striped Sail */}
        <mesh position={[0, 3.2, 0.05]}>
          <planeGeometry args={[2.0, 1.1]} />
          <meshStandardMaterial map={stripedSailTexture} side={THREE.DoubleSide} />
        </mesh>

        {/* Red Mast Flag */}
        <mesh position={[0, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <coneGeometry args={[0.18, 0.6, 3]} rotation={[0, 0, -Math.PI / 2]} />
          <meshStandardMaterial color="#dc2626" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Main / Aft Mast (Back) */}
      <group position={[0, 3.8, -2.4]}>
        <mesh position={[0, 2.0, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 5.6]} />
          <meshStandardMaterial color="#582f0e" />
        </mesh>
        {/* Main Crow's Nest */}
        <mesh position={[0, 4.0, 0]}>
          <cylinderGeometry args={[0.45, 0.32, 0.38, 12]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>

        {/* Lower Striped Sail */}
        <mesh position={[0, 1.8, 0.05]}>
          <planeGeometry args={[3.2, 1.6]} />
          <meshStandardMaterial map={stripedSailTexture} side={THREE.DoubleSide} />
        </mesh>
        {/* Upper Striped Sail */}
        <mesh position={[0, 3.6, 0.05]}>
          <planeGeometry args={[2.2, 1.2]} />
          <meshStandardMaterial map={stripedSailTexture} side={THREE.DoubleSide} />
        </mesh>

        {/* Red Mast Flag */}
        <mesh position={[0, 4.9, 0]} rotation={[0, Math.PI / 2, 0]}>
          <coneGeometry args={[0.2, 0.7, 3]} rotation={[0, 0, -Math.PI / 2]} />
          <meshStandardMaterial color="#dc2626" side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Rigging Cables */}
      {[
        [-2.0, 3.6, 2.2], [2.0, 3.6, 2.2],
        [-2.0, 3.8, -2.4], [2.0, 3.8, -2.4]
      ].map(([rx, ry, rz], idx) => (
        <mesh key={idx} position={[rx * 0.5, ry * 0.5, rz]} rotation={[0, 0, rx > 0 ? -0.3 : 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 3.8]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      ))}

      {/* --- 7. STERN REAR PADDLE WHEEL / FIN HOUSING --- */}
      <group position={[0, 1.2, -4.0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.8, 16, 1, false, Math.PI, Math.PI]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0.4, -0.4]}>
          <cylinderGeometry args={[0.92, 0.92, 0.1, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
