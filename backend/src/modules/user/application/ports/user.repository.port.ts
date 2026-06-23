import { Result } from '@core/libs/result';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserError } from '@modules/user/domain/errors/user.error';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryPort {
  create(user: UserEntity): Promise<UserEntity>;

  updateOneUser(id: string, userData: UserEntity): Promise<UserEntity | null>;

  deleteOneUser(id: string): Promise<UserEntity | null>;

  getAllUsers(): Promise<UserEntity[]>;

  getOneUser(id: string): Promise<UserEntity | null>;

  getUserByUsername(username: string): Promise<UserEntity | null>;
}
