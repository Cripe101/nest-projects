import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { CreateUserHandler } from './application/commands/create-user/create-user.handler';
import { UpdateUserHandler } from './application/commands/update-user/update-user.handler';
import { DeleteUserHandler } from './application/commands/delete-user/delete-user.handler';
import { GetUserHandler } from './application/queries/get-user/get-user.handler';
import { GetUsersHandler } from './application/queries/get-users/get-users.handler';
import { GetUserByUsernameHandler } from './application/queries/get-user-by-name/get-user-by-username.handler';
import { UserEntity } from './domain/entities/user.entity';
import { UserSchema } from '../../core/schemas/user/user.schema';
import { UserController } from './presentation/user/user.controller';
import { UserRepository } from './domain/repositories/user.repository';
import { MongoUserRepository } from './infastracture/persistance/mongo-user.repository';

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
  exports: [UserRepository],
})
export class UserModule {}
