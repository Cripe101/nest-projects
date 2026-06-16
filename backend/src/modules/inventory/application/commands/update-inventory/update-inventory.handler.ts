import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInventoryCommand } from './update-inventory.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(command: UpdateInventoryCommand): Promise<any> {
    const { _id, productId, minimumStock, createdBy, currentStock } = command;

    const inventoryData = new InventoryEntity(
      _id,
      productId,
      createdBy,
      minimumStock,
      currentStock,
    );

    const inventory = await this.repository.updateOneInventory(
      _id,
      inventoryData,
    );

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
