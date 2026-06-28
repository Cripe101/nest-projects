import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserHandler } from './create-user.handler';
import { CreateUserCommand } from './create-user.command';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { ok, err } from '@core/libs/result';
import { UserError } from '@modules/user/domain/errors/user.error';
import bcrypt from 'bcrypt';
import { UserRole } from '@core/constants/user-role.enum';

jest.mock('bcrypt', () => ({
  __esModule: true,
  default: {
    genSalt: jest.fn(),
    hash: jest.fn(),
  },
}));

describe('CreateUserHandler', () => {
  let handler: CreateUserHandler;

  const mockRepository = {
    getUserByUsername: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(CreateUserHandler);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const command = new CreateUserCommand(
    'John',
    'Michael',
    'Doe',
    'john@example.com',
    'johndoe',
    'password123',
    UserRole.ADMIN,
  );

  it('should create a new user successfully', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(
      err(UserError.NOT_FOUND),
    );

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    mockRepository.create.mockResolvedValue(
      ok({
        _id: 'user-id',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toBe('user-id');
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('johndoe');
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 'salt');
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should return DUPLICATE_USERNAME if username already exists', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(
      ok({
        _id: 'existing-user-id',
        username: 'johndoe',
      } as any),
    );

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error).toBe(UserError.DUPLICATE_USERNAME);
    expect(mockRepository.create).not.toHaveBeenCalled();
    expect(bcrypt.hash).not.toHaveBeenCalled();
  });

  it('should return DUPLICATE_USERNAME if repository create fails', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(
      err(UserError.NOT_FOUND),
    );

    (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

    mockRepository.create.mockResolvedValue(err(UserError.DUPLICATE_USERNAME));

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error).toBe(UserError.DUPLICATE_USERNAME);
  });
});
