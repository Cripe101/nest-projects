import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(query: GetUserQuery) {
    const { id } = query;

    const user = await this.repository.getOneUser(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
}
