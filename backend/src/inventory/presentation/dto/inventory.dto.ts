import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InventoryDto {
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsNumber()
  currentStock!: number;

  @IsNotEmpty()
  @IsNumber()
  minimumStock!: number;
}
