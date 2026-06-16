import { ProductEntity } from '@modules/product/domain/entities/product.entity';

export class InventoryResponseDto {
  _id!: string | null;

  productId!: string | ProductEntity;

  currentStock!: number;

  minimumStock!: number;
}
