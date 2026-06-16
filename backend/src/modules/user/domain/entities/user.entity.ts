import { UserRole } from '@core/constants/user-role.enum';
import { BaseEntity } from '@core/entities/base.entity';

export class UserEntity extends BaseEntity {
  constructor(
    public readonly _id: string | null,
    public readonly username: string,
    public readonly role: UserRole,
    public readonly password?: string,
  ) {
    super(_id);
  }
}
