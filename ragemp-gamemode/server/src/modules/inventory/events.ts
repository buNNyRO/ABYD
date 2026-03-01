import type { AppContext } from '../../core/types';
import { inventoryService } from './service';

export function registerInventoryEvents(ctx: AppContext): void {
  ctx.onRemote('inventory:move', (playerId, fromSlot, toSlot) => {
    const characterId = ctx.sessions.get(playerId)?.characterId;
    if (!characterId) return;
    inventoryService.move('player', characterId, Number(fromSlot), Number(toSlot));
  });

  setInterval(() => {
    void inventoryService.flushDirty(false);
  }, 1000);
}
