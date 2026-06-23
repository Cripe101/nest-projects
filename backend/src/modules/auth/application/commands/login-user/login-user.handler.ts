import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';
import bycrypt from 'bcrypt';
import { Inject, NotAcceptableException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '@modules/user/application/ports/user.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { AuthError } from '@modules/auth/domain/errors/auth.error';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<Result<any, AuthError>> {
    const { username, password } = command;

    const user = await this.repository.getUserByUsername(username);

    const isMatch = await bycrypt.compare(password, user?.password as string);

    if (!isMatch || !user) {
      return err(AuthError.INVALID);
    }

    const payload = {
      sub: user?._id,
      username: user?.username,
      role: user?.role,
    };

    return ok({
      accessToken: this.jwtService.sign(payload),
      user: payload,
    });
  }
}
