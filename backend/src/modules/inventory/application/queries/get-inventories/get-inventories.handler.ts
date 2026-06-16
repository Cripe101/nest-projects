import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoriesQuery } from './get-inventories.query';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Inject } from '@nestjs/common';
import { InventoryResponseDto } from '@modules/inventory/interface/dto/inventory-response.dto';

@QueryHandler(GetInventoriesQuery)
export class GetInventoriesHandler implements IQueryHandler<GetInventoriesQuery> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(): Promise<InventoryResponseDto[]> {
    const inventories = await this.repository.getAllInventories();

    return inventories.map((inventory) => ({
      _id: inventory._id,
      productId: inventory.productId,
      currentStock: inventory.currentStock,
      minimumStock: inventory.minimumStock,
    }));
  }
}
