import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import {
  USER_REPOSITORY,
  type UserRepositoryPort,
} from '../../ports/user.repository.port';
import { Inject } from '@nestjs/common';
import { Result, err, ok } from '@core/libs/result';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserError } from '@modules/user/domain/errors/user.error';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: UserRepositoryPort,
  ) {}

  async execute(
    query: GetUserQuery,
  ): Promise<Result<UserEntity | null, UserError>> {
    const { id } = query;

    const result = await this.repository.getOneUser(id);

    if (result.isErr()) return err(result.error);

    return ok(result.value);
  }
}
