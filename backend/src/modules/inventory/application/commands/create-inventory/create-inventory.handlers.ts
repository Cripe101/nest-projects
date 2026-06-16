import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInventoryCommand } from './create-inventory.command';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { Inject, NotAcceptableException } from '@nestjs/common';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(
    @Inject(INVENTORY_REPOSITORY)
    private readonly repository: InventoryRepositoryPort,
  ) {}

  async execute(command: CreateInventoryCommand) {
    const { productId, createdBy, currentStock, minimumStock } = command;

    const checkProduct = await this.repository.getInventoryByProduct(productId);

    if (checkProduct) {
      throw new NotAcceptableException(
        'Product already added to the inventory',
      );
    }

    const inventory = new InventoryEntity(
      null,
      productId,
      createdBy,
      minimumStock,
      currentStock,
    );

    return this.repository.create(inventory);
  }
}
