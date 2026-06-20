import { GetUserHandler } from './get-user.handler';
import { GetUserQuery } from './get-user.query';
import { Test } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { UserError } from '@modules/user/domain/errors/user.error';
import { UserRole } from '@core/constants/user-role.enum';

describe('GetUserHandler', () => {
  let handler: GetUserHandler;

  const mockRepository = {
    getOneUser: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetUserHandler);

    jest.clearAllMocks();
  });

  it('should return NOT_FOUND when user does not exist', async () => {
    mockRepository.getOneUser.mockResolvedValue(null);

    const result = await handler.execute(new GetUserQuery('123'));

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(UserError.NOT_FOUND);
    }

    expect(mockRepository.getOneUser).toHaveBeenCalledWith('123');
  });

  it('should return a user', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockRepository.getOneUser.mockResolvedValue(user);

    const result = await handler.execute(new GetUserQuery('123'));

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toEqual(user);
    }

    expect(mockRepository.getOneUser).toHaveBeenCalledWith('123');
  });
});
