import type { AuthUser } from './types';

const users = new Map<string, AuthUser>();
let userSeq = 1;

export const authRepo = {
  findByUsername(username: string): AuthUser | undefined {
    return users.get(username.toLowerCase());
  },
  create(username: string, passwordHash: string): AuthUser {
    const user: AuthUser = { id: userSeq++, username, passwordHash };
    users.set(username.toLowerCase(), user);
    return user;
  },
};
