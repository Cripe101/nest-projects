import { ProductEntity } from '@modules/product/domain/entities/product.entity';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductRepositoryPort {
  create(product: ProductEntity): Promise<ProductEntity>;

  updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity | null>;

  deleteOneProduct(id: string): Promise<ProductEntity | null>;

  getAllProducts(): Promise<ProductEntity[]>;

  getOneProduct(id: string): Promise<ProductEntity | null>;
}
