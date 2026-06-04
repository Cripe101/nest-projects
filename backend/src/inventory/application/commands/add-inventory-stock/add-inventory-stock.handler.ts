import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInventoryStockCommand } from './add-inventory-stock.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(AddInventoryStockCommand)
export class AddInventoryStockHandler implements ICommandHandler<AddInventoryStockCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(command: AddInventoryStockCommand): Promise<InventoryEntity> {
    const { inventoryId, quantity } = command;

    const inventory = await this.repository.addStock(inventoryId, quantity);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
