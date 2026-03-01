import type { AdminAction } from './types';

export const adminLogRepo = {
  save(entry: AdminAction): void {
    console.log('[admin.log]', entry);
  },
};
