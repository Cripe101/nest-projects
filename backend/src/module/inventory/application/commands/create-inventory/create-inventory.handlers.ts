import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInventoryCommand } from './create-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { NotAcceptableException } from '@nestjs/common';

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(command: CreateInventoryCommand) {
    const { productId, createdBy, currentStock, minimumStock } = command;
    const checkProduct = await this.repository.getInventoryByProduct(productId);

    if (checkProduct) {
      throw new NotAcceptableException(
        'Product already added to the inventory',
      );
    }

    const inventory = new InventoryEntity(
      productId,
      createdBy,
      minimumStock,
      currentStock,
    );

    return this.repository.create(inventory);
  }
}
