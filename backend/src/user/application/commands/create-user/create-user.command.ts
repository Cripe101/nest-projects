import { UserRole } from '../../../../constants/user-role';

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: UserRole,
    // public readonly isActive: boolean,
  ) {}
}
