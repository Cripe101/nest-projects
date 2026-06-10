export class ProductSaleEntity {
  constructor(
    public productId: string,
    public quantity: number,
    public cashier: string,
    public sellingPrice: number,
    public buyingPrice: number,
    public totalPrice: number,
    public profit: number,
  ) {
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
