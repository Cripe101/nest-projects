import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInventoryCommand } from './delete-inventory.command';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, err, ok } from '@core/interfaces/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@CommandHandler(DeleteInventoryCommand)
export class DeleteInventoryHandler implements ICommandHandler<DeleteInventoryCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(
    command: DeleteInventoryCommand,
  ): Promise<Result<string, InventoryError>> {
    const inventory = await this.repository.deleteOneInventory(command.id);

    if (!inventory) {
      return err(InventoryError.NOT_FOUND);
    }

    return ok(inventory?._id as string);
  }
}
