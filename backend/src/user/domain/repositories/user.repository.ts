import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract save(user: UserEntity): Promise<UserEntity>;
  abstract updateUser(
    id: string,
    userData: UserEntity,
  ): Promise<UserEntity | null>;
  abstract deleteUser(id: string): Promise<UserEntity | null>;

  abstract findAllUsers(): Promise<UserEntity[]>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract findByUsername(username: string): Promise<UserEntity | null>;
}
