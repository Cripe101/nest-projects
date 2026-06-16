import { BaseEntity } from '@core/entities/base.entity';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

export class ProductSaleEntity extends BaseEntity {
  constructor(
    public _id: string | null,
    public productId: string | ProductEntity,
    public quantity: number,
    public cashier: string,
    public sellingPrice: number,
    public buyingPrice: number,
    public totalPrice: number,
    public profit: number,
  ) {
    super(_id);
    if (quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (totalPrice < 0) {
      throw new Error('Total Price cannot be negative');
    }
    if (profit < 0) {
      throw new Error('Profit cannot be negative');
    }
  }
}
