import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInventoryCommand } from './update-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { NotFoundException } from '@nestjs/common';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(command: UpdateInventoryCommand): Promise<any> {
    const { _id, productId, minimumStock } = command;

    const inventoryData = new InventoryEntity(productId, minimumStock);

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
