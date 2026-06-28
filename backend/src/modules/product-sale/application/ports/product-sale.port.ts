import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { Result } from '@core/libs/result';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

export const PRODUCT_SALE_REPOSITORY = Symbol('PRODUCT_SALE_REPOSITORY');

export interface ProductSaleRepositoryPort {
  create(
    productSale: ProductSaleEntity,
  ): Promise<Result<ProductSaleEntity, null>>;

  deleteOneProductSale(
    id: string,
  ): Promise<Result<ProductSaleEntity | null, ProductSaleError>>;

  getAllProductSales(): Promise<Result<ProductSaleEntity[], null>>;

  getOneProductSale(
    id: string,
  ): Promise<Result<ProductSaleEntity | null, ProductSaleError>>;

  getTotalSaleProfit(): Promise<Result<{ totalProfit: number }, null>>;

  getTotalSale(): Promise<Result<{ totalSale: number }, null>>;
}
