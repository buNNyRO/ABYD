import type { Module } from '../../core/types';
import { registerWorldEvents } from './events';

export const worldModule: Module = {
  name: 'world',
  register(ctx) {
    registerWorldEvents(ctx);
  },
};
