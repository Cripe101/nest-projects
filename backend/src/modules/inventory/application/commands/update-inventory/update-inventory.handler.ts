import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateInventoryCommand } from './update-inventory.command';
import { Inject } from '@nestjs/common';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(
    command: UpdateInventoryCommand,
  ): Promise<Result<string, InventoryError>> {
    const { _id, productId, minimumStock, createdBy, currentStock } = command;

    const inventoryData = new InventoryEntity(
      _id,
      productId,
      createdBy,
      minimumStock,
      currentStock,
    );

    const result = await this.repository.updateOneInventory(_id, inventoryData);

    if (result.isErr()) return err(result.error);

    return ok(result.value?._id as string);
  }
}
