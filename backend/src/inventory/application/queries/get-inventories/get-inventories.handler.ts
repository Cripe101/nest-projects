import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoriesQuery } from './get-inventories.query';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';

@QueryHandler(GetInventoriesQuery)
export class GetInventoriesHandler implements IQueryHandler<GetInventoriesQuery> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(): Promise<InventoryEntity[]> {
    return await this.repository.getAllInventory();
  }
}
