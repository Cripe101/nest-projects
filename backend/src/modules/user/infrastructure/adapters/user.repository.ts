import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../application/ports/user.repository.port';
import { UserEntity } from '../../domain/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '../../interface/dto/user.dto';
import { User } from '@core/schemas/user/user.schema';
import { UserError } from '@modules/user/domain/errors/user.error';
import { Result, ok, err } from '@core/libs/result';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository implements UserRepositoryPort {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(user: UserEntity): Promise<Result<UserEntity, UserError>> {
    const createdUser = await this.userModel.create({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
      role: user.role,
    });

    const userReturn = new UserEntity(
      createdUser._id.toString(),
      createdUser.firstName,
      createdUser.middleName as string,
      createdUser.lastName,
      createdUser.email,
      createdUser.username,
      createdUser.role,
    );

    return ok(userReturn);
  }

  async updateOneUser(
    id: string,
    dto: UpdateUserDto,
  ): Promise<Result<UserEntity | null, UserError>> {
    const user = await this.userModel.findByIdAndUpdate(id, dto, {
      returnDocument: 'after',
    });

    if (!user) return err(UserError.NOT_FOUND);

    return ok(UserMapper.toEntity(user));
  }

  async deleteOneUser(
    id: string,
  ): Promise<Result<UserEntity | null, UserError>> {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) return err(UserError.NOT_FOUND);

    return ok(UserMapper.toEntity(user));
  }

  async getAllUsers(): Promise<Result<UserEntity[], null>> {
    const users = await this.userModel.find();

    return ok(UserMapper.toEntity(users));
  }

  async getUserByUsername(
    username: string,
  ): Promise<Result<UserEntity | null, UserError>> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return err(UserError.NOT_FOUND);
    }

    return ok(UserMapper.toEntity(user));
  }

  async getOneUser(id: string): Promise<Result<UserEntity | null, UserError>> {
    const user = await this.userModel.findById(id);

    if (!user) {
      return err(UserError.NOT_FOUND);
    }

    return ok(UserMapper.toEntity(user));
  }
}
