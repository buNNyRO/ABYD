import { moneyService } from '../money/service';
import { adminLogRepo } from './repo';

export const adminService = {
  setMoney(actorPlayerId: number, targetCharacterId: number, value: number): number {
    const balance = moneyService.set(targetCharacterId, value);
    adminLogRepo.save({ actorPlayerId, command: 'setmoney', payload: { targetCharacterId, value: balance } });
    return balance;
  },
};
