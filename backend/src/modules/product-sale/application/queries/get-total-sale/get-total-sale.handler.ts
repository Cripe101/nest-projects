import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSaleQuery } from './get-total-sale.query';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject } from '@nestjs/common';

@QueryHandler(GetTotalSaleQuery)
export class GetTotalSaleHandler implements IQueryHandler<GetTotalSaleQuery> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,
  ) {}

  async execute(): Promise<{ totalSale: number }> {
    return await this.repository.getTotalSale();
  }
}
