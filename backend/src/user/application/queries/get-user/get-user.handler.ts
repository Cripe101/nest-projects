import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from './get-user.query';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserQuery) {
    const user = await this.repository.findById(query.id);

    if (!user) {
      throw new NotFoundException(`User with id ${query.id} not found`);
    }

    return user;
  }
}
