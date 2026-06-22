import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { Result, err, ok } from '@core/interfaces/result';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { ProductError } from '@modules/product/domain/errors/product.error';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(
    query: GetProductQuery,
  ): Promise<Result<ProductEntity, ProductError>> {
    const product = await this.repository.getOneProduct(query._id);

    if (!product) {
      return err(ProductError.NOT_FOUND);
    }

    return ok(product);
  }
}
