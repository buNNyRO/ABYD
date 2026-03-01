import type { InventoryContainer } from './types';

export const inventoryRepo = {
  async flush(container: InventoryContainer): Promise<void> {
    const payload = Array.from(container.items.values());
    console.log('[inventory.flush]', container.ownerType, container.ownerId, payload.length);
  },
};
