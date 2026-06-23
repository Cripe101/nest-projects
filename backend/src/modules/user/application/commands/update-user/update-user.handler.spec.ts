import { Test } from '@nestjs/testing';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from './update-user.command';
import { UserRole } from '@core/constants/user-role.enum';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { UserError } from '@modules/user/domain/errors/user.error';

describe('UpdateUserHandler', () => {
  let handler: UpdateUserHandler;

  const mockRepository = {
    updateOneUser: jest.fn(),
    getUserByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateUserHandler,
        { provide: USER_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    handler = module.get(UpdateUserHandler);

    jest.clearAllMocks();
  });

  it('should return DUPLICATE_USERNAME when username already exists', async () => {
    mockRepository.getUserByUsername.mockResolvedValue({
      _id: '456',
      username: 'Mheg',
    });

    const result = await handler.execute(
      new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN),
    );

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(UserError.DUPLICATE_USERNAME);
    }

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.updateOneUser).not.toHaveBeenCalled();
  });

  it('should return NOT_FOUND when user does not exist', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);
    mockRepository.updateOneUser.mockResolvedValue(null);

    const result = await handler.execute(
      new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN),
    );

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(UserError.NOT_FOUND);
    }

    expect(mockRepository.updateOneUser).toHaveBeenCalledWith('123', {
      _id: '123',
      role: UserRole.ADMIN,
      username: 'Mheg',
    });
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });

  it('should update a user', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    const updatedUser = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockRepository.updateOneUser.mockResolvedValue(updatedUser);

    const result = await handler.execute(
      new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN),
    );

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toEqual(updatedUser._id);
    }

    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.updateOneUser).toHaveBeenCalled();
  });
});
