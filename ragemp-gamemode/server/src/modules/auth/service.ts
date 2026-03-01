import { AUTH_MAX_ATTEMPTS, AUTH_RATE_LIMIT_WINDOW_MS } from './constants';
import { authRepo } from './repo';

const attempts = new Map<number, { count: number; firstAt: number }>();

function hashPassword(plain: string): string {
  let hash = 0;
  for (let i = 0; i < plain.length; i += 1) hash = (hash * 31 + plain.charCodeAt(i)) | 0;
  return `h_${Math.abs(hash)}`;
}

function limited(playerId: number): boolean {
  const now = Date.now();
  const state = attempts.get(playerId);
  if (!state) return false;
  if (now - state.firstAt > AUTH_RATE_LIMIT_WINDOW_MS) {
    attempts.delete(playerId);
    return false;
  }
  return state.count >= AUTH_MAX_ATTEMPTS;
}

function registerAttempt(playerId: number): void {
  const now = Date.now();
  const state = attempts.get(playerId);
  if (!state || now - state.firstAt > AUTH_RATE_LIMIT_WINDOW_MS) {
    attempts.set(playerId, { count: 1, firstAt: now });
    return;
  }
  state.count += 1;
}

export const authService = {
  register(username: string, password: string): { ok: boolean; message: string; userId?: number } {
    if (authRepo.findByUsername(username)) {
      return { ok: false, message: 'Username already exists' };
    }
    const user = authRepo.create(username, hashPassword(password));
    return { ok: true, message: 'Account created', userId: user.id };
  },

  login(playerId: number, username: string, password: string): { ok: boolean; message: string; userId?: number } {
    if (limited(playerId)) return { ok: false, message: 'Too many attempts' };
    const user = authRepo.findByUsername(username);
    if (!user || user.passwordHash !== hashPassword(password)) {
      registerAttempt(playerId);
      return { ok: false, message: 'Invalid credentials' };
    }
    return { ok: true, message: 'Login success', userId: user.id };
  },
};
