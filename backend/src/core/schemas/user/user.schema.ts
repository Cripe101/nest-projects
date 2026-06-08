import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../../constants/user-role.enum';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({
    type: String,
    required: true,
    enum: UserRole,
    default: UserRole.STAFF,
  })
  role!: UserRole;

  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
