import { characterRepo } from './repo';

export const characterService = {
  spawnForUser(userId: number) {
    return characterRepo.loadOrCreate(userId);
  },
  savePosition(userId: number, x: number, y: number, z: number, heading: number): void {
    characterRepo.savePosition(userId, x, y, z, heading);
  },
};
