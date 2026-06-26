import { Test } from '@nestjs/testing';
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create-user.command';
import { UserRole } from '@core/constants/user-role.enum';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { UserError } from '@modules/user/domain/errors/user.error';

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

  it('should return DUPLICATE_USERNAME when username already exists', async () => {
    mockRepository.getUserByUsername.mockResolvedValue({
      _id: '1',
      username: 'Mheg',
    });

    const result = await handler.execute(
      new CreateUserCommand('Mheg', 'password', UserRole.ADMIN),
    );

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(UserError.DUPLICATE_USERNAME);
    }

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.create).not.toHaveBeenCalled();
  });

  it('should create a user', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    const user = {
      _id: '123',
      username: 'Mheg',
      password: 'hashedPassword',
      role: UserRole.ADMIN,
    };

    mockRepository.create.mockResolvedValue(user);

    const result = await handler.execute(
      new CreateUserCommand('Mheg', 'password', UserRole.ADMIN),
    );

    // this is a bad pratice

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toEqual(user._id);
    }

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.create).toHaveBeenCalled();
  });
});
