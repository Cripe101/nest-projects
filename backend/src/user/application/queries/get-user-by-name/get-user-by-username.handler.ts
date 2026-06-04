import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserByUsernameQuery) {
    const { username } = query;
    const user = await this.repository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
