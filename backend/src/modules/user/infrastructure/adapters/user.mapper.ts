import { User } from '@core/schemas/user/user.schema';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { Types } from 'mongoose';

interface UserObject extends User {
  _id: Types.ObjectId;
}

export class UserMapper {
  static toEntity(user: UserObject): UserEntity;
  static toEntity(users: UserObject[]): UserEntity[];

  static toEntity(
    userOrUsers: UserObject | UserObject[],
  ): UserEntity | UserEntity[] {
    if (Array.isArray(userOrUsers)) {
      return userOrUsers.map(this.mapUser);
    }

    return this.mapUser(userOrUsers);
  }

  private static mapUser(user: UserObject): UserEntity {
    return {
      ...user,
      _id: user._id.toString(),
      middleName: user.middleName as string,
    };
  }
}
