import { Test } from '@nestjs/testing';
import { CreateUserHandler } from './create-user.handler';
import { NotAcceptableException } from '@nestjs/common';
import { CreateUserCommand } from './create-user.command';
import { UserRole } from '@core/constants/user-role.enum';
import { USER_REPOSITORY } from '../../ports/user.repository.port';

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;

  const mockRepository = {
    create: jest.fn(),
    getUserByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(CreateUserHandler);

    jest.clearAllMocks();
  });

  it('should throw NotAcceptableException when username already exists', async () => {
    mockRepository.getUserByUsername.mockResolvedValue({
      id: '1',
      username: 'Mheg',
    });

    await expect(
      handler.execute(
        new CreateUserCommand('Mheg', 'password', UserRole.ADMIN),
      ),
    ).rejects.toThrow(NotAcceptableException);

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });

  it('should create a user', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    const user = {
      _id: '123',
      username: 'Mheg',
      password: 'password',
      role: 'admin',
    };

    mockRepository.create.mockResolvedValue(user);

    const result = await handler.execute(
      new CreateUserCommand('Mheg', 'password', UserRole.ADMIN),
    );

    expect(result).toEqual(user);

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');

    expect(mockRepository.create).toHaveBeenCalled();
  });
});
