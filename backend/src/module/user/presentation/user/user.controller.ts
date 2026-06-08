import {
  Body,
  Controller,
  Delete,
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
import { JwtAuthGuard } from '../../../../core/guard/jwt.auth.guard';
import { RolesGuard } from '../../../../core/guard/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { UserRole } from '../../../../core/constants/user-role.enum';
import { DeleteUserCommand } from '../../application/commands/delete-user/delete-user.command';

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
    return this.commandBus.execute(
      new CreateUserCommand(dto.username, dto.password, dto.role),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.commandBus.execute(
      new UpdateUserCommand(id, dto.username, dto.role),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteUserCommand(id));
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getUser(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserQuery(id));
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.queryBus.execute(new GetUserByUsernameQuery(username));
  }
}
