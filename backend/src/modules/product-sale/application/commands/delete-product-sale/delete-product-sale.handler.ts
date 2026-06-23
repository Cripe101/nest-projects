import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject, NotFoundException } from '@nestjs/common';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { Result, ok, err } from '@core/libs/result';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

@CommandHandler(DeleteProductSaleCommand)
export class DeleteProductSaleHandler implements ICommandHandler<DeleteProductSaleCommand> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly respository: ProductSaleRepositoryPort,
  ) {}

  async execute(
    command: DeleteProductSaleCommand,
  ): Promise<Result<string, ProductSaleError>> {
    const { _id } = command;
    const sale = await this.respository.deleteOneProductSale(_id);

    if (!sale) {
      return err(ProductSaleError.NOT_FOUND);
    }

    return ok(sale._id as string);
  }
}
