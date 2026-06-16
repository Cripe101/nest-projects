import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthDto } from './dto/auth.dto';
import { LoginUserCommand } from '../application/commands/login-user/login-user.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async login(@Body() dto: AuthDto) {
    return this.commandBus.execute(
      new LoginUserCommand(dto.username, dto.password),
    );
  }
}
