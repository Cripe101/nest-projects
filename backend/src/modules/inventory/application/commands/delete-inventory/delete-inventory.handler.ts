import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInventoryCommand } from './delete-inventory.command';
import { Inject } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, err, ok } from '@core/libs/result';
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
    const result = await this.repository.deleteOneInventory(command.id);

    if (result.isErr()) return err(result.error);

    return ok(result.value?._id as string);
  }
}
