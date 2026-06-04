import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInventoryCommand } from './create-inventory.command';
import { InventoryRepositpory } from '../../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { ProductRepository } from '../../../../product/domain/repositories/product.repository';
import { NotAcceptableException } from '@nestjs/common';

@CommandHandler(CreateInventoryCommand)
export class CreateInventoryHandler implements ICommandHandler<CreateInventoryCommand> {
  constructor(private readonly repository: InventoryRepositpory) {}

  async execute(command: CreateInventoryCommand) {
    const checkProduct = await this.repository.getInventoryByProduct(
      command.productId,
    );

    if (checkProduct) {
      throw new NotAcceptableException(
        'Product already added to the inventory',
      );
    }

    const inventory: InventoryEntity = {
      productId: command.productId,
      currentStock: command.currentStock,
      minimumStock: command.minimumStock,
    };
    return this.repository.createInventory(inventory);
  }
}
