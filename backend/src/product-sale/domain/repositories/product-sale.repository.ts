import { ProductSaleEntity } from '../../../product-sale/domain/entities/product-sale.entity';

export abstract class ProductSaleRepository {
  abstract create(productSale: {
    productId: string;
    quantity: number;
  }): Promise<ProductSaleEntity>;
  abstract getAllProductSales(): Promise<ProductSaleEntity[]>;
  abstract getOneProductSale(id: string): Promise<ProductSaleEntity | null>;
  abstract deleteOneProductSale(id: string): Promise<ProductSaleEntity | null>;
  abstract getTotalSaleProfit(): Promise<{ totalProfit: number }>;
}
