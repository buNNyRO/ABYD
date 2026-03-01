import type { AppContext } from '../../core/types';
import { ADMIN_MIN_LEVEL } from './constants';
import { adminService } from './service';

export function registerAdminEvents(ctx: AppContext): void {
  ctx.commandBus.register(
    'setmoney',
    (playerId, args) => {
      const characterId = Number(args[0]);
      const value = Number(args[1]);
      const balance = adminService.setMoney(playerId, characterId, value);
      ctx.emitToClient(playerId, 'admin:setmoney:result', true, `New balance: ${balance}`);
    },
    ADMIN_MIN_LEVEL,
  );
}
