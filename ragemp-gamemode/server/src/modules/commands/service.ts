import { DEFAULT_COMMAND_COOLDOWN_MS } from './constants';

const lastByPlayer = new Map<number, number>();

export const commandsService = {
  canExecute(playerId: number): boolean {
    const now = Date.now();
    const last = lastByPlayer.get(playerId) ?? 0;
    if (now - last < DEFAULT_COMMAND_COOLDOWN_MS) return false;
    lastByPlayer.set(playerId, now);
    return true;
  },
};
