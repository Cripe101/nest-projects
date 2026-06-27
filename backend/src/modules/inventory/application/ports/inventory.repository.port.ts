import { InventoryEntity } from '@modules/inventory/domain/entities/inventory.entity';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepositoryPort {
  create(inventory: InventoryEntity): Promise<InventoryEntity>;

  updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null>;

  deleteOneInventory(id: string): Promise<InventoryEntity | null>;

  deductStock(id: string, quantity: number): Promise<InventoryEntity | null>;

  addStock(id: string, quantity: number): Promise<InventoryEntity | null>;

  getInventoryByProduct(productId: string): Promise<InventoryEntity | null>;

  getOneInventory(id: string): Promise<InventoryEntity | null>;

  getAllInventories(): Promise<InventoryEntity[]>;
}
