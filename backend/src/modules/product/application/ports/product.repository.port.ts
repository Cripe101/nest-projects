import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Result } from '@core/libs/result';
import { ProductError } from '@modules/product/domain/errors/product.error';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductRepositoryPort {
  create(product: ProductEntity): Promise<Result<ProductEntity, null>>;

  updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<Result<ProductEntity | null, ProductError>>;

  deleteOneProduct(
    id: string,
  ): Promise<Result<ProductEntity | null, ProductError>>;

  getAllProducts(): Promise<Result<ProductEntity[], null>>;

  getOneProduct(
    id: string,
  ): Promise<Result<ProductEntity | null, ProductError>>;
}
