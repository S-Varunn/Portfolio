import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { PARALLEL_DOCK_HEADING } from '../../utils/navigation';

export const ThousandSunny = React.forwardRef(function ThousandSunny(
  { position, waypoints = [], isSailing, onArrive, _weatherMode = 'sunset' },
  ref
) {
  const internalShipRef = useRef();
  const shipRef = ref || internalShipRef;
  const mainSailRef = useRef();
  const foreSailRef = useRef();
  const anchorRef = useRef();
  const sunflowerManeRef = useRef();

  // Internal state for position, heading, and docking phase
  const currentPos = useRef(new THREE.Vector3(position.x, 0, position.z));
  const headingAngle = useRef(PARALLEL_DOCK_HEADING);
  const waypointIndex = useRef(0);
  const isArrivedRef = useRef(false);

  // Docking animation states (0.0 = full sail, 1.0 = fully docked at pier with anchor lowered & ropes tied)
  const dockFactor = useRef(1.0);

  // Reset waypoint index whenever new waypoints arrive
  useEffect(() => {
    waypointIndex.current = 0;
    isArrivedRef.current = false;
    if (isSailing) {
      dockFactor.current = 0.0;
    }
  }, [waypoints, isSailing]);

  // High-Resolution Procedural Straw Hat Jolly Roger Canvas Texture
  const jollyRogerTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // 1. Sail Canvas Background (Clean off-white sail cloth with vertical seams)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 1024, 1024);

    // Vertical canvas panel seams
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    for (let x = 128; x < 1024; x += 128) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }

    // 2. Crossbones ('X' shape behind skull)
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#18181b';
    ctx.lineWidth = 22;

    const drawBone = (x1, y1, x2, y2) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      [{ x: x1, y: y1 }, { x: x2, y: y2 }].forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x - 24, p.y - 24, 30, 0, Math.PI * 2);
        ctx.arc(p.x + 24, p.y + 24, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    };

    drawBone(240, 240, 784, 784);
    drawBone(784, 240, 240, 784);

    // 3. Skull Head Base
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(512, 490, 175, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 20;
    ctx.stroke();

    // Jaw & Teething Line
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(417, 605, 190, 85, 22);
    ctx.fill();
    ctx.stroke();

    // Teeth grid lines
    ctx.lineWidth = 10;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(417 + i * 47.5, 605);
      ctx.lineTo(417 + i * 47.5, 690);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(417, 647);
    ctx.lineTo(607, 647);
    ctx.stroke();

    // Eye Sockets
    ctx.fillStyle = '#18181b';
    ctx.beginPath();
    ctx.arc(435, 480, 40, 0, Math.PI * 2);
    ctx.arc(589, 480, 40, 0, Math.PI * 2);
    ctx.fill();

    // Nose Cavity
    ctx.beginPath();
    ctx.moveTo(512, 530);
    ctx.lineTo(494, 565);
    ctx.lineTo(530, 565);
    ctx.closePath();
    ctx.fill();

    // 4. Straw Hat
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.ellipse(512, 365, 255, 65, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 16;
    ctx.strokeStyle = '#713f12';
    ctx.stroke();

    // Crown Dome
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(512, 335, 125, Math.PI, 0, false);
    ctx.fill();
    ctx.stroke();

    // Red Ribbon Band
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.rect(387, 325, 250, 42);
    ctx.fill();
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Generate Black Straw Hat Pirate Flag Canvas Texture for Mast Flag
  const blackPirateFlagTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    // Black Flag Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 320);

    // Crossbones
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(140, 60); ctx.lineTo(372, 260);
    ctx.moveTo(372, 60); ctx.lineTo(140, 260);
    ctx.stroke();

    // Skull Face
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(256, 160, 55, 0, Math.PI * 2);
    ctx.fill();

    // Eye Sockets
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(235, 155, 12, 0, Math.PI * 2);
    ctx.arc(277, 155, 12, 0, Math.PI * 2);
    ctx.fill();

    // Straw Hat
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.ellipse(256, 120, 75, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#dc2626';
    ctx.fillRect(216, 110, 80, 12);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Generate Red & Yellow Striped Dome Roof Texture
  const stripedDomeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const stripeWidth = 256 / 8;
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#dc2626' : '#fde047';
      ctx.fillRect(i * stripeWidth, 0, stripeWidth, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Generate Aft Red & Black Striped Spanker Sail Texture
  const redBlackStripeTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const stripeWidth = 256 / 6;
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#b91c1c' : '#0f172a';
      ctx.fillRect(i * stripeWidth, 0, stripeWidth, 256);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame((state, delta) => {
    if (!shipRef.current) return;

    const time = state.clock.getElapsedTime();

    if (isSailing) {
      // Active Waypoint Target while sailing
      const targetWp = waypoints[waypointIndex.current] || { x: position.x, z: position.z };
      const dist = currentPos.current.distanceTo(new THREE.Vector3(targetWp.x, 0, targetWp.z));

      const isFinalDock = waypointIndex.current >= waypoints.length - 1;

      if (dist > (isFinalDock ? 0.12 : 1.5)) {
        const dx = targetWp.x - currentPos.current.x;
        const dz = targetWp.z - currentPos.current.z;
        const moveAngle = Math.atan2(dx, dz);

        let angleDiff = moveAngle - headingAngle.current;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
        headingAngle.current += angleDiff * Math.min(1.0, delta * 4.5);

        const currentSpeed = isFinalDock && dist < 4.0
          ? Math.max(2.5, 13.0 * (dist / 4.0))
          : 13.0;

        const step = Math.min(dist, currentSpeed * delta);
        const dirX = dx / dist;
        const dirZ = dz / dist;
        currentPos.current.x += dirX * step;
        currentPos.current.z += dirZ * step;

        if (isFinalDock && dist < 5.0) {
          dockFactor.current = THREE.MathUtils.lerp(dockFactor.current, 1.0, delta * 1.5);
        } else {
          dockFactor.current = THREE.MathUtils.lerp(dockFactor.current, 0.0, delta * 2.0);
        }
      } else {
        if (!isFinalDock) {
          waypointIndex.current += 1;
        } else {
          currentPos.current.x = targetWp.x;
          currentPos.current.z = targetWp.z;

          const parallelHeading = targetWp.targetHeading !== undefined ? targetWp.targetHeading : PARALLEL_DOCK_HEADING;
          let angleDiff = parallelHeading - headingAngle.current;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          headingAngle.current += angleDiff * Math.min(1.0, delta * 5.0);

          dockFactor.current = THREE.MathUtils.lerp(dockFactor.current, 1.0, delta * 2.5);

          if (!isArrivedRef.current && onArrive) {
            isArrivedRef.current = true;
            onArrive();
          }
        }
      }
    } else {
      // Idle / Docked State: Stay firmly anchored at docked position & aligned 100% parallel to pier
      currentPos.current.x = position.x;
      currentPos.current.z = position.z;

      let angleDiff = PARALLEL_DOCK_HEADING - headingAngle.current;
      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
      headingAngle.current += angleDiff * Math.min(1.0, delta * 6.0);

      dockFactor.current = THREE.MathUtils.lerp(dockFactor.current, 1.0, delta * 2.5);
    }

    // Apply smooth position and rotation transforms to the 3D ship
    const bobbingY = 0.25 + Math.sin(time * 2.2) * 0.08;
    const pitchAngle = Math.sin(time * 1.8) * 0.035;
    const rollAngle = Math.cos(time * 1.5) * 0.045;

    shipRef.current.position.set(currentPos.current.x, bobbingY, currentPos.current.z);
    shipRef.current.rotation.set(pitchAngle, headingAngle.current, rollAngle);

    // Gently rotate lion sunflower mane
    if (sunflowerManeRef.current) {
      sunflowerManeRef.current.rotation.z = Math.sin(time * 1.2) * 0.06;
    }

    // Lower anchor into water when docked
    if (anchorRef.current) {
      anchorRef.current.position.y = THREE.MathUtils.lerp(0.4, -0.6, dockFactor.current);
    }
  });

  return (
    <group ref={shipRef}>
      {/* --- 1. THOUSAND SUNNY SHIP HULL & SOLID BOW CONNECTING STRUCTURE (FIXES GAP/HOLE) --- */}
      {/* Main Base Teak Wood Hull (Extending from Stern Z=-2.7 to Bow Z=3.65) */}
      <mesh position={[0, -0.4, 0.45]}>
        <boxGeometry args={[2.5, 1.4, 6.3]} />
        <meshStandardMaterial color="#b45309" roughness={0.5} />
      </mesh>

      {/* SOLID BOW DECK CONNECTOR (Fills the gap between ship deck & figurehead completely) */}
      <mesh position={[0, 0.1, 3.1]}>
        <boxGeometry args={[2.48, 0.95, 1.2]} />
        <meshStandardMaterial color="#d97706" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.58, 3.1]}>
        <boxGeometry args={[2.52, 0.16, 1.2]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Solid Stern Transom Back Wall */}
      <mesh position={[0, 0.3, -2.7]}>
        <boxGeometry args={[2.52, 1.4, 0.16]} />
        <meshStandardMaterial color="#92400e" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.98, -2.71]}>
        <boxGeometry args={[2.55, 0.08, 0.18]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Main Deck Planks */}
      <mesh position={[0, 0.32, 0.4]}>
        <boxGeometry args={[2.55, 0.16, 6.2]} />
        <meshStandardMaterial color="#d97706" roughness={0.3} />
      </mesh>

      {/* Red Gunwale Upper Wall with White Rim Trim */}
      <group position={[0, 0.55, 0.4]}>
        <mesh position={[1.25, 0, 0]}>
          <boxGeometry args={[0.1, 0.65, 6.2]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <mesh position={[-1.25, 0, 0]}>
          <boxGeometry args={[0.1, 0.65, 6.2]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>

        {/* Top White Rim Trim Line */}
        <mesh position={[1.26, 0.35, 0]}>
          <boxGeometry args={[0.12, 0.08, 6.25]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-1.26, 0.35, 0]}>
          <boxGeometry args={[0.12, 0.08, 6.25]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* WHITE DECORATIVE SCROLL / SPIRAL WAVE CRESTS AT BOW GUNWALE */}
        {[-1.28, 1.28].map((sx, idx) => (
          <group key={idx} position={[sx, 0.45, 2.3]} rotation={[0, 0, sx > 0 ? -0.3 : 0.3]}>
            <mesh position={[0, 0.15, 0]}>
              <torusGeometry args={[0.22, 0.06, 8, 16, Math.PI * 1.4]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}

        {/* White Porthole Windows Lined Along Red Hull */}
        {[-2.2, -1.3, -0.4, 0.5, 1.4, 2.3].map((pz, idx) => (
          <group key={idx}>
            <mesh position={[1.31, 0, pz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[1.33, 0, pz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>

            <mesh position={[-1.31, 0, pz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.13, 0.13, 0.04, 12]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[-1.33, 0, pz]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
              <meshStandardMaterial color="#0f172a" />
            </mesh>
          </group>
        ))}
      </group>

      {/* --- 2. CHANNEL DOCK SYSTEM "1" WHEEL (CENTER HULL ON BOTH SIDES) --- */}
      {[-1.32, 1.32].map((sideX, idx) => (
        <group key={idx} position={[sideX, 0.1, 0.2]} rotation={[0, 0, Math.PI / 2]}>
          {/* Black Outer Wheel Rim */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.75, 0.75, 0.08, 24]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Wooden Wheel Center */}
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 0.08, 24]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          {/* Bold Channel Dock Number "1" Visible on Both Sides */}
          <Text
            position={[0, sideX > 0 ? 0.07 : -0.07, 0]}
            rotation={[-Math.PI / 2, 0, sideX > 0 ? Math.PI / 2 : -Math.PI / 2]}
            fontSize={0.65}
            color="#dc2626"
            fontWeight="bold"
            anchorX="center"
            anchorY="middle"
          >
            1
          </Text>
        </group>
      ))}

      {/* --- 3. CLEAN LION SUN FIGUREHEAD EMBLEM (ZERO FLOATING WHITE BALLS) --- */}
      <group position={[0, 0.75, 3.68]}>
        {/* Red Circular Shield Ring with 8 Flat Gold Studs & 4 White Divider Blocks */}
        <mesh position={[0, 0, -0.2]}>
          <cylinderGeometry args={[1.1, 1.1, 0.2, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#b91c1c" />
        </mesh>

        {/* 4 White Rectangular Divider Blocks on Red Ring */}
        {[0, 90, 180, 270].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh
              key={`div-${idx}`}
              position={[Math.sin(rad) * 1.05, Math.cos(rad) * 1.05, -0.1]}
              rotation={[0, 0, rad]}
            >
              <boxGeometry args={[0.16, 0.26, 0.08]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
          );
        })}

        {/* Gold Collar Ring */}
        <mesh position={[0, 0, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.12, 12, 24]} />
          <meshStandardMaterial color="#eab308" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* 8 Flat Gold Stud Rivets Flush Against Red Shield */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh
              key={`rvt-${idx}`}
              position={[Math.sin(rad) * 0.98, Math.cos(rad) * 0.98, -0.11]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.07, 0.07, 0.02, 12]} />
              <meshStandardMaterial color="#fef08a" metalness={0.8} roughness={0.1} />
            </mesh>
          );
        })}

        {/* PROMINENT CROSSED BONES ('X' SHAPE) MOUNTED FLUSH BEHIND LION HEAD */}
        <group position={[0, 0, -0.02]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.09, 0.09, 2.5, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.09, 0.09, 2.5, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.2} />
          </mesh>

          {/* 4 Double-Knob Bone Tips (Extending out past shield perimeter) */}
          {[
            { x: -0.92, y: 0.92 },
            { x: 0.92, y: 0.92 },
            { x: -0.92, y: -0.92 },
            { x: 0.92, y: -0.92 }
          ].map((pt, bIdx) => (
            <group key={bIdx} position={[pt.x, pt.y, 0]}>
              <mesh position={[-0.07, 0, 0]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
              <mesh position={[0.07, 0, 0]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshStandardMaterial color="#ffffff" roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Bright Yellow Lion Head Sphere */}
        <mesh position={[0, 0, 0.25]}>
          <sphereGeometry args={[0.76, 24, 24]} />
          <meshStandardMaterial color="#facc15" roughness={0.2} />
        </mesh>

        {/* 10 CURVED ORANGE SUN MANE PETALS */}
        <group ref={sunflowerManeRef} position={[0, 0, 0.1]}>
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, idx) => (
            <group key={idx} rotation={[0, 0, (angle * Math.PI) / 180]}>
              <mesh position={[0, 1.05, 0]}>
                <coneGeometry args={[0.26, 1.0, 6]} />
                <meshStandardMaterial color="#f97316" roughness={0.3} />
              </mesh>
            </group>
          ))}
        </group>

        {/* White Oval Snout, Black Nose & Happy Smile Line */}
        <mesh position={[0, -0.06, 0.92]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.1, 1.12]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        <mesh position={[0, -0.16, 1.02]} rotation={[0.3, 0, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>

        {/* Black Expressive Eyes with White Highlight Rings */}
        <mesh position={[0.28, 0.24, 0.88]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        <mesh position={[-0.28, 0.24, 0.88]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        <mesh position={[0.3, 0.27, 0.97]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.26, 0.27, 0.97]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* --- 4. MAIN DECK GRASS LAWN TURF & CABINS --- */}
      {/* Green Lawn Deck */}
      <mesh position={[0, 0.41, -0.4]}>
        <boxGeometry args={[2.3, 0.04, 2.6]} />
        <meshStandardMaterial color="#16a34a" roughness={0.8} />
      </mesh>

      {/* Middle Deck Officers Cabin (Cream Walls & Arched Windows) */}
      <group position={[0, 0.9, -1.0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.9, 1.4]} />
          <meshStandardMaterial color="#fffbeb" roughness={0.4} />
        </mesh>
        {/* Arched Windows */}
        {[-0.6, 0, 0.6].map((wx, idx) => (
          <mesh key={idx} position={[wx, 0.1, 0.71]}>
            <boxGeometry args={[0.25, 0.4, 0.02]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        ))}

        {/* Roof Grass Turf Deck for Nami's Tangerine Grove */}
        <mesh position={[0, 0.48, 0]}>
          <boxGeometry args={[2.05, 0.04, 1.45]} />
          <meshStandardMaterial color="#15803d" />
        </mesh>

        {/* WHITE GARDEN FENCE AROUND NAMI'S TANGERINE GROVE */}
        <mesh position={[0, 0.65, 0.7]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.25, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-1.0, 0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 0.25, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[1.0, 0.65, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 0.25, 0.03]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* DETAILED NAMI'S MIKAN TANGERINE TREES & VIBRANT TANGERINES */}
        {[
          { x: -0.65, z: 0.2, scale: 1.0 },
          { x: 0.0, z: -0.2, scale: 1.1 },
          { x: 0.65, z: 0.2, scale: 1.0 }
        ].map((tree, idx) => (
          <group key={idx} position={[tree.x, 0.68, tree.z]} scale={[tree.scale, tree.scale, tree.scale]}>
            {/* Gnarled Wood Trunk & Branches */}
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.04, 0.06, 0.44, 8]} />
              <meshStandardMaterial color="#78350f" roughness={0.8} />
            </mesh>
            <mesh position={[0.08, 0.35, 0]} rotation={[0, 0, -0.4]}>
              <cylinderGeometry args={[0.03, 0.04, 0.28, 6]} />
              <meshStandardMaterial color="#78350f" />
            </mesh>

            {/* Layered Green Leaf Canopy */}
            <mesh position={[0, 0.52, 0]}>
              <sphereGeometry args={[0.26, 12, 12]} />
              <meshStandardMaterial color="#16a34a" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.65, 0]}>
              <sphereGeometry args={[0.18, 10, 10]} />
              <meshStandardMaterial color="#15803d" roughness={0.5} />
            </mesh>

            {/* Bright Orange Tangerine Fruit Clusters (6 Tangerines per tree = 18 total!) */}
            {[
              { tx: 0.16, ty: 0.5, tz: 0.12 },
              { tx: -0.16, ty: 0.48, tz: 0.14 },
              { tx: 0.0, ty: 0.62, tz: 0.18 },
              { tx: 0.18, ty: 0.58, tz: -0.1 },
              { tx: -0.14, ty: 0.52, tz: -0.15 },
              { tx: 0.0, ty: 0.42, tz: -0.18 }
            ].map((tg, tIdx) => (
              <group key={tIdx} position={[tg.tx, tg.ty, tg.tz]}>
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.055, 8, 8]} />
                  <meshStandardMaterial color="#f97316" roughness={0.3} />
                </mesh>
                {/* Tiny Green Leaf Cap */}
                <mesh position={[0, 0.05, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.01, 5]} />
                  <meshStandardMaterial color="#15803d" />
                </mesh>
              </group>
            ))}
          </group>
        ))}
      </group>

      {/* AFT DOME CABIN (NAMI'S MIKAN GARDEN & KITCHEN) WITH RED/YELLOW STRIPED DOME ROOF */}
      <group position={[0, 1.5, -2.0]}>
        {/* Circular Cream Lower Cabin */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.9, 0.95, 0.8, 20]} />
          <meshStandardMaterial color="#fffbeb" />
        </mesh>
        {/* Windows */}
        {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={idx} position={[Math.sin(rad) * 0.92, 0.3, Math.cos(rad) * 0.92]} rotation={[0, rad, 0]}>
              <boxGeometry args={[0.22, 0.35, 0.04]} />
              <meshStandardMaterial color="#0284c7" />
            </mesh>
          );
        })}

        {/* RED & YELLOW STRIPED DOME ROOF */}
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.95, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
          <meshStandardMaterial map={stripedDomeTexture} roughness={0.3} />
        </mesh>

        {/* White Balustrade Railing around Aft Deck */}
        <mesh position={[0, -0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.98, 0.03, 8, 24]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* REAR PADDLE WHEELS & STERN LANTERN */}
      {[-1.38, 1.38].map((px, idx) => (
        <group key={idx} position={[px, 0.4, -2.0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.55, 0.55, 0.25, 12]} />
            <meshStandardMaterial color="#78350f" />
          </mesh>
          {[0, 45, 90, 135].map((pAngle, pIdx) => (
            <mesh key={pIdx} rotation={[0, (pAngle * Math.PI) / 180, 0]}>
              <boxGeometry args={[1.2, 0.04, 0.22]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          ))}
        </group>
      ))}

      {/* Stern Lantern Light */}
      <mesh position={[0, 1.4, -2.78]}>
        <cylinderGeometry args={[0.1, 0.14, 0.35, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.8} />
      </mesh>

      {/* --- 5. MASTS, YARDARMS & SAILS (EXACT MATCH FOR REFERENCE IMAGE) --- */}
      {/* FRONT FORE MAST (Holds Jolly Roger Sail + Crow's Nest Lookout Cupola) */}
      <mesh position={[0, 2.8, 2.1]}>
        <cylinderGeometry args={[0.08, 0.12, 5.0]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>

      {/* BIG STRAW HAT JOLLY ROGER SAIL ON FRONT MAST */}
      <group ref={foreSailRef} position={[0, 2.7, 2.15]}>
        <mesh position={[0, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[3.4, 2.4]} />
          <meshStandardMaterial
            color="#ffffff"
            map={jollyRogerTexture}
            side={THREE.DoubleSide}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* CROW'S NEST LOOKOUT TOWER CUPOLA ATOP FRONT MAST */}
      <group position={[0, 4.7, 2.1]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.45, 0.38, 0.5, 16]} />
          <meshStandardMaterial color="#fffbeb" />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.06, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.48, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
          <meshStandardMaterial map={stripedDomeTexture} roughness={0.3} />
        </mesh>
        {/* Waving Black Pirate Flag atop Crow's Nest */}
        <mesh position={[0.4, 1.3, 0]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.7, 0.4]} />
          <meshStandardMaterial map={blackPirateFlagTexture} side={THREE.DoubleSide} roughness={0.5} />
        </mesh>
      </group>

      {/* MAIN REAR MAST (Taller Mast with Upper White Sail & Lower Red/Black Striped Sail) */}
      <mesh position={[0, 3.0, 0.4]}>
        <cylinderGeometry args={[0.1, 0.15, 5.8]} />
        <meshStandardMaterial color="#451a03" />
      </mesh>

      {/* UPPER WHITE SAIL ON MAIN REAR MAST */}
      <group ref={mainSailRef} position={[0, 4.1, 0.4]}>
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 3.4]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.2, 1.8]} />
          <meshStandardMaterial color="#f8fafc" side={THREE.DoubleSide} roughness={0.6} />
        </mesh>
      </group>

      {/* LOWER RED & BLACK STRIPED SPANKER SAIL ON MAIN REAR MAST */}
      <group position={[0, 2.2, 0.4]}>
        <mesh position={[0, 0.9, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 2.8]} />
          <meshStandardMaterial color="#78350f" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.6, 2.0]} />
          <meshStandardMaterial color="#ffffff" map={redBlackStripeTexture} side={THREE.DoubleSide} roughness={0.6} />
        </mesh>
      </group>

      {/* TOP BLACK PIRATE FLAG ATOP MAIN REAR MAST */}
      <group position={[0, 6.0, 0.4]}>
        <mesh position={[0.45, 0, 0]}>
          <planeGeometry args={[0.9, 0.5]} />
          <meshStandardMaterial map={blackPirateFlagTexture} side={THREE.DoubleSide} roughness={0.5} />
        </mesh>
      </group>

      {/* LOWERABLE GOLDEN ANCHOR */}
      <group ref={anchorRef} position={[1.15, 0.4, 2.2]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} />
        </mesh>
      </group>

      {/* DOCKING MOORING ROPES (Visible when docked) */}
      {dockFactor.current > 0.4 && (
        <group position={[1.25, 0.2, 0]}>
          <mesh position={[0, 0, 2.0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 1.8]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          <mesh position={[0, 0, -2.0]} rotation={[0, 0, -Math.PI / 6]}>
            <cylinderGeometry args={[0.03, 0.03, 1.8]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
        </group>
      )}
    </group>
  );
});
