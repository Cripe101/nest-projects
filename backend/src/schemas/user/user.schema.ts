import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '../../constants/user-role';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true, enum: UserRole })
  role!: UserRole;

  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
