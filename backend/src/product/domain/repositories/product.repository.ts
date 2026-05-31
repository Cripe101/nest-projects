import { ProductEntity } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract createProduct(product: ProductEntity): Promise<ProductEntity>;
  abstract getAllProducts(): Promise<ProductEntity[]>;
  abstract getOneProduct(id: string): Promise<ProductEntity>;
  abstract updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity>;
  abstract deleteOneProduct(id: string): Promise<ProductEntity>;
}
