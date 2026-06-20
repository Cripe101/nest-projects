import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CreateUserCommand } from '../application/commands/create-user/create-user.command';
import { GetUserQuery } from '../application/queries/get-user/get-user.query';
import { GetUsersQuery } from '../application/queries/get-users/get-users.query';
import { UpdateUserCommand } from '../application/commands/update-user/update-user.command';
import { GetUserByUsernameQuery } from '../application/queries/get-user-by-name/get-user-by-username.query';
import { JwtAuthGuard } from '@core/guard/jwt.auth.guard';
import { RolesGuard } from '@core/guard/roles.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserRole } from '@core/constants/user-role.enum';
import { DeleteUserCommand } from '../application/commands/delete-user/delete-user.command';
import { ok } from '@core/interfaces/result';
import { UserError } from '@modules/user/domain/errors/user.error';

@Controller('users')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async createUser(@Body() dto: CreateUserDto) {
    const result = await this.commandBus.execute(
      new CreateUserCommand(dto.username, dto.password, dto.role),
    );

    if (result.isErr()) {
      throw new ConflictException(result.error);
    }

    return ok(result.value);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const result = await this.commandBus.execute(
      new UpdateUserCommand(id, dto.username, dto.role),
    );

    if (result.isErr()) {
      if (result.error === UserError.DUPLICATE_USERNAME) {
        throw new ConflictException(result.error);
      }

      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    const result = await this.commandBus.execute(new DeleteUserCommand(id));

    if (result.isErr()) {
      if (result.error === UserError.NOT_FOUND) {
        throw new NotFoundException(result.err);
      }
      throw new ConflictException(result.err);
    }

    return ok(result.value._id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUser(@Param('id') id: string) {
    const result = await this.queryBus.execute(new GetUserQuery(id));

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Get('username/:username')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUserByUsername(@Param('username') username: string) {
    const result = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }
}
