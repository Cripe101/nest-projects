import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateUserCommand } from '../../application/commands/create-user/create-user.command';
import { GetUserQuery } from '../../application/queries/get-user/get-user.query';
import { GetUsersQuery } from '../../application/queries/get-users/get-users.query';
import { UpdateUserCommand } from '../../application/commands/update-user/update-user.command';
import { GetUserByUsernameQuery } from '../../application/queries/get-user-by-name/get-user-by-username.query';
import { JwtAuthGuard } from '../../../auth/infastracture/jwt/jwt.auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() dto: CreateUserDto) {
    return this.commandBus.execute(
      new CreateUserCommand(dto.username, dto.password, dto.role),
    );
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(
      new UpdateUserCommand(id, dto.username, dto.role),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.queryBus.execute(new GetUserByUsernameQuery(username));
  }
}
