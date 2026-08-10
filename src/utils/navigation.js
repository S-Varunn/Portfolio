import * as THREE from 'three';

// Wooden dock pier orientation angle in Island3D.jsx (Extends along Z-axis)
export const DOCK_PIER_ANGLE = Math.PI; // 180 degrees (parallel to Pier Z axis)
// Heading 100% parallel along the long side of the wooden pier deck
export const PARALLEL_DOCK_HEADING = Math.PI; // 180 degrees

/**
 * Calculates a clean, waypointed sea route around islands to the target island's dock pier.
 */
export function calculateSeaRoute(startPos, targetIsland, _allIslands) {
  const endDock = targetIsland.dockCoordinates || { worldX: targetIsland.coordinates.worldX, worldZ: targetIsland.coordinates.worldZ };
  
  const waypoints = [];

  const startVec = new THREE.Vector2(startPos.x, startPos.z);
  const endVec = new THREE.Vector2(endDock.worldX, endDock.worldZ);
  const distTotal = startVec.distanceTo(endVec);

  // If long voyage across the sea, add a deep water open ocean waypoint to curve around intermediate islands
  if (distTotal > 16.0) {
    const midX = (startPos.x + endDock.worldX) / 2;
    // Choose deep water channel (Z = 32 or Z = -28) clear of island centers
    const midZ = (startPos.z + endDock.worldZ) / 2 > 0 ? 32.0 : -28.0;
    waypoints.push({ x: midX, z: midZ, isDock: false });
  }

  // Pre-dock approach point (5 units out in open sea facing the dock pier)
  const approachX = endDock.worldX + 5.0;
  const approachZ = endDock.worldZ;
  waypoints.push({ x: approachX, z: approachZ, isDock: false });

  // Final Dock Position alongside the wooden pier deck
  waypoints.push({
    x: endDock.worldX,
    z: endDock.worldZ,
    isDock: true,
    targetHeading: endDock.targetHeading !== undefined ? endDock.targetHeading : PARALLEL_DOCK_HEADING
  });

  return waypoints;
}
