import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create(user: UserEntity): Promise<UserEntity>;
  abstract updateOneUser(
    id: string,
    userData: UserEntity,
  ): Promise<UserEntity | null>;
  abstract deleteOneUser(id: string): Promise<UserEntity | null>;

  abstract getAllUsers(): Promise<UserEntity[]>;
  abstract getOneUser(id: string): Promise<UserEntity | null>;
  abstract getUserByUsername(username: string): Promise<UserEntity | null>;
}
