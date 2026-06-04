import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductSaleCommand)
export class DeleteProductSaleHandler implements ICommandHandler<DeleteProductSaleCommand> {
  constructor(private readonly respository: ProductSaleRepository) {}

  async execute(
    command: DeleteProductSaleCommand,
  ): Promise<ProductSaleEntity | null> {
    const { _id } = command;
    const product = await this.respository.deleteOneProductSale(_id);

    if (!product) {
      throw new NotFoundException('Sale not found');
    }

    return product;
  }
}
