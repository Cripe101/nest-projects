import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';

export const PRODUCT_SALE_REPOSITORY = Symbol('PRODUCT_SALE_REPOSITORY');

export interface ProductSaleRepositoryPort {
  create(productSale: ProductSaleEntity): Promise<ProductSaleEntity>;

  deleteOneProductSale(id: string): Promise<ProductSaleEntity | null>;

  getAllProductSales(): Promise<ProductSaleEntity[]>;

  getOneProductSale(id: string): Promise<ProductSaleEntity | null>;

  getTotalSaleProfit(): Promise<{ totalProfit: number }>;

  getTotalSale(): Promise<{ totalSale: number }>;
}
