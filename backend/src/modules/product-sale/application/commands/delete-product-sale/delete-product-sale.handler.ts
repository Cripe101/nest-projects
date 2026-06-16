import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';

@CommandHandler(DeleteProductSaleCommand)
export class DeleteProductSaleHandler implements ICommandHandler<DeleteProductSaleCommand> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly respository: ProductSaleRepositoryPort,
  ) {}

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
