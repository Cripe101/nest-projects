import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(query: GetUserByUsernameQuery) {
    const { username } = query;
    const user = await this.repository.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
