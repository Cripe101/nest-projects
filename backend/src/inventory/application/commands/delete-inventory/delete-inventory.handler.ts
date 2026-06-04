import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInventoryCommand } from './delete-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';

@CommandHandler(DeleteInventoryCommand)
export class DeleteInventoryHandler implements ICommandHandler<DeleteInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(
    command: DeleteInventoryCommand,
  ): Promise<InventoryEntity | null> {
    return await this.repository.deleteInventory(command.id);
  }
}
