export interface AdminAction {
  actorPlayerId: number;
  command: string;
  payload: Record<string, unknown>;
}
