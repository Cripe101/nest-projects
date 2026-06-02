import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../../../../constants/user-role';

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

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;
}
