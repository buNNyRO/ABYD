import type { AppContext } from '../../core/types';
import { commandLogRepo } from './repo';
import { commandsService } from './service';

export function registerCommandEvents(ctx: AppContext): void {
  ctx.onRemote('player:command', (playerId, rawCommand) => {
    if (!commandsService.canExecute(playerId)) return;
    const command = String(rawCommand);
    commandLogRepo.log(playerId, command);
    ctx.commandBus.execute(playerId, command);
  });
}
