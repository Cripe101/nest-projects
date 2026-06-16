import { BaseEntity } from '@core/entities/base.entity';

export class ProductEntity extends BaseEntity {
  constructor(
    public _id: string | null,
    public productName: string,
    public productCategory: string,
    public addedBy: string,
    public buyingPrice: number,
    public sellingPrice: number,
    public description?: string,
    public imageUrl?: string,
  ) {
    super(_id);

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
