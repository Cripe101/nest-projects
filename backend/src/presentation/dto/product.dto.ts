import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsNotEmpty()
  @IsEnum(['beverages', 'snacks', 'instant foods', 'cigarettes'])
  @IsString()
  productCategory!: string;

  @IsNotEmpty()
  @IsNumber()
  buyingPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  sellingPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @IsString()
  description?: string;

  @IsString()
  imageUrl?: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsEnum(['beverages', 'snacks', 'instant foods', 'cigarettes'])
  @IsString()
  productCategory!: string;

  @IsNotEmpty()
  @IsNumber()
  buyingPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  sellingPrice!: number;

  @IsNotEmpty()
  @IsNumber()
  stock!: number;

  @IsString()
  description?: string;

  @IsString()
  imageUrl?: string;
}
