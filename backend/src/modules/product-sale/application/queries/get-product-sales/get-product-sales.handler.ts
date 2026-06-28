import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductSalesQuery } from './get-product-sales.query';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject } from '@nestjs/common';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { Result, ok, err } from '@core/libs/result';

@QueryHandler(GetProductSalesQuery)
export class GetProductSalesHandler implements IQueryHandler<GetProductSalesQuery> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,
  ) {}

  async execute(): Promise<Result<ProductSaleEntity[], null>> {
    const result = await this.repository.getAllProductSales();

    if (result.isErr()) return err(null);

    return ok(result.value);
  }
}
