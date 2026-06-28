import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject } from '@nestjs/common';
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
    const result = await this.respository.deleteOneProductSale(_id);

    if (result.isErr()) return err(ProductSaleError.NOT_FOUND);

    return ok(result.value?._id as string);
  }
}
