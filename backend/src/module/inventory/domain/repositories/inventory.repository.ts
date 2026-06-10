import { InventoryEntity } from '../entities/inventory.entity';

export abstract class InventoryRepositpory {
  abstract create(inventory: InventoryEntity): Promise<InventoryEntity>;

  abstract updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null>;

  abstract deleteOneInventory(id: string): Promise<InventoryEntity | null>;

  abstract deductStock(
    id: string,
    quantity: number,
  ): Promise<InventoryEntity | null>;

  abstract addStock(id: string, quantity: number): Promise<any | null>;

  abstract getInventoryByProduct(
    productId: string,
  ): Promise<InventoryEntity | null>;

  abstract getOneInventory(id: string): Promise<InventoryEntity | null>;

  abstract getAllInventories(): Promise<InventoryEntity[]>;
}
