import type { SpawnPoint } from './types';

const spawns: SpawnPoint[] = [
  { x: -425.5, y: 1123.2, z: 325.0, heading: 177.0 },
  { x: 215.1, y: -810.4, z: 30.7, heading: 89.0 },
];

export const worldRepo = {
  randomSpawn(): SpawnPoint {
    return spawns[Math.floor(Math.random() * spawns.length)];
  },
};
