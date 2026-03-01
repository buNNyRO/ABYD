import type { AppContext } from '../../core/types';
import { characterService } from './service';

export function registerCharacterEvents(ctx: AppContext): void {
  ctx.onRemote('character:spawn:request', (playerId) => {
    const session = ctx.sessions.get(playerId);
    if (!session?.userId) return;
    const character = characterService.spawnForUser(session.userId);
    session.characterId = character.id;
    ctx.emitToClient(playerId, 'character:spawn', character.position, character.heading, character.money);
  });

  ctx.onRemote('character:position:save', (playerId, x, y, z, heading) => {
    const session = ctx.sessions.get(playerId);
    if (!session?.userId) return;
    characterService.savePosition(session.userId, Number(x), Number(y), Number(z), Number(heading));
  });
}
