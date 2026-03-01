import type { AppContext } from '../../core/types';
import { worldService } from './service';

export function registerWorldEvents(ctx: AppContext): void {
  ctx.onRemote('world:spawn:random', (playerId) => {
    const spawn = worldService.getSpawn();
    ctx.emitToClient(playerId, 'world:spawn:apply', spawn);
  });
}
