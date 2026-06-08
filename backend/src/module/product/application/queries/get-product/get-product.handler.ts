import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(query: GetProductQuery) {
    const product = await this.repository.getOneProduct(query._id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
  }
}
