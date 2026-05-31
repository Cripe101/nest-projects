import { NotAcceptableException } from '@nestjs/common';

export class ProductEntity {
  constructor(
    public productName: string,
    public productCategory: string,
    public buyingPrice: number,
    public sellingPrice: number,
    public stock: number,
    public description?: string,
    public imageUrl?: string,
  ) {
    if (stock < 0) {
      throw new NotAcceptableException('Stock cannot be negative');
    }

    if (buyingPrice < 0) {
      throw new NotAcceptableException('Buying Price cannot be negative');
    }

    if (sellingPrice < 0) {
      throw new NotAcceptableException('Selling price cannot be negative');
    }
  }
}
