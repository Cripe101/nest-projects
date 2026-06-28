import { ProductSale } from '@core/schemas/product-sale/product-sale.schema';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { ProductMapper } from '@modules/product/infrastructure/adapters/product.mapper';
import { Types } from 'mongoose';

interface ProductSaleObject extends ProductSale {
  _id: Types.ObjectId;
}

export class ProductSaleMapper {
  static toEntity(sale: ProductSaleObject): ProductSaleEntity;
  static toEntity(sales: ProductSaleObject[]): ProductSaleEntity[];

  static toEntity(
    saleOrSales: ProductSaleObject | ProductSaleObject[],
  ): ProductSaleEntity | ProductSaleEntity[] {
    if (Array.isArray(saleOrSales)) {
      return saleOrSales.map(this.mapSale);
    }

    return this.mapSale(saleOrSales);
  }

  private static mapSale(sale: ProductSaleObject): ProductSaleEntity {
    const product =
      sale.productId instanceof Types.ObjectId ||
      typeof sale.productId === 'string'
        ? sale.productId.toString()
        : ProductMapper.toEntity(sale.productId);

    return new ProductSaleEntity(
      sale._id.toString(),
      product,
      sale.quantity,
      sale.cashier.toString(),
      sale.sellingPrice,
      sale.buyingPrice,
      sale.totalPrice,
      sale.profit,
    );
  }
}
