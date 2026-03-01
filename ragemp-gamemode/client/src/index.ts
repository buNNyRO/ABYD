/**
 * RAGE:MP client bridge (skeleton):
 * - primește evenimente CEF prin mp.events.add
 * - forward la server prin mp.events.callRemote
 * - primește răspuns server și le trimite în CEF
 */

type MpLike = {
  events: {
    add(name: string, cb: (...args: unknown[]) => void): void;
    callRemote(name: string, ...args: unknown[]): void;
  };
};

declare const mp: MpLike;

mp.events.add('ui:auth:login', (username: string, password: string) => {
  mp.events.callRemote('ui:auth:login', username, password);
});

mp.events.add('ui:auth:register', (username: string, password: string) => {
  mp.events.callRemote('ui:auth:register', username, password);
});

mp.events.add('ui:inventory:move', (fromSlot: number, toSlot: number) => {
  mp.events.callRemote('inventory:move', fromSlot, toSlot);
});
