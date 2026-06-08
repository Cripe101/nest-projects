import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSaleProfitQuery } from './get-total-sale-profit.query';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';

@QueryHandler(GetTotalSaleProfitQuery)
export class GetTotalSaleProfitHandler implements IQueryHandler<GetTotalSaleProfitQuery> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(): Promise<{ totalProfit: number }> {
    return await this.repository.getTotalSaleProfit();
  }
}
