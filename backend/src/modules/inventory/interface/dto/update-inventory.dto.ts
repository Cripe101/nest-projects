import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateInventoryDto {
  @IsString()
  productId!: string;

  @IsNumber()
  minimumStock!: number;

  @IsNotEmpty()
  @IsNumber()
  currentStock!: number;
}
