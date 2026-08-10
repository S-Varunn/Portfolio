import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 1. Detailed Tree with trunk branches and multi-layered foliage
export function DetailedTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Main Trunk */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 1.4, 8]} />
        <meshStandardMaterial color="#582f0e" roughness={0.9} />
      </mesh>
      {/* Branch 1 */}
      <mesh position={[0.2, 0.9, 0.1]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.06, 0.09, 0.7, 6]} />
        <meshStandardMaterial color="#582f0e" roughness={0.9} />
      </mesh>
      {/* Branch 2 */}
      <mesh position={[-0.18, 1.0, -0.1]} rotation={[0.2, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.08, 0.6, 6]} />
        <meshStandardMaterial color="#582f0e" roughness={0.9} />
      </mesh>

      {/* Main Foliage Center */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.85, 12, 12]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
      {/* Secondary Foliage Spheres for Organic Look */}
      <mesh position={[0.4, 1.6, 0.2]}>
        <sphereGeometry args={[0.6, 10, 10]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>
      <mesh position={[-0.45, 1.7, -0.2]}>
        <sphereGeometry args={[0.65, 10, 10]} />
        <meshStandardMaterial color="#22c55e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 2.2, -0.1]}>
        <sphereGeometry args={[0.55, 10, 10]} />
        <meshStandardMaterial color="#4ade80" roughness={0.6} />
      </mesh>
    </group>
  );
}

// 2. Bushes with Leaves and Red Cherries
export function CherryBush({ position, scale = 1 }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Bush Leaves Mound */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.4, 10, 10]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>
      <mesh position={[0.22, 0.2, 0.15]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, 0.22, -0.1]}>
        <sphereGeometry args={[0.32, 8, 8]} />
        <meshStandardMaterial color="#22c55e" roughness={0.8} />
      </mesh>

      {/* Bright Red Cherries attached to bush */}
      {[
        { x: 0.15, y: 0.35, z: 0.3 },
        { x: -0.2, y: 0.3, z: 0.25 },
        { x: 0.28, y: 0.25, z: -0.15 },
        { x: -0.1, y: 0.4, z: -0.25 },
        { x: 0.0, y: 0.45, z: 0.32 }
      ].map((cherry, idx) => (
        <group key={idx} position={[cherry.x, cherry.y, cherry.z]}>
          {/* Stem */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.08]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          {/* Cherry fruit */}
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.055, 8, 8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 3. Brick Windmill
export function BrickWindmill({ position }) {
  const bladesRef = useRef();

  useFrame(() => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z += 0.025;
    }
  });

  return (
    <group position={position}>
      {/* Stone Foundation Ring */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.7, 0.85, 0.4, 16]} />
        <meshStandardMaterial color="#57534e" roughness={0.9} />
      </mesh>

      {/* Brick Windmill Body */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.48, 0.68, 2.0, 16]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.8} />
      </mesh>

      {/* Brick Wall Overlay Accents */}
      {[-0.6, -0.1, 0.4, 0.8].map((yLevel, rowIdx) => (
        <group key={rowIdx} position={[0, 1.4 + yLevel, 0]}>
          {[0, 60, 120, 180, 240, 300].map((angle, bIdx) => (
            <mesh
              key={bIdx}
              position={[
                Math.sin((angle * Math.PI) / 180) * 0.56,
                0,
                Math.cos((angle * Math.PI) / 180) * 0.56
              ]}
              rotation={[0, (angle * Math.PI) / 180, 0]}
            >
              <boxGeometry args={[0.18, 0.08, 0.04]} />
              <meshStandardMaterial color={bIdx % 2 === 0 ? '#b91c1c' : '#d97706'} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Terracotta Conical Roof */}
      <mesh position={[0, 2.7, 0]}>
        <coneGeometry args={[0.72, 0.8, 16]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.5} />
      </mesh>

      {/* Doorway */}
      <mesh position={[0, 0.5, 0.6]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>

      {/* Rotating Blades Assembly */}
      <group ref={bladesRef} position={[0, 2.2, 0.55]}>
        {/* Hub */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>
        {/* 4 Blades */}
        {[0, 90, 180, 270].map((angle, idx) => (
          <group key={idx} rotation={[0, 0, (angle * Math.PI) / 180]}>
            {/* Wooden Spar */}
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[0.06, 2.2, 0.04]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>
            {/* White Fabric Sail */}
            <mesh position={[0.12, 1.2, 0.01]}>
              <planeGeometry args={[0.22, 1.6]} />
              <meshStandardMaterial color="#fffbeb" side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

// 4. Ground Details (Winding Dirt Path, Grass Patches, Cobblestones)
export function FooshaGroundDetails() {
  return (
    <group position={[0, 1.81, 0]}>
      {/* Winding Dirt Path */}
      {[
        { x: 3.5, z: 2.2, rx: 1.2, rz: 0.6 },
        { x: 2.4, z: 1.8, rx: 1.0, rz: 0.7 },
        { x: 1.2, z: 1.2, rx: 1.1, rz: 0.8 },
        { x: 0.0, z: 0.5, rx: 1.2, rz: 0.9 },
        { x: -1.2, z: 0.2, rx: 1.0, rz: 0.8 },
        { x: -2.0, z: 0.8, rx: 1.1, rz: 0.7 }
      ].map((pathNode, idx) => (
        <mesh
          key={idx}
          position={[pathNode.x, 0.01, pathNode.z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[pathNode.rx, pathNode.rz, 1]}
        >
          <circleGeometry args={[1, 16]} />
          <meshStandardMaterial color="#78350f" roughness={0.95} />
        </mesh>
      ))}

      {/* Contrast Grass Patches */}
      {[
        { x: 1.5, z: -1.0, s: 1.4 },
        { x: -1.8, z: -0.8, s: 1.6 },
        { x: -2.8, z: 1.8, s: 1.2 },
        { x: 2.8, z: -1.5, s: 1.5 }
      ].map((patch, idx) => (
        <mesh key={idx} position={[patch.x, 0.012, patch.z]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[patch.s, 16]} />
          <meshStandardMaterial color="#15803d" roughness={0.85} />
        </mesh>
      ))}

      {/* Cobblestones / Rocks Scatter */}
      {[
        { x: 2.1, z: 2.1, s: 0.15 },
        { x: 0.8, z: 1.6, s: 0.2 },
        { x: -0.6, z: 0.8, s: 0.18 },
        { x: -2.5, z: 0.4, s: 0.22 },
        { x: 1.8, z: -1.6, s: 0.25 },
        { x: -1.2, z: -1.8, s: 0.19 }
      ].map((rock, idx) => (
        <mesh key={idx} position={[rock.x, rock.s * 0.4, rock.z]}>
          <dodecahedronGeometry args={[rock.s, 0]} />
          <meshStandardMaterial color="#64748b" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// 5. Animated Fishermen & Playing Children on Loading Dock Pier
export function DockPeopleAndBoats() {
  const walkingFishermanRef = useRef();
  const child1Ref = useRef();
  const child2Ref = useRef();
  const boat1Ref = useRef();
  const boat2Ref = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Walking Fisherman along the pier length
    if (walkingFishermanRef.current) {
      walkingFishermanRef.current.position.x = Math.sin(time * 0.8) * 3.2;
    }

    // Children playing (jumping up and down with excitement)
    if (child1Ref.current) {
      child1Ref.current.position.y = 0.35 + Math.abs(Math.sin(time * 5.0)) * 0.18;
    }
    if (child2Ref.current) {
      child2Ref.current.position.y = 0.35 + Math.abs(Math.sin(time * 5.0 + 1.2)) * 0.18;
    }

    // Fishing boats gently bobbing in water next to the pier
    if (boat1Ref.current) {
      boat1Ref.current.position.y = -0.15 + Math.sin(time * 1.5) * 0.05;
      boat1Ref.current.rotation.z = Math.sin(time * 1.2) * 0.04;
    }
    if (boat2Ref.current) {
      boat2Ref.current.position.y = -0.15 + Math.sin(time * 1.5 + 1.5) * 0.05;
      boat2Ref.current.rotation.z = Math.cos(time * 1.2) * 0.04;
    }
  });

  return (
    <group position={[7.5, 0.3, 2.8]} rotation={[0, -Math.PI / 8, 0]}>
      {/* --- 1. FISHERMAN STANDING WITH FISHING ROD --- */}
      <group position={[4.2, 0.3, 0.8]}>
        {/* Legs */}
        <mesh position={[-0.08, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        <mesh position={[0.08, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#1e3a8a" />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.45]} />
          <meshStandardMaterial color="#ea580c" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#fca5a5" />
        </mesh>
        {/* Straw Hat */}
        <mesh position={[0, 0.94, 0]}>
          <coneGeometry args={[0.22, 0.08, 10]} />
          <meshStandardMaterial color="#eab308" />
        </mesh>

        {/* Fishing Rod */}
        <group position={[0.1, 0.5, 0.1]} rotation={[-Math.PI / 4, 0, Math.PI / 6]}>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.01, 0.02, 1.8]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
        </group>
        {/* Fish Basket beside him */}
        <mesh position={[-0.3, 0.12, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.24, 8]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
      </group>

      {/* --- 2. WALKING FISHERMAN WITH FISH BASKET --- */}
      <group ref={walkingFishermanRef} position={[0, 0.3, -0.5]}>
        {/* Legs */}
        <mesh position={[-0.08, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.08, 0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.45]} />
          <meshStandardMaterial color="#0284c7" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshStandardMaterial color="#fdba74" />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.94, 0.02]}>
          <boxGeometry args={[0.18, 0.06, 0.22]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
        {/* Fish Basket on shoulder */}
        <mesh position={[0.15, 0.55, 0]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      </group>

      {/* --- 3. CHILDREN PLAYING ON THE DOCK --- */}
      {/* Child 1 */}
      <group ref={child1Ref} position={[-2.4, 0.35, 0.4]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#16a34a" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.3]} />
          <meshStandardMaterial color="#facc15" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#fca5a5" />
        </mesh>
      </group>
      {/* Child 2 */}
      <group ref={child2Ref} position={[-3.0, 0.35, -0.3]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.3]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.3]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#fdba74" />
        </mesh>
      </group>

      {/* --- 4. STANDBY FISHING BOATS MOORED NEXT TO PIER --- */}
      {/* Boat 1 (Near side) */}
      <group ref={boat1Ref} position={[-1.5, -0.15, 2.2]} rotation={[0, 0.1, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.4, 2.4]} />
          <meshStandardMaterial color="#78350f" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.1, 1.3]} rotation={[Math.PI / 4, 0, 0]}>
          <coneGeometry args={[0.7, 0.8, 4]} />
          <meshStandardMaterial color="#92400e" />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.1, 0.06, 0.3]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        <mesh position={[0.4, 0.25, -0.2]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.02, 0.02, 2.0]} />
          <meshStandardMaterial color="#fef3c7" />
        </mesh>
        <mesh position={[0.5, 0.2, -0.8]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      </group>

      {/* Boat 2 (Far side) */}
      <group ref={boat2Ref} position={[2.2, -0.15, -2.2]} rotation={[0, -0.15, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.1, 0.38, 2.2]} />
          <meshStandardMaterial color="#92400e" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.1, 1.2]} rotation={[Math.PI / 4, 0, 0]}>
          <coneGeometry args={[0.65, 0.75, 4]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[1.0, 0.06, 0.3]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
        <mesh position={[0, 0.15, -0.5]}>
          <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
      </group>
    </group>
  );
}
