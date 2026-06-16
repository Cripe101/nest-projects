import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInventoryStockCommand } from './add-inventory-stock.command';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

@CommandHandler(AddInventoryStockCommand)
export class AddInventoryStockHandler implements ICommandHandler<AddInventoryStockCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(command: AddInventoryStockCommand): Promise<InventoryEntity> {
    const { inventoryId, quantity } = command;

    const inventory = await this.repository.addStock(inventoryId, quantity);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
