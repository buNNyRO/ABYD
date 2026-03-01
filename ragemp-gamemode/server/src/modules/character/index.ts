import type { Module } from '../../core/types';
import { registerCharacterEvents } from './events';

export const characterModule: Module = {
  name: 'character',
  register(ctx) {
    registerCharacterEvents(ctx);
  },
};
