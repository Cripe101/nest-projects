import { UserRole } from '../../../../../core/constants/user-role.enum';

export class UpdateUserCommand {
  constructor(
    public readonly _id: string,
    public readonly username: string,
    public readonly role: UserRole,
  ) {}
}
