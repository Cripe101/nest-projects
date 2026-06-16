import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import bcrypt from 'bcrypt';
import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';
import { UserEntity } from '../../../domain/entities/user.entity';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(command: CreateUserCommand) {
    const { username, role, password } = command;

    const checkIfUserExists = await this.repository.getUserByUsername(username);

    if (checkIfUserExists) {
      throw new NotAcceptableException('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = new UserEntity(null, username, role, hashedPassword);

    return await this.repository.create({
      _id: user._id,
      username: user.username,
      role: user.role,
      password: user.password,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
