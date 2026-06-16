import { InventoryEntity } from '@modules/inventory/domain/entities/inventory.entity';
import { InventoryResponseDto } from '@modules/inventory/interface/dto/inventory-response.dto';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepositoryPort {
  create(inventory: InventoryEntity): Promise<InventoryEntity>;

  updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null>;

  deleteOneInventory(id: string): Promise<InventoryEntity | null>;

  deductStock(id: string, quantity: number): Promise<InventoryEntity | null>;

  addStock(id: string, quantity: number): Promise<any | null>;

  getInventoryByProduct(productId: string): Promise<InventoryEntity | null>;

  getOneInventory(id: string): Promise<InventoryEntity>;

  getAllInventories(): Promise<InventoryEntity[]>;
}
