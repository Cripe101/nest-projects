import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { UserRole } from '@core/constants/user-role.enum';
import { ok, err } from '@core/interfaces/result';
import { UserError } from '@modules/user/domain/errors/user.error';

describe('UserController', () => {
  let controller: UserController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    controller = module.get(UserController);

    jest.clearAllMocks();
  });

  it('should create a user', async () => {
    const dto = {
      username: 'Mheg',
      password: 'password',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(ok('123'));

    const result = await controller.createUser(dto);

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual('123');
    }

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should throw ConflictException when username already exists', async () => {
    const dto = {
      username: 'Mheg',
      password: 'password',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(err(UserError.DUPLICATE_USERNAME));

    await expect(controller.createUser(dto)).rejects.toThrow(ConflictException);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should update a user', async () => {
    const dto = {
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    const updatedUser = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(ok(updatedUser));

    const result = await controller.updateUser('123', { ...dto });

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual(updatedUser);
    }

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should throw ConflictException when updating to an existing username', async () => {
    const dto = {
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(err(UserError.DUPLICATE_USERNAME));

    await expect(controller.updateUser('123', dto)).rejects.toThrow(
      ConflictException,
    );
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should throw NotFoundException when updating a non-existent user', async () => {
    const dto = {
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(err(UserError.NOT_FOUND));

    await expect(controller.updateUser('123', dto)).rejects.toThrow(
      NotFoundException,
    );
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const deletedUser = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockCommandBus.execute.mockResolvedValue(ok(deletedUser));

    const result = await controller.deleteUser('123');

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual('123');
    }

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should throw NotFoundException when deleting a non-existent user', async () => {
    mockCommandBus.execute.mockResolvedValue(err(UserError.NOT_FOUND));

    await expect(controller.deleteUser('123')).rejects.toThrow(
      NotFoundException,
    );
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should return all users', async () => {
    const users = [
      {
        _id: '123',
        username: 'Mheg',
        role: UserRole.ADMIN,
      },
    ];

    mockQueryBus.execute.mockResolvedValue(ok(users));

    const result = await controller.getUsers();

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual(users);
    }
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockQueryBus.execute.mockResolvedValue(ok(user));

    const result = await controller.getUser('123');

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual(user);
    }
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return a user by username', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockQueryBus.execute.mockResolvedValue(ok(user));

    const result = await controller.getUserByUsername('Mheg');

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual(user);
    }
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });
});
