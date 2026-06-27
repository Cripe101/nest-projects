import { BaseEntity } from '@core/entities/base.entity';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

export class InventoryEntity extends BaseEntity {
  constructor(
    public _id: string | null,
    public productId: string | ProductEntity,
    public createdBy: string,
    public minimumStock: number,
    public currentStock: number,
  ) {
    super(_id);

    if (currentStock < 0) {
      throw new Error('Stock connot be negative');
    }

    if (minimumStock < 0) {
      throw new Error('Minimum stock connot be negative');
    }
  }
}
