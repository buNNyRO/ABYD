import type { Module } from '../../core/types';
import { registerInventoryEvents } from './events';

export const inventoryModule: Module = {
  name: 'inventory',
  register(ctx) {
    registerInventoryEvents(ctx);
  },
};
