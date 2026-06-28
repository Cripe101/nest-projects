import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import bcrypt from 'bcrypt';
import { UserEntity } from '../../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';
import { UserError } from '@modules/user/domain/errors/user.error';
import { Result, err, ok } from '@core/libs/result';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(
    command: CreateUserCommand,
  ): Promise<Result<string, UserError>> {
    const { username, role, password, firstName, middleName, lastName, email } =
      command;

    const checkIfUserExists = await this.repository.getUserByUsername(username);

    if (checkIfUserExists.isOk()) return err(UserError.DUPLICATE_USERNAME);

    const hashedPassword = await this.hashPassword(password);

    const user = new UserEntity(
      null,
      firstName,
      middleName,
      lastName,
      email,
      username,
      role,
      hashedPassword,
    );

    const result = await this.repository.create(user);

    if (result.isErr()) return err(UserError.DUPLICATE_USERNAME);

    return ok(result.value._id as string);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
