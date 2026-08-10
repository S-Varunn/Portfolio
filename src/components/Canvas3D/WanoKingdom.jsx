import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export function WanoKingdom({ position = [0, 0, 0] }) {
  const sakuraPetalsRef = useRef();

  // Generate sakura petals drifting through the air
  const petals = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 8.0,
      y: Math.random() * 6.0 + 1.0,
      z: (Math.random() - 0.5) * 8.0,
      speed: 0.4 + Math.random() * 0.4,
      rotSpeed: Math.random() * 2.0,
      scale: 0.06 + Math.random() * 0.06
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Animate falling sakura petals
    if (sakuraPetalsRef.current) {
      sakuraPetalsRef.current.children.forEach((p, idx) => {
        const petData = petals[idx];
        p.position.y -= petData.speed * 0.015;
        p.position.x += Math.sin(time + idx) * 0.008;
        p.rotation.x += petData.rotSpeed * 0.01;
        p.rotation.y += petData.rotSpeed * 0.01;

        if (p.position.y < 0.2) {
          p.position.y = 7.0;
        }
      });
    }
  });

  return (
    <group position={position}>
      {/* --- 1. BACKGROUND MT. FUJI SNOW SPIRE MOUNTAIN --- */}
      <group position={[-3.2, 0.0, -3.2]}>
        <mesh position={[0, 4.0, 0]}>
          <coneGeometry args={[1.8, 8.0, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        {/* Snow Cap Peak */}
        <mesh position={[0, 7.2, 0]}>
          <coneGeometry args={[0.55, 1.8, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      </group>

      {/* --- 2. BACKGROUND 5-STORY JAPANESE PAGODA TOWER --- */}
      <group position={[-3.6, 0.0, 0.8]}>
        {/* Pagoda Base */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>
        {/* 5 Tiered Pagoda Roofs */}
        {[0, 1, 2, 3, 4].map((tier) => {
          const y = 0.8 + tier * 0.7;
          const w = 1.4 - tier * 0.18;
          return (
            <group key={tier} position={[0, y, 0]}>
              <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[w * 0.7, 0.5, w * 0.7]} />
                <meshStandardMaterial color="#b91c1c" />
              </mesh>
              <mesh position={[0, 0.45, 0]}>
                <coneGeometry args={[w, 0.4, 4]} rotation={[0, Math.PI / 4, 0]} />
                <meshStandardMaterial color="#0d9488" roughness={0.3} />
              </mesh>
            </group>
          );
        })}
        {/* Pagoda Golden Spire */}
        <mesh position={[0, 4.6, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.1} />
        </mesh>
      </group>

      {/* --- 3. CENTRAL MOSSY STONE MOUNTAIN PLATEAU BASE --- */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[2.2, 3.2, 2.4, 20]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Mossy Green Top Trim */}
      <mesh position={[0, 2.42, 0]}>
        <cylinderGeometry args={[2.25, 2.25, 0.1, 20]} />
        <meshStandardMaterial color="#15803d" roughness={0.9} />
      </mesh>

      {/* Waterfalls Cascading Down Mountain Base */}
      {[-0.6, 0.6].map((wx, idx) => (
        <mesh key={idx} position={[wx, 1.2, 2.05]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.35, 2.2, 0.1]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.8} emissive="#0284c7" emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* --- 4. FLOWER CAPITAL SHOGUN CASTLE (JAPANESE TENSHU) --- */}
      <group position={[0, 2.5, 0]}>
        {/* TIER 1: Base Castle Wall & Curved Teal Roof */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.8, 1.2, 2.4]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        {/* Timber Beams Frame */}
        <mesh position={[0, 0.6, 1.21]}>
          <boxGeometry args={[2.82, 0.12, 0.04]} />
          <meshStandardMaterial color="#451a03" />
        </mesh>

        {/* Tier 1 Flared Teal Roof */}
        <mesh position={[0, 1.35, 0]}>
          <coneGeometry args={[2.4, 0.7, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#0d9488" roughness={0.3} />
        </mesh>
        {/* Red Balustrade Balcony Ring */}
        <mesh position={[0, 1.75, 0]}>
          <boxGeometry args={[2.0, 0.2, 1.8]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>

        {/* TIER 2: Middle Castle Level & Roof */}
        <mesh position={[0, 2.2, 0]}>
          <boxGeometry args={[1.8, 0.9, 1.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 2.75, 0]}>
          <coneGeometry args={[1.6, 0.65, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#0d9488" roughness={0.3} />
        </mesh>

        {/* TIER 3: Top Pavilion & Golden Shachihoko Finials */}
        <mesh position={[0, 3.25, 0]}>
          <boxGeometry args={[1.2, 0.7, 1.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 3.75, 0]}>
          <coneGeometry args={[1.1, 0.6, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#0d9488" roughness={0.3} />
        </mesh>
        {/* Golden Shachihoko Ornaments on Ridge Top */}
        {[-0.5, 0.5].map((sx, idx) => (
          <mesh key={idx} position={[sx, 4.15, 0]}>
            <coneGeometry args={[0.08, 0.35, 8]} rotation={[0, 0, sx > 0 ? -0.4 : 0.4]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.1} />
          </mesh>
        ))}
      </group>

      {/* --- 5. GIANT SWEEPING SAKURA BONSAI TREE ARCHING OVER CASTLE --- */}
      <group position={[1.8, 0.0, -0.4]}>
        {/* Curved Main Trunk Arching Over Roof */}
        {[
          { pos: [0, 1.2, 0], rot: [0, 0, -0.15], r1: 0.45, r2: 0.38, h: 2.4 },
          { pos: [0.3, 3.4, 0], rot: [0, 0, -0.45], r1: 0.38, r2: 0.32, h: 2.2 },
          { pos: [-0.3, 5.3, 0], rot: [0, 0, -0.9], r1: 0.32, r2: 0.25, h: 2.2 },
          { pos: [-1.6, 6.8, 0], rot: [0, 0, -1.6], r1: 0.25, r2: 0.18, h: 2.4 }
        ].map((seg, idx) => (
          <mesh key={idx} position={seg.pos} rotation={seg.rot}>
            <cylinderGeometry args={[seg.r2, seg.r1, seg.h, 12]} />
            <meshStandardMaterial color="#582f0e" roughness={0.9} />
          </mesh>
        ))}

        {/* Pink Sakura Blossom Canopy Clouds along the Arching Trunk */}
        {[
          { pos: [-1.8, 7.5, 0], s: [2.2, 1.1, 1.8] },
          { pos: [-0.2, 6.4, 0.6], s: [1.6, 0.9, 1.4] },
          { pos: [0.8, 5.2, -0.4], s: [1.5, 0.8, 1.3] },
          { pos: [1.2, 3.6, 0.5], s: [1.4, 0.8, 1.2] },
          { pos: [-2.8, 3.8, 0.2], s: [1.3, 0.7, 1.1] }
        ].map((foliage, idx) => (
          <group key={idx} position={foliage.pos}>
            <mesh scale={foliage.s}>
              <sphereGeometry args={[0.8, 14, 14]} />
              <meshStandardMaterial color="#f472b6" roughness={0.6} />
            </mesh>
            <mesh scale={[foliage.s[0] * 0.85, foliage.s[1] * 0.85, foliage.s[2] * 0.85]} position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.8, 14, 14]} />
              <meshStandardMaterial color="#f43f5e" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* --- 6. FRONT CURVED RED ARCH BRIDGE & TORII GATES --- */}
      {/* Front Entrance Shrine Building */}
      <group position={[0, 0.4, 3.2]}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.6, 0.8, 1.0]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[1.4, 0.5, 4]} rotation={[0, Math.PI / 4, 0]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.4} />
        </mesh>
      </group>

      {/* --- GRAND CURVED RED JAPANESE MOON ARCH BRIDGE (TAIKO-BASHI) --- */}
      <group position={[0, -0.2, 3.5]}>
        {/* Main Arch Deck Beam (Spans full 180° semi-circle from x=-3.2 to x=+3.2) */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[3.2, 0.16, 12, 40, Math.PI]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        
        {/* Upper Handrail Parallel Arc */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[3.2, 0.08, 12, 40, Math.PI]} />
          <meshStandardMaterial color="#b91c1c" roughness={0.4} />
        </mesh>

        {/* 12 Vertical Balustrade Posts with Gold Caps Spaced Across Full Arch */}
        {[0.2, 0.45, 0.7, 0.95, 1.2, 1.45, 1.7, 1.95, 2.2, 2.45, 2.7, 2.94].map((angle, idx) => {
          const px = Math.cos(angle) * 3.2;
          const py = Math.sin(angle) * 3.2;
          return (
            <group key={idx} position={[px, py, 0]}>
              <mesh position={[0, 0.18, 0]}>
                <cylinderGeometry args={[0.05, 0.06, 0.4, 8]} />
                <meshStandardMaterial color="#dc2626" />
              </mesh>
              {/* Gold Post Ornament Cap */}
              <mesh position={[0, 0.4, 0]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.1} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Flanking Red Torii Gates */}
      {[-3.2, 3.2].map((tx, idx) => (
        <group key={idx} position={[tx, 0.6, 3.4]} rotation={[0, idx === 0 ? 0.3 : -0.3, 0]}>
          {/* Vertical Pillars */}
          {[-0.5, 0.5].map((px, pIdx) => (
            <mesh key={pIdx} position={[px, 0.6, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
              <meshStandardMaterial color="#dc2626" />
            </mesh>
          ))}
          {/* Top Double Crossbeams */}
          <mesh position={[0, 1.35, 0]}>
            <boxGeometry args={[1.4, 0.12, 0.12]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 1.5, 0]}>
            <boxGeometry args={[1.6, 0.14, 0.14]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}

      {/* --- 7. FLOWER CAPITAL TOWN HOUSES & SAKURA TREES --- */}
      {/* Traditional Japanese Roof Townhouses around Base */}
      {[
        { x: -2.2, z: 2.4, rot: 0.3 },
        { x: -1.2, z: 2.6, rot: 0.1 },
        { x: 1.2, z: 2.6, rot: -0.1 },
        { x: 2.2, z: 2.4, rot: -0.3 },
        { x: -2.8, z: 1.4, rot: 0.5 },
        { x: 2.8, z: 1.4, rot: -0.5 }
      ].map((house, idx) => (
        <group key={idx} position={[house.x, 0.25, house.z]} rotation={[0, house.rot, 0]}>
          <mesh position={[0, 0.35, 0]}>
            <boxGeometry args={[0.9, 0.7, 0.9]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <coneGeometry args={[0.8, 0.5, 4]} rotation={[0, Math.PI / 4, 0]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Scattered Sakura Cherry Blossom Trees */}
      {[
        { x: -3.4, z: 2.2, s: 0.8 },
        { x: 3.4, z: 2.2, s: 0.85 },
        { x: -2.0, z: 1.2, s: 0.75 },
        { x: 2.0, z: 1.2, s: 0.9 }
      ].map((stree, idx) => (
        <group key={idx} position={[stree.x, 0.15, stree.z]} scale={[stree.s, stree.s, stree.s]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 1.3, 0]}>
            <sphereGeometry args={[0.6, 12, 12]} />
            <meshStandardMaterial color="#fb7185" roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* --- 8. FLOATING SAKURA PETALS IN THE AIR --- */}
      <group ref={sakuraPetalsRef}>
        {petals.map((pet, idx) => (
          <mesh key={idx} position={[pet.x, pet.y, pet.z]} scale={[pet.scale, pet.scale, pet.scale]}>
            <boxGeometry args={[0.12, 0.02, 0.12]} />
            <meshBasicMaterial color="#f472b6" transparent opacity={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
