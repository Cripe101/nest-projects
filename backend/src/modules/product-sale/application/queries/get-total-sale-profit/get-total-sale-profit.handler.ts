import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSaleProfitQuery } from './get-total-sale-profit.query';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import { Inject } from '@nestjs/common';
import { Result, ok, err } from '@core/libs/result';

@QueryHandler(GetTotalSaleProfitQuery)
export class GetTotalSaleProfitHandler implements IQueryHandler<GetTotalSaleProfitQuery> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,
  ) {}

  async execute(): Promise<Result<{ totalProfit: number }, null>> {
    const result = await this.repository.getTotalSaleProfit();

    if (result.isErr()) return err(null);

    return ok(result.value);
  }
}
