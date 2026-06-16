import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSaleProfitQuery } from './get-total-sale-profit.query';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject } from '@nestjs/common';

@QueryHandler(GetTotalSaleProfitQuery)
export class GetTotalSaleProfitHandler implements IQueryHandler<GetTotalSaleProfitQuery> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,
  ) {}

  async execute(): Promise<{ totalProfit: number }> {
    return await this.repository.getTotalSaleProfit();
  }
}
