import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoryQuery } from './get-inventory.query';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryQuery> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(query: GetInventoryQuery): Promise<InventoryEntity | null> {
    const inventory = await this.repository.getOneInventory(query.id);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
