import { QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { UserRepository } from '../../../domain/repositories/user.repository';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserByUsernameQuery) {
    const { username } = query;
    return this.repository.findByUsername(username);
  }
}
