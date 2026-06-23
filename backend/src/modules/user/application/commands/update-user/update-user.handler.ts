import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { ConflictException, Inject, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Result, err, ok } from '@core/libs/result';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
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
    const { _id, username, role } = command;

    const existingUser = await this.repository.getUserByUsername(
      command.username,
    );

    if (existingUser && existingUser._id !== _id) {
      return err(UserError.DUPLICATE_USERNAME);
    }

    const user = await this.repository.updateOneUser(_id, {
      _id: _id,
      username: username,
      role: role,
    });

    if (!user) {
      return err(UserError.NOT_FOUND);
    }

    return ok(user?._id as string);
  }
}
