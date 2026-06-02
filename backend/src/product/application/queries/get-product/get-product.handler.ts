import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductRepository } from '../../../domain/repositories/product.repository';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetProductQuery) {
    return await this.repository.getOneProduct(query._id);
  }
}
