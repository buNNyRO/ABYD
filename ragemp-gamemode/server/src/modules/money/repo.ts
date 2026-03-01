const moneyByCharacter = new Map<number, number>();

export const moneyRepo = {
  get(characterId: number): number {
    return moneyByCharacter.get(characterId) ?? 0;
  },
  set(characterId: number, value: number): void {
    moneyByCharacter.set(characterId, value);
  },
};
