import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductSalesQuery } from './get-product-sales.query';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';

@QueryHandler(GetProductSalesQuery)
export class GetProductSalesHandler implements IQueryHandler<GetProductSalesQuery> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(): Promise<ProductSaleEntity[]> {
    return this.repository.getAllProductSales();
  }
}
