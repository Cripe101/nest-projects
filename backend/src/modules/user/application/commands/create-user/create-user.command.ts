import { UserRole } from '@core/constants/user-role.enum';

export class CreateUserCommand {
  constructor(
    public readonly firstName: string,
    public readonly middleName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: UserRole,
  ) {}
}
