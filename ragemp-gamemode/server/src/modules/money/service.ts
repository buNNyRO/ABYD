import { moneyRepo } from './repo';

export const moneyService = {
  get(characterId: number): number {
    return moneyRepo.get(characterId);
  },
  set(characterId: number, value: number): number {
    const safe = Math.max(0, Math.floor(value));
    moneyRepo.set(characterId, safe);
    return safe;
  },
  give(characterId: number, value: number): number {
    return this.set(characterId, this.get(characterId) + value);
  },
  take(characterId: number, value: number): number {
    return this.set(characterId, this.get(characterId) - value);
  },
};
