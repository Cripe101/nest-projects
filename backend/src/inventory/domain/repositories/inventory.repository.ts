import { InventoryEntity } from '../entities/inventory.entity';

export abstract class InventoryRepositpory {
  abstract createInventory(
    inventory: InventoryEntity,
  ): Promise<InventoryEntity>;

  abstract updateInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null>;

  abstract deleteInventory(id: string): Promise<InventoryEntity | null>;

  abstract getInventoryByProduct(
    productId: string,
  ): Promise<InventoryEntity | null>;

  abstract getOneInventory(id: string): Promise<InventoryEntity | null>;

  abstract getAllInventory(): Promise<InventoryEntity[]>;
}
