import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from '../presentation/user/user.controller';
import { UserRepository } from '../domain/repositories/user.repository';
import { MongoUserRepository } from './persistance/mongo-user.repository';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserSchema } from '../../schemas/user/user.schema';
import { CreateUserHandler } from '../application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from '../application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from '../application/commands/delete-user/delete-user.handler';
import { GetUserHandler } from '../application/queries/get-user/get-user.handler';
import { GetUsersHandler } from '../application/queries/get-users/get-users.handler';
import { UserEntity } from '../domain/entities/user.entity';
import { LoginUserHandler } from '../application/queries/login-user/login-user.handler';
import { GetUserByUsernameHandler } from '../application/queries/get-user-by-name/get-user-by-username.handler';

const commandHandlers = [
  CreateUserHandler,
  UpdateUserHandler,
  DeleteUserHandler,
];
const queryHandlers = [
  GetUserHandler,
  GetUsersHandler,
  GetUserByUsernameHandler,
  LoginUserHandler,
];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserEntity.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    { provide: UserRepository, useClass: MongoUserRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class UserModule {}
