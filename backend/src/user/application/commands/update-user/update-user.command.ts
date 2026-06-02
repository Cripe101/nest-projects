import { UserRole } from '../../../../constants/user-role';

export class UpdateUserCommand {
  constructor(
    public readonly _id: string,
    public readonly username: string,
    public readonly role: UserRole,
  ) {}
}
