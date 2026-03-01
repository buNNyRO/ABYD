import type { AppContext, PlayerId } from './types';

type CommandHandler = {
  minAdmin: number;
  fn: (playerId: PlayerId, args: string[]) => void;
};

export class CommandBus {
  private readonly handlers = new Map<string, CommandHandler>();

  constructor(private readonly ctx: Pick<AppContext, 'sessions' | 'logger'>) {}

  register(name: string, fn: (playerId: PlayerId, args: string[]) => void, minAdmin = 0): void {
    this.handlers.set(name.toLowerCase(), { minAdmin, fn });
  }

  execute(playerId: PlayerId, raw: string): void {
    if (!raw.startsWith('/')) return;
    const [name, ...args] = raw.slice(1).split(/\s+/);
    const command = this.handlers.get(name.toLowerCase());
    if (!command) return;

    const session = this.ctx.sessions.get(playerId);
    if (!session || session.adminLevel < command.minAdmin) {
      this.ctx.logger.warn('Command denied', { playerId, command: name });
      return;
    }

    command.fn(playerId, args);
  }
}
