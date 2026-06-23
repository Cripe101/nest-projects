import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoryQuery } from './get-inventory.query';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryQuery> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(
    query: GetInventoryQuery,
  ): Promise<Result<InventoryEntity, InventoryError>> {
    const inventory = await this.repository.getOneInventory(query.id);

    if (!inventory) {
      return err(InventoryError.NOT_FOUND);
    }

    return ok(inventory);
  }
}
