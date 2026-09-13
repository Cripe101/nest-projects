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
  ): Promise<Result<InventoryEntity | null, InventoryError>> {
    const { _id } = query;

    const result = await this.repository.getOneInventory(_id);

    if (result.isErr()) return err(result.error);

    return ok(result.value);
  }
}
