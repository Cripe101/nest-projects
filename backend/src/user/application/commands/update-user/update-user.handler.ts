import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ConflictException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const existingUser = await this.repository.findByUsername(command.username);

    if (existingUser && existingUser._id !== command._id) {
      throw new ConflictException('Username already exists');
    }

    return await this.repository.updateUser(command._id, {
      username: command.username,
      role: command.role,
    });
  }
}
