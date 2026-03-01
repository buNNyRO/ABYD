import type { AppContext } from '../../core/types';
import { moneyService } from './service';

export function registerMoneyEvents(ctx: AppContext): void {
  ctx.onRemote('money:get', (playerId) => {
    const characterId = ctx.sessions.get(playerId)?.characterId;
    if (!characterId) return;
    ctx.emitToClient(playerId, 'money:value', moneyService.get(characterId));
  });
}
