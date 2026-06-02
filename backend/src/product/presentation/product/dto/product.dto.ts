import {
  IsEnum,
  IsNegative,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  imageUrl!: string;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  productName!: string;

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

  @IsNotEmpty()
  @IsString()
  imageUrl?: string;
}
