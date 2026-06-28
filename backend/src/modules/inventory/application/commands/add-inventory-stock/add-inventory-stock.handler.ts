import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddInventoryStockCommand } from './add-inventory-stock.command';
import { Inject } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@CommandHandler(AddInventoryStockCommand)
export class AddInventoryStockHandler implements ICommandHandler<AddInventoryStockCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(
    command: AddInventoryStockCommand,
  ): Promise<Result<string, InventoryError>> {
    const { inventoryId, quantity } = command;

    const result = await this.repository.addStock(inventoryId, quantity);

    if (result.isErr()) return err(result.error);

    return ok(result.value?._id as string);
  }
}
