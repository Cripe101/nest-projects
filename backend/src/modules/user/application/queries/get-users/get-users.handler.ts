import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Result, ok } from '@core/libs/result';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(): Promise<Result<UserEntity[], null>> {
    const users = await this.repository.getAllUsers();

    return ok(users);
  }
}
