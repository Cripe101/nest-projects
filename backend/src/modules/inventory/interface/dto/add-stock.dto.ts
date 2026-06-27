import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddStockDto {
  // @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
