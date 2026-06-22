import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from './get-products.query';
import { ProductEntity } from '../../../domain/entities/product.entity';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { Inject } from '@nestjs/common';
import { Result, ok } from '@core/interfaces/result';

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(): Promise<Result<ProductEntity[], null>> {
    const products = await this.repository.getAllProducts();

    return ok(products);
  }
}
