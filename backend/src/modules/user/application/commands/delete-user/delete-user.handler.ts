import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UserEntity } from '../../../domain/entities/user.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(command: DeleteUserCommand): Promise<UserEntity | null> {
    const user = await this.repository.deleteOneUser(command._id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
