import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductSaleDto {
  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;

  // @IsNotEmpty()
  // @IsNumber()
  // sellingPrice!: number;

  // @IsNotEmpty()
  // @IsNumber()
  // buyingPrice!: number;

  // @IsNotEmpty()
  // @IsNumber()
  // totalPrice!: number;

  // @IsNotEmpty()
  // @IsNumber()
  // profit!: number;
}

export class UpdateProductSaleDto {
  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}
