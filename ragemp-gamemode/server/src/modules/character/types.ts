import type { Vector3 } from '../../core/types';

export interface CharacterState {
  id: number;
  userId: number;
  position: Vector3;
  heading: number;
  money: number;
}
