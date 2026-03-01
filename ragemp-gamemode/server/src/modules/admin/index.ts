import type { Module } from '../../core/types';
import { registerAdminEvents } from './events';

export const adminModule: Module = {
  name: 'admin',
  register(ctx) {
    registerAdminEvents(ctx);
  },
};
