import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoriesQuery } from './get-inventories.query';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Inject } from '@nestjs/common';
import { Result, ok } from '@core/interfaces/result';
import { InventoryEntity } from '@modules/inventory/domain/entities/inventory.entity';

@QueryHandler(GetInventoriesQuery)
export class GetInventoriesHandler implements IQueryHandler<GetInventoriesQuery> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(): Promise<Result<InventoryEntity[], null>> {
    const inventories = await this.repository.getAllInventories();

    return ok(inventories);
  }
}
