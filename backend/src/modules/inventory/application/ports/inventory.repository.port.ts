import { InventoryEntity } from '@modules/inventory/domain/entities/inventory.entity';
import { Result } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepositoryPort {
  create(
    inventory: InventoryEntity,
  ): Promise<Result<InventoryEntity, InventoryError>>;

  updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<Result<InventoryEntity | null, InventoryError>>;

  deleteOneInventory(
    id: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>>;

  deductStock(
    id: string,
    quantity: number,
  ): Promise<Result<InventoryEntity, InventoryError>>;

  addStock(
    id: string,
    quantity: number,
  ): Promise<Result<InventoryEntity, InventoryError>>;

  getInventoryByProduct(
    productId: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>>;

  getOneInventory(
    id: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>>;

  getAllInventories(): Promise<Result<InventoryEntity[], null>>;
}
