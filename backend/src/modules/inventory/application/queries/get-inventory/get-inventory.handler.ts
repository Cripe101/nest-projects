import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetInventoryQuery } from './get-inventory.query';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryQuery> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(query: GetInventoryQuery): Promise<InventoryEntity | null> {
    const inventory = await this.repository.getOneInventory(query.id);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
