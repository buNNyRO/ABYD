import { worldRepo } from './repo';

export const worldService = {
  getSpawn() {
    return worldRepo.randomSpawn();
  },
};
