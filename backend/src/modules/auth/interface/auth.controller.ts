import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthDto } from './dto/auth.dto';
import { LoginUserCommand } from '../application/commands/login-user/login-user.command';
import { ok } from '@core/libs/result';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() dto: AuthDto) {
    const result = await this.commandBus.execute(
      new LoginUserCommand(dto.username, dto.password),
    );

    if (result.isErr()) {
      throw new NotAcceptableException(result.error);
    }

    return ok(result.value);
  }
}
