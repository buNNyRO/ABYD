import { INVENTORY_DEBOUNCE_MS, INVENTORY_FORCE_FLUSH_MS } from './constants';
import { inventoryRepo } from './repo';
import type { InventoryContainer, InventoryItem } from './types';

const containers = new Map<string, InventoryContainer>();

function key(ownerType: InventoryContainer['ownerType'], ownerId: number): string {
  return `${ownerType}:${ownerId}`;
}

function ensure(ownerType: InventoryContainer['ownerType'], ownerId: number): InventoryContainer {
  const k = key(ownerType, ownerId);
  let c = containers.get(k);
  if (!c) {
    c = { ownerType, ownerId, items: new Map(), touchedAt: Date.now() };
    containers.set(k, c);
  }
  return c;
}

export const inventoryService = {
  getContainer(ownerType: InventoryContainer['ownerType'], ownerId: number): InventoryContainer {
    return ensure(ownerType, ownerId);
  },
  move(ownerType: InventoryContainer['ownerType'], ownerId: number, fromSlot: number, toSlot: number): void {
    const c = ensure(ownerType, ownerId);
    const from = c.items.get(fromSlot);
    const to = c.items.get(toSlot);
    if (from) c.items.set(toSlot, { ...from, slot: toSlot });
    if (to) c.items.set(fromSlot, { ...to, slot: fromSlot });
    if (!to) c.items.delete(fromSlot);
    c.dirtyAt = Date.now();
    c.touchedAt = Date.now();
  },
  set(ownerType: InventoryContainer['ownerType'], ownerId: number, item: InventoryItem): void {
    const c = ensure(ownerType, ownerId);
    c.items.set(item.slot, item);
    c.dirtyAt = Date.now();
    c.touchedAt = Date.now();
  },
  remove(ownerType: InventoryContainer['ownerType'], ownerId: number, slot: number): void {
    const c = ensure(ownerType, ownerId);
    c.items.delete(slot);
    c.dirtyAt = Date.now();
    c.touchedAt = Date.now();
  },
  async flushDirty(force = false): Promise<number> {
    const now = Date.now();
    const dirty = Array.from(containers.values()).filter((c) => {
      if (!c.dirtyAt) return false;
      return force || now - c.dirtyAt >= INVENTORY_DEBOUNCE_MS || now - c.touchedAt >= INVENTORY_FORCE_FLUSH_MS;
    });
    for (const c of dirty) {
      await inventoryRepo.flush(c);
      c.dirtyAt = undefined;
    }
    return dirty.length;
  },
};
