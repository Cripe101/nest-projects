import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: DeleteUserCommand): Promise<UserEntity | null> {
    const user = await this.repository.deleteOneUser(command._id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
