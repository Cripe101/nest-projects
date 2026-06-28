import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from './get-product.query';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { Result, err, ok } from '@core/libs/result';
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
  ): Promise<Result<ProductEntity | null, ProductError>> {
    const result = await this.repository.getOneProduct(query._id);

    if (result.isErr()) return err(result.error);

    return ok(result.value);
  }
}
