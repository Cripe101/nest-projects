import { UserRepository } from '../../../domain/repositories/user.repository';
import bycrypt from 'bcrypt';
import { QueryHandler } from '@nestjs/cqrs';
import { LoginUserQuery } from './login-user.query';

@QueryHandler(LoginUserQuery)
export class LoginUserHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: LoginUserQuery) {
    const { username, password } = command;

    const user = await this.repository.findByUsername(username);

    const isValid = await this.validatePassword(
      password,
      user?.password as string,
    );

    const userData = {
      _id: user?._id,
      username: user?.username,
      role: user?.role,
    };

    return isValid ? userData : null;
  }

  private async validatePassword(
    userPassword: string,
    hashInputPassword: string,
  ): Promise<boolean> {
    const IsValid = await bycrypt.compare(userPassword, hashInputPassword);
    return IsValid;
  }
}
