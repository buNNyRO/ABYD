import type { Module } from '../../core/types';
import { registerCommandEvents } from './events';

export const commandsModule: Module = {
  name: 'commands',
  register(ctx) {
    registerCommandEvents(ctx);
  },
};
