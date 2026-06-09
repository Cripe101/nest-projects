export class ProductEntity {
  constructor(
    public productName: string,
    public productCategory: string,
    public addedBy: string,
    public buyingPrice: number,
    public sellingPrice: number,
    public description?: string,
    public imageUrl?: string,
  ) {
    if (buyingPrice > sellingPrice) {
      throw new Error('Buying price should be lower than the selling price');
    }

    if (buyingPrice < 0) {
      throw new Error('Buying Price cannot be negative');
    }

    if (sellingPrice < 0) {
      throw new Error('Selling price cannot be negative');
    }
  }
}
