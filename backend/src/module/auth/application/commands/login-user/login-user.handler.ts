import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { JwtService } from '@nestjs/jwt';
import bycrypt from 'bcrypt';
import { NotAcceptableException } from '@nestjs/common';
import { UserRepository } from '../../../../user/domain/repositories/user.repository';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const { username, password } = command;
    const user = await this.repository.getUserByUsername(username);

    const isMatch = await bycrypt.compare(password, user?.password as string);

    if (!isMatch) {
      throw new NotAcceptableException('Invalid credentials');
    }

    const payload = {
      sub: user?._id,
      username: user?.username,
      role: user?.role,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: payload,
    };
  }
}
