import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInventoryCommand } from './update-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { NotFoundException } from '@nestjs/common';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(command: UpdateInventoryCommand): Promise<any> {
    const checkInventory = await this.repository.getOneInventory(command._id);

    if (!checkInventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    const data: InventoryEntity = {
      productId: command.productId,
      currentStock: command.currentStock,
      minimumStock: command.minimumStock,
    };

    return await this.repository.updateInventory(command._id, data);
  }
}
