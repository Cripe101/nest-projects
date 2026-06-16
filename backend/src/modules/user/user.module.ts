import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from './application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from './application/commands/delete-user/delete-user.handler';
import { GetUserHandler } from './application/queries/get-user/get-user.handler';
import { GetUsersHandler } from './application/queries/get-users/get-users.handler';
import { GetUserByUsernameHandler } from './application/queries/get-user-by-name/get-user-by-username.handler';
import { User, UserSchema } from '@core/schemas/user/user.schema';
import { UserController } from './interface/user.controller';
import { USER_REPOSITORY } from './application/ports/user.repository.port';
import { UserRepository } from './infrastructure/adapters/user.repository';

const commandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
const queryHandlers = [
  GetUserHandler,
  GetUsersHandler,
  GetUserByUsernameHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
