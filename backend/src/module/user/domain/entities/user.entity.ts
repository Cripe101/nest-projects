import { UserRole } from '../../../../core/constants/user-role.enum';

export class UserEntity {
  constructor(
    public readonly username: string,
    public readonly role: UserRole,
    public readonly password?: string,
    public readonly _id?: string,
  ) {}
}
