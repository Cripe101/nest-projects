import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '@modules/user/application/ports/user.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { AuthError } from '@modules/auth/domain/errors/auth.error';
import { UserError } from '@modules/user/domain/errors/user.error';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,

    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: LoginUserCommand,
  ): Promise<Result<any, AuthError | UserError>> {
    const { username, password } = command;

    const result = await this.repository.getUserByUsername(username);

    if (result.isErr()) return err(result.error);

    if (!result.value) return err(UserError.NOT_FOUND);

    const user = result.value;

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch || result.isErr()) {
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
