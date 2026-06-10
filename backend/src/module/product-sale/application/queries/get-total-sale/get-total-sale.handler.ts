import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTotalSaleQuery } from './get-total-sale.query';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';

@QueryHandler(GetTotalSaleQuery)
export class GetTotalSaleHandler implements IQueryHandler<GetTotalSaleQuery> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(): Promise<{ totalSale: number }> {
    return await this.repository.getTotalSale();
  }
}
