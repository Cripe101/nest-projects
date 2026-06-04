import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoryQuery } from './get-inventory.query';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryQuery> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(query: GetInventoryQuery): Promise<InventoryEntity | null> {
    return await this.repository.getOneInventory(query.id);
  }
}
