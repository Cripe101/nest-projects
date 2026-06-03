import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductSaleQuery } from './get-product-sale.query';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';

@QueryHandler(GetProductSaleQuery)
export class GetProductSaleHandler implements IQueryHandler<GetProductSaleQuery> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(query: GetProductSaleQuery): Promise<ProductSaleEntity> {
    const { _id } = query;

    return await this.repository.getOneProductSale(_id);
  }
}
