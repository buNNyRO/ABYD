import type { Module } from '../../core/types';
import { registerAuthEvents } from './events';

export const authModule: Module = {
  name: 'auth',
  register(ctx) {
    registerAuthEvents(ctx);
  },
};
