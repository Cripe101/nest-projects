import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UserEntity } from '../../../domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Result, err, ok } from '@core/interfaces/result';
import { UserError } from '@modules/user/domain/errors/user.error';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(
    command: DeleteUserCommand,
  ): Promise<Result<UserEntity, UserError>> {
    const user = await this.repository.deleteOneUser(command._id);

    if (!user) {
      return err(UserError.NOT_FOUND);
    }

    return ok(user);
  }
}
