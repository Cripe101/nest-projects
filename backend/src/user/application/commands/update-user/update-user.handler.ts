import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: UpdateUserCommand) {
    const { _id, username, role } = command;
    const existingUser = await this.repository.getUserByUsername(
      command.username,
    );

    if (existingUser && existingUser._id !== _id) {
      throw new ConflictException('Username already exists');
    }

    const user = await this.repository.updateOneUser(_id, {
      username: username,
      role: role,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
