import { NotAcceptableException } from '@nestjs/common';
import { UserRole } from '../../../constants/user-role';

export class UserEntity {
  constructor(
    public readonly username: string,
    public readonly role: UserRole,
    public readonly _id?: string,
    public readonly password?: string,
  ) {}
}
