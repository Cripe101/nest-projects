import { Result } from '@core/libs/result';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserError } from '@modules/user/domain/errors/user.error';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryPort {
  create(user: UserEntity): Promise<Result<UserEntity, UserError>>;

  updateOneUser(
    id: string,
    userData: UserEntity,
  ): Promise<Result<UserEntity | null, UserError>>;

  deleteOneUser(id: string): Promise<Result<UserEntity | null, UserError>>;

  getAllUsers(): Promise<Result<UserEntity[], null>>;

  getOneUser(id: string): Promise<Result<UserEntity | null, UserError>>;

  getUserByUsername(
    username: string,
  ): Promise<Result<UserEntity | null, UserError>>;
}
