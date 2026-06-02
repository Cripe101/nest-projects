import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserRepository } from '../../../domain/repositories/user.repository';
import bcrypt from 'bcrypt';
import { NotAcceptableException } from '@nestjs/common/exceptions/not-acceptable.exception';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly repository: UserRepository) {}

  async execute(command: CreateUserCommand) {
    const checkIfUserExists = await this.repository.findByUsername(
      command.username,
    );

    if (checkIfUserExists) {
      throw new NotAcceptableException('User already exists');
    }

    const hashedPassword = await this.hashPassword(command.password);

    return await this.repository.save({
      ...command,
      password: hashedPassword,
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
