import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductSaleQuery } from './get-product-sale.query';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { Result, err, ok } from '@core/libs/result';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

@QueryHandler(GetProductSaleQuery)
export class GetProductSaleHandler implements IQueryHandler<GetProductSaleQuery> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,
  ) {}

  async execute(
    query: GetProductSaleQuery,
  ): Promise<Result<ProductSaleEntity, ProductSaleError>> {
    const { _id } = query;

    const product = await this.repository.getOneProductSale(_id);

    if (!product) {
      return err(ProductSaleError.NOT_FOUND);
    }

    return ok(product);
  }
}
