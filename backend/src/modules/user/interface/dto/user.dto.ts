import { IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '@core/constants/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsString()
  role!: UserRole;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  role!: UserRole;
}
