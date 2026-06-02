import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../../presentation/user/dto/user.dto';

@Injectable()
export class MongoUserRepository implements UserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly userModel: Model<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<UserEntity | null> {
    return await this.userModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteUser(id: string): Promise<UserEntity | null> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userModel.find();
  }

  async findByUsername(username: string): Promise<UserEntity | null> {
    return await this.userModel.findOne({ username });
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.userModel.findById(id);
  }
}
