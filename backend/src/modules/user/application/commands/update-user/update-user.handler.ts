import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Result, err, ok } from '@core/libs/result';
import { UserError } from '@modules/user/domain/errors/user.error';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(
    command: UpdateUserCommand,
  ): Promise<Result<string, UserError>> {
    const { _id, firstName, middleName, lastName, email, username, role } =
      command;

    const existingUser = await this.repository.getUserByUsername(
      command.username,
    );

    if (existingUser.isOk() && existingUser.value?._id !== _id) {
      return err(UserError.DUPLICATE_USERNAME);
    }

    const user = await this.repository.updateOneUser(_id, {
      _id: _id,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      email: email,
      username: username,
      role: role,
    });

    if (user.isErr()) {
      return err(user.error);
    }

    return ok(user.value?._id as string);
  }
}
