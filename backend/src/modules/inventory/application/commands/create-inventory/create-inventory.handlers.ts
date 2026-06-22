import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInventoryCommand } from './create-inventory.command';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { Result, ok, err } from '@core/interfaces/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(
    command: CreateInventoryCommand,
  ): Promise<Result<string, InventoryError>> {
    const { productId, createdBy, currentStock, minimumStock } = command;

    const checkProduct = await this.repository.getInventoryByProduct(productId);

    if (checkProduct) {
      return err(InventoryError.DUPLICATE_PRODUCT);
    }

    const inventory = new InventoryEntity(
      null,
      productId,
      createdBy,
      minimumStock,
      currentStock,
    );

    const result = await this.repository.create(inventory);

    return ok(result?._id as string);
  }
}
