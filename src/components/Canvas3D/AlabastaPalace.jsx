import React, { useMemo } from 'react';

export function AlabastaPalace({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  // Generate steps for the grand central staircase
  const steps = useMemo(() => {
    const stepList = [];
    const count = 14;
    const startZ = 3.6;
    const endZ = 1.2;
    const startY = 0.1;
    const endY = 2.2;

    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const z = startZ + (endZ - startZ) * t;
      const y = startY + (endY - startY) * t;
      stepList.push({ z, y, width: 2.2 - t * 0.3 });
    }
    return stepList;
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* --- 1. OASIS POOL & DESERT PALM TREES (Front-Side) --- */}
      <mesh position={[3.2, 0.05, 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 20]} />
        <meshStandardMaterial color="#06b6d4" roughness={0.1} />
      </mesh>

      {/* Palm Trees */}
      {[
        { x: 2.5, z: 3.0 },
        { x: 4.0, z: 1.2 }
      ].map((palm, idx) => (
        <group key={idx} position={[palm.x, 0.05, palm.z]}>
          <mesh position={[0, 0.9, 0]} rotation={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.07, 0.11, 1.8, 8]} />
            <meshStandardMaterial color="#78350f" roughness={0.9} />
          </mesh>
          <group position={[0.08, 1.8, 0]}>
            {[0, 60, 120, 180, 240, 300].map((angle, fIdx) => (
              <mesh
                key={fIdx}
                rotation={[0.35, (angle * Math.PI) / 180, 0]}
                position={[Math.sin((angle * Math.PI) / 180) * 0.45, 0, Math.cos((angle * Math.PI) / 180) * 0.45]}
              >
                <boxGeometry args={[0.2, 0.04, 1.0]} />
                <meshStandardMaterial color="#15803d" roughness={0.6} />
              </mesh>
            ))}
          </group>
        </group>
      ))}

      {/* --- 2. MAIN LOWER PALACE TIER (SANDSTONE WALLS & MINT TRIM) --- */}
      {/* Central Sandbox Base Building */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[7.2, 2.6, 4.8]} />
        <meshStandardMaterial color="#fffbeb" roughness={0.6} />
      </mesh>

      {/* Mint Green Wall Accent Panels (As seen in the drawing) */}
      <mesh position={[0, 1.3, 2.42]}>
        <boxGeometry args={[7.0, 2.4, 0.04]} />
        <meshStandardMaterial color="#a7f3d0" roughness={0.5} />
      </mesh>

      {/* THREE GRAND MAGENTA / PINK ARCHED PANELS (Left, Center, Right) */}
      {/* Left Magenta Arch Panel */}
      <group position={[-2.4, 1.3, 2.46]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.7, 2.1, 0.04]} />
          <meshStandardMaterial color="#c026d3" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.15, 0.02]}>
          <boxGeometry args={[1.3, 1.7, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Double Narrow Windows */}
        {[-0.25, 0.25].map((wx, wIdx) => (
          <mesh key={wIdx} position={[wx, 0.15, 0.04]}>
            <boxGeometry args={[0.14, 0.45, 0.03]} />
            <meshStandardMaterial color="#9d174d" />
          </mesh>
        ))}
      </group>

      {/* Right Magenta Arch Panel */}
      <group position={[2.4, 1.3, 2.46]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.7, 2.1, 0.04]} />
          <meshStandardMaterial color="#c026d3" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.15, 0.02]}>
          <boxGeometry args={[1.3, 1.7, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Double Narrow Windows */}
        {[-0.25, 0.25].map((wx, wIdx) => (
          <mesh key={wIdx} position={[wx, 0.15, 0.04]}>
            <boxGeometry args={[0.14, 0.45, 0.03]} />
            <meshStandardMaterial color="#9d174d" />
          </mesh>
        ))}
      </group>

      {/* Center Magenta Arch Frame (Around top doorway) */}
      <group position={[0, 1.5, 2.46]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.8, 1.5, 0.04]} />
          <meshStandardMaterial color="#c026d3" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.4, 0.02]}>
          <cylinderGeometry args={[0.7, 0.7, 0.04, 16, 1, false, 0, Math.PI]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>
        {/* Arched Wooden Double Door */}
        <mesh position={[0, 0.1, 0.04]}>
          <boxGeometry args={[1.1, 1.1, 0.05]} />
          <meshStandardMaterial color="#451a03" roughness={0.8} />
        </mesh>
      </group>

      {/* --- 3. WIDE GRAND CENTRAL STAIRCASE --- */}
      {/* White Staircase Steps */}
      {steps.map((step, idx) => (
        <mesh key={idx} position={[0, step.y, step.z]}>
          <boxGeometry args={[step.width, 0.18, 0.24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.3} />
        </mesh>
      ))}

      {/* Stepped White Banisters / Balustrades */}
      {[-1.25, 1.25].map((xSide, idx) => (
        <group key={idx} position={[xSide, 0.0, 0]}>
          {steps.map((step, sIdx) => (
            <mesh key={sIdx} position={[0, step.y + 0.18, step.z]}>
              <boxGeometry args={[0.26, 0.36, 0.24]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* --- 4. CRENELLATED BATTLEMENTS ALONG LOWER TERRACE --- */}
      <group position={[0, 2.6, 2.42]}>
        {[-3.4, -3.0, -2.6, -2.2, -1.8, 1.8, 2.2, 2.6, 3.0, 3.4].map((bx, idx) => (
          <mesh key={idx} position={[bx, 0.15, 0]}>
            <boxGeometry args={[0.28, 0.3, 0.12]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* --- 5. UPPER PALACE TIER & WINDOWS (Rests directly on Lower Tier at Y = 2.6) --- */}
      <group position={[0, 2.6, 0]}>
        {/* Main Upper Building Wall */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[6.2, 1.8, 4.0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>

        {/* Central Arch Portal Nook (Under Main Dome) */}
        <group position={[0, 0.9, 2.02]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.8, 1.3, 0.04]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <boxGeometry args={[1.4, 1.05, 0.04]} />
            <meshStandardMaterial color="#c026d3" />
          </mesh>
        </group>

        {/* Flanking Pointed Arch Windows */}
        {[-2.2, 2.2].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.9, 2.02]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.75, 1.0, 0.04]} />
              <meshStandardMaterial color="#c026d3" />
            </mesh>
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.48, 0.75, 0.04]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          </group>
        ))}
      </group>

      {/* --- 6. THREE BRIGHT SHINING GOLDEN ONION DOMES (Rests on Upper Tier at Y = 4.4) --- */}
      {/* A. Central Main Golden Dome */}
      <group position={[0, 4.4, 0]}>
        {/* Octagonal/Circular Drum Base */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[1.5, 1.65, 0.6, 24]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Drum Blue Accent Ring */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[1.68, 1.68, 0.12, 24]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>

        {/* Vibrant Golden Onion Dome */}
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[1.5, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Golden Top Spire Finial */}
        <mesh position={[0, 2.6, 0]}>
          <coneGeometry args={[0.15, 0.8, 12]} />
          <meshStandardMaterial color="#fef08a" metalness={0.5} roughness={0.1} />
        </mesh>
      </group>

      {/* B. Left Flanking Golden Dome */}
      <group position={[-2.4, 4.4, 0.2]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.0, 1.08, 0.5, 20]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[1.0, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* C. Right Flanking Golden Dome */}
      <group position={[2.4, 4.4, 0.2]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.0, 1.08, 0.5, 20]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[1.0, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.75]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#d97706"
            emissiveIntensity={0.25}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      </group>

      {/* --- 7. TALL MINARET TOWER (LEFT SIDE) --- */}
      <group position={[-1.3, 2.6, -0.6]}>
        {/* Minaret Shaft */}
        <mesh position={[0, 2.6, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 5.2, 12]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Balcony Ring */}
        <mesh position={[0, 5.2, 0]}>
          <cylinderGeometry args={[0.3, 0.24, 0.25, 12]} />
          <meshStandardMaterial color="#fef08a" />
        </mesh>
        {/* Minaret Golden Spire */}
        <mesh position={[0, 5.9, 0]}>
          <coneGeometry args={[0.14, 1.1, 12]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.5} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
