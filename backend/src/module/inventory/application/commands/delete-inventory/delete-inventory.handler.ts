import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInventoryCommand } from './delete-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteInventoryCommand)
export class DeleteInventoryHandler implements ICommandHandler<DeleteInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(
    command: DeleteInventoryCommand,
  ): Promise<InventoryEntity | null> {
    const inventory = await this.repository.deleteOneInventory(command.id);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    return inventory;
  }
}
