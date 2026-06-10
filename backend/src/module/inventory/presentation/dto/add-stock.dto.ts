import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddStockDto {
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
