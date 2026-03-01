import type { Module } from '../../core/types';
import { registerMoneyEvents } from './events';

export const moneyModule: Module = {
  name: 'money',
  register(ctx) {
    registerMoneyEvents(ctx);
  },
};
