import { logger } from './logger';
import { CommandBus } from './command-bus';
import type { AppContext, Module, PlayerId, SessionState } from './types';
import { authModule } from '../modules/auth';
import { characterModule } from '../modules/character';
import { commandsModule } from '../modules/commands';
import { moneyModule } from '../modules/money';
import { inventoryModule } from '../modules/inventory';
import { adminModule } from '../modules/admin';
import { worldModule } from '../modules/world';

class ServerRuntime {
  private readonly remoteHandlers = new Map<string, (playerId: PlayerId, ...args: unknown[]) => void>();
  private readonly sessions = new Map<PlayerId, SessionState>();
  private readonly commandBus = new CommandBus({ sessions: this.sessions, logger });

  readonly ctx: AppContext = {
    logger,
    sessions: this.sessions,
    emitToClient: (playerId, event, ...args) => {
      logger.info('emitToClient', { playerId, event, args });
    },
    onRemote: (event, handler) => {
      this.remoteHandlers.set(event, handler);
    },
    commandBus: {
      register: (name, fn, minAdmin) => this.commandBus.register(name, fn, minAdmin),
      execute: (playerId, raw) => this.commandBus.execute(playerId, raw),
    },
  };

  registerModules(modules: Module[]): void {
    modules.forEach((m) => {
      m.register(this.ctx);
      logger.info('Module registered', { module: m.name });
    });
  }

  simulateRemote(playerId: PlayerId, event: string, ...args: unknown[]): void {
    const handler = this.remoteHandlers.get(event);
    if (!handler) return;
    handler(playerId, ...args);
  }

  ensureSession(playerId: PlayerId): SessionState {
    let session = this.sessions.get(playerId);
    if (!session) {
      session = { playerId, loggedIn: false, adminLevel: 0 };
      this.sessions.set(playerId, session);
    }
    return session;
  }
}

export const runtime = new ServerRuntime();

export function bootstrap(): void {
  runtime.registerModules([
    authModule,
    characterModule,
    commandsModule,
    moneyModule,
    inventoryModule,
    adminModule,
    worldModule,
  ]);
}
