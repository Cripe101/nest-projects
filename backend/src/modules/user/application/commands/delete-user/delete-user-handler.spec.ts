import { Test } from '@nestjs/testing';
import { DeleteUserHandler } from './delete-user.handler';
import { DeleteUserCommand } from './delete-user.command';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { UserError } from '@modules/user/domain/errors/user.error';
import { UserRole } from '@core/constants/user-role.enum';

describe('DeleteUserHandler', () => {
  let handler: DeleteUserHandler;

  const mockRepository = {
    deleteOneUser: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(DeleteUserHandler);

    jest.clearAllMocks();
  });

  it('should return NOT_FOUND when no user is found with id: 123', async () => {
    mockRepository.deleteOneUser.mockResolvedValue(null);

    const result = await handler.execute(new DeleteUserCommand('123'));

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(UserError.NOT_FOUND);
    }

    expect(mockRepository.deleteOneUser).toHaveBeenCalledWith('123');
  });

  it('should delete one user', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockRepository.deleteOneUser.mockResolvedValue(user);

    const result = await handler.execute(new DeleteUserCommand('123'));

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toEqual(user);
    }

    expect(mockRepository.deleteOneUser).toHaveBeenCalledWith('123');
  });
});
