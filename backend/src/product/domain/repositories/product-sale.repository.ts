import { ProductSaleEntity } from '../entities/product-sale.entity';

export abstract class ProductSaleRepository {
  abstract createProductSale(
    productSale: ProductSaleEntity,
  ): Promise<ProductSaleEntity>;
  abstract getAllProductSales(): Promise<ProductSaleEntity[]>;
  abstract getOneProductSale(id: string): Promise<ProductSaleEntity>;
  abstract deleteOneProductSale(id: string): Promise<ProductSaleEntity>;
  abstract getTotalSaleProfit(): Promise<{ totalProfit: number }>;
}
