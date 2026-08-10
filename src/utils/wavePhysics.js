// Ocean Wave Physics Engine
// Computes procedural ocean wave elevation and slope for 3D Thousand Sunny boat buoyancy

export function getWaveHeight(x, z, time) {
  // Wave 1: Primary gentle rolling ocean swell
  const w1 = Math.sin(x * 0.14 + time * 1.2) * Math.cos(z * 0.11 + time * 1.0) * 0.68;
  
  // Wave 2: Secondary diagonal ocean wave
  const w2 = Math.sin((x + z) * 0.22 - time * 1.7) * 0.38;
  
  // Wave 3: Surface chop & foam ripple
  const w3 = Math.sin(x * 0.55 - time * 3.0) * Math.cos(z * 0.45 + time * 2.5) * 0.18;
  
  // Sum height
  return w1 + w2 + w3;
}

export function getBoatTransform(x, z, time, headingAngle = 0) {
  const currentY = getWaveHeight(x, z, time);
  
  // Calculate heights around boat to determine pitch and roll
  const delta = 0.8;
  const frontY = getWaveHeight(x + Math.sin(headingAngle) * delta, z + Math.cos(headingAngle) * delta, time);
  const backY  = getWaveHeight(x - Math.sin(headingAngle) * delta, z - Math.cos(headingAngle) * delta, time);
  const rightY = getWaveHeight(x + Math.cos(headingAngle) * delta, z - Math.sin(headingAngle) * delta, time);
  const leftY  = getWaveHeight(x - Math.cos(headingAngle) * delta, z + Math.sin(headingAngle) * delta, time);

  // Pitch (nose up/down) and Roll (side to side)
  const pitch = (frontY - backY) * 0.22;
  const roll  = (rightY - leftY) * 0.22;

  return {
    y: currentY,
    pitch,
    roll
  };
}
