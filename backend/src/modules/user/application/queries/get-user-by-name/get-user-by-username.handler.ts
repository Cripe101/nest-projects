import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Result, err, ok } from '@core/libs/result';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserError } from '@modules/user/domain/errors/user.error';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(
    query: GetUserByUsernameQuery,
  ): Promise<Result<UserEntity | null, UserError>> {
    const { username } = query;
    const user = await this.repository.getUserByUsername(username);

    if (user.isErr()) {
      return err(UserError.NOT_FOUND);
    }

    return ok(user?.value);
  }
}
