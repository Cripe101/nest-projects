import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserRole } from '@core/constants/user-role.enum';

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

    const createdUser = {
      _id: '123',
      ...dto,
    };

    mockCommandBus.execute.mockResolvedValue(createdUser);

    const result = await controller.createUser(dto);

    expect(result).toEqual(createdUser);

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

    mockCommandBus.execute.mockResolvedValue(updatedUser);

    const result = await controller.updateUser('123', {
      ...dto,
    });

    expect(result).toEqual(updatedUser);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should delete a user', async () => {
    const deletedUser = {
      _id: '123',
      username: 'Mheg',
      role: 'cashier',
    };
    mockCommandBus.execute.mockResolvedValue(deletedUser);

    const result = await controller.deleteUser('123');

    expect(result).toEqual(deletedUser);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should return all users', async () => {
    const users = [
      {
        _id: '123',
        username: 'Mheg',
        role: 'admin',
      },
    ];

    mockQueryBus.execute.mockResolvedValue(users);

    const result = await controller.getUsers();

    expect(result).toEqual(users);

    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return a user by id', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: 'admin',
    };

    mockQueryBus.execute.mockResolvedValue(user);

    const result = await controller.getUser('123');

    expect(result).toEqual(user);

    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return a user by username', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: 'admin',
    };

    mockQueryBus.execute.mockResolvedValue(user);

    const result = await controller.getUserByUsername('Mheg');

    expect(result).toEqual(user);

    expect(mockQueryBus.execute).toHaveBeenCalled();
  });
});
