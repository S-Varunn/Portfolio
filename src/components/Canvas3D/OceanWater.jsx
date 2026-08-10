import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getWaveHeight } from '../../utils/wavePhysics';

export function OceanWater({ weatherMode = 'noon' }) {
  const meshRef = useRef();

  // Create high-detail plane geometry (100x100 segments) with vertex colors
  const { geometry } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(160, 160, 100, 100);
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return { geometry: geo };
  }, []);

  // Bright, tropical ocean color palette (adapts dynamically to weatherMode)
  const { lightOceanBlue, skyLightBlue, softIceFoam } = useMemo(() => {
    if (weatherMode === 'sunset') {
      return {
        lightOceanBlue: new THREE.Color('#0369a1'), // Deep vibrant ocean blue
        skyLightBlue: new THREE.Color('#0284c7'),   // Tropical blue water surface
        softIceFoam: new THREE.Color('#fde047')     // Sunset golden wave crest reflections
      };
    }
    return {
      lightOceanBlue: new THREE.Color('#0284c7'),  // Tropical Light Blue Base
      skyLightBlue: new THREE.Color('#38bdf8'),    // Vibrant Sky Light Blue Surface
      softIceFoam: new THREE.Color('#e0f2fe')     // Soft White Ice-Blue Foam
    };
  }, [weatherMode]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    const positionAttribute = meshRef.current.geometry.attributes.position;
    const colorAttribute = meshRef.current.geometry.attributes.color;
    const count = positionAttribute.count;

    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i); // Plane Y is world Z when rotated -Math.PI/2

      // Calculate procedural wave height z displacement
      const z = getWaveHeight(x, -y, time);
      positionAttribute.setZ(i, z);

      // Light Blue color blending: Light Ocean Blue -> Sky Light Blue -> Soft Ice Foam
      if (z < 0.0) {
        const factor = THREE.MathUtils.clamp((z + 0.8) / 0.8, 0, 1);
        tempColor.copy(lightOceanBlue).lerp(skyLightBlue, factor);
      } else {
        const factor = THREE.MathUtils.clamp(z / 0.6, 0, 1);
        tempColor.copy(skyLightBlue).lerp(softIceFoam, factor * 0.4);
      }

      colorAttribute.setXYZ(i, tempColor.r, tempColor.g, tempColor.b);
    }

    positionAttribute.needsUpdate = true;
    colorAttribute.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.3, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        vertexColors
        roughness={0.1}
        metalness={0.3}
        flatShading={false}
      />
    </mesh>
  );
}
