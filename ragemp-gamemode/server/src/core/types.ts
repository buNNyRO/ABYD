export type PlayerId = number;

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface SessionState {
  playerId: PlayerId;
  userId?: number;
  characterId?: number;
  loggedIn: boolean;
  adminLevel: number;
}

export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export interface Module {
  name: string;
  register(ctx: AppContext): void;
}

export interface AppContext {
  logger: Logger;
  sessions: Map<PlayerId, SessionState>;
  emitToClient(playerId: PlayerId, event: string, ...args: unknown[]): void;
  onRemote(event: string, handler: (playerId: PlayerId, ...args: unknown[]) => void): void;
  commandBus: {
    register(name: string, fn: (playerId: PlayerId, args: string[]) => void, minAdmin?: number): void;
    execute(playerId: PlayerId, raw: string): void;
  };
}
