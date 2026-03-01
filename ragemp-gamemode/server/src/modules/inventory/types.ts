export interface InventoryItem {
  slot: number;
  itemId: string;
  amount: number;
  meta?: Record<string, unknown>;
}

export interface InventoryContainer {
  ownerType: 'player' | 'vehicle' | 'property';
  ownerId: number;
  items: Map<number, InventoryItem>;
  dirtyAt?: number;
  touchedAt: number;
}
