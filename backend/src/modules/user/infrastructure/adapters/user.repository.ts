import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../application/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../../interface/dto/user.dto';
import { User } from '@core/schemas/user/user.schema';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = await this.userModel.create({
      username: user.username,
      password: user.password,
      role: user.role,
    });

    return new UserEntity(
      createdUser._id.toString(),
      createdUser.username,
      createdUser.role,
      createdUser.password,
    );
  }

  async updateOneUser(
    id: string,
    dto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    return await this.userModel.findByIdAndUpdate(id, dto, {
      returnDocument: 'after',
    });
  }

  async deleteOneUser(id: string): Promise<UserEntity | null> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ username });
  }

  async getOneUser(id: string): Promise<UserEntity | null> {
    return await this.userModel.findById(id);
  }
}
