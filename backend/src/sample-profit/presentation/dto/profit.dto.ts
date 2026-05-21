import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfitDto {
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
}

export class UpdateProfitDto {
  @IsNotEmpty()
  @IsDateString()
  date!: Date;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  amount!: number;
}
