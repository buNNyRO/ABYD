/** CEF side bridge used by the auth page/app. */

declare global {
  interface Window {
    mp?: {
      trigger(event: string, ...args: unknown[]): void;
    };
  }
}

export function login(username: string, password: string): void {
  window.mp?.trigger('ui:auth:login', username, password);
}

export function register(username: string, password: string): void {
  window.mp?.trigger('ui:auth:register', username, password);
}
