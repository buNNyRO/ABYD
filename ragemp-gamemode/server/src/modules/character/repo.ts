import type { CharacterState } from './types';
import { DEFAULT_SPAWN } from './constants';

const byUserId = new Map<number, CharacterState>();
let seq = 1;

export const characterRepo = {
  loadOrCreate(userId: number): CharacterState {
    const existing = byUserId.get(userId);
    if (existing) return existing;
    const created: CharacterState = { id: seq++, userId, position: { ...DEFAULT_SPAWN }, heading: 0, money: 500 };
    byUserId.set(userId, created);
    return created;
  },
  savePosition(userId: number, x: number, y: number, z: number, heading: number): void {
    const ch = byUserId.get(userId);
    if (!ch) return;
    ch.position = { x, y, z };
    ch.heading = heading;
  },
};
