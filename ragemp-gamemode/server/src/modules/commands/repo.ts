export const commandLogRepo = {
  log(playerId: number, command: string): void {
    console.log('[command]', { playerId, command });
  },
};
