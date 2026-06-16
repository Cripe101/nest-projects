import { UserRole } from '@core/constants/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly role: UserRole,
    // public readonly isActive: boolean,
  ) {}
}
