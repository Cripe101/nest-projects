import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserQuery) {
    const { id } = query;

    const user = await this.repository.getOneUser(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
}
