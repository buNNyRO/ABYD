import type { AppContext } from '../../core/types';
import { authService } from './service';

export function registerAuthEvents(ctx: AppContext): void {
  ctx.onRemote('ui:auth:register', (playerId, username, password) => {
    const result = authService.register(String(username), String(password));
    ctx.emitToClient(playerId, 'auth:result', result.ok, result.message);
  });

  ctx.onRemote('ui:auth:login', (playerId, username, password) => {
    const result = authService.login(playerId, String(username), String(password));
    if (result.ok) {
      const session = ctx.sessions.get(playerId);
      if (session) {
        session.loggedIn = true;
        session.userId = result.userId;
      }
    }
    ctx.emitToClient(playerId, 'auth:result', result.ok, result.message);
  });
}
