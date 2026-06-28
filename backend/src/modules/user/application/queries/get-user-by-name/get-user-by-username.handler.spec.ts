import { Test } from '@nestjs/testing';
import { GetUserByUsernameHandler } from './get-user-by-username.handler';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { USER_REPOSITORY } from '../../ports/user.repository.port';
import { UserError } from '@modules/user/domain/errors/user.error';
import { UserRole } from '@core/constants/user-role.enum';
import { err, ok } from '@core/libs/result';

describe('GetUserByUsernameHandler', () => {
  let handler: GetUserByUsernameHandler;

  const mockRepository = {
    getUserByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUserByUsernameHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetUserByUsernameHandler);

    jest.clearAllMocks();
  });

  it('should return NOT_FOUND when no user found', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(
      err(UserError.NOT_FOUND),
    );

    const result = await handler.execute(new GetUserByUsernameQuery('Mheg'));

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error).toBe(UserError.NOT_FOUND);
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });

  it('should return a user', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      role: UserRole.ADMIN,
    };

    mockRepository.getUserByUsername.mockResolvedValue(ok(user));

    const result = await handler.execute(new GetUserByUsernameQuery('Mheg'));

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toEqual(user);
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });
});
