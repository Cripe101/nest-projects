import { NotAcceptableException } from '@nestjs/common';

export class ProductSaleEntity {
  constructor(
    public productId: string,
    public quantity: number,
    public sellingPrice: number,
    public buyingPrice: number,
    public totalPrice: number,
    public profit: number,
  ) {
    if (quantity < 0) {
      throw new NotAcceptableException('Quantity cannot be negative');
    }
    if (totalPrice < 0) {
      throw new NotAcceptableException('Total Price cannot be negative');
    }
    if (profit < 0) {
      throw new NotAcceptableException('Profit cannot be negative');
    }
  }
}
