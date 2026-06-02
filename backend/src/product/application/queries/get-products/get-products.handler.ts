import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { GetProductsQuery } from './get-products.query';
import { ProductEntity } from '../../../domain/entities/product.entity';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    return await this.repository.getAllProducts();
  }
}
