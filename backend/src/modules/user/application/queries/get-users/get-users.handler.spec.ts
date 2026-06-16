import { Test } from '@nestjs/testing';
import { GetUsersHandler } from './get-users.handler';
import { USER_REPOSITORY } from '../../ports/user.repository.port';

describe('GetUsersHanlder', () => {
  let handler: GetUsersHandler;

  const mockRepository = {
    getAllUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetUsersHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetUsersHandler);

    jest.clearAllMocks();
  });

  it('should return all users in the repository', async () => {
    const users = [
      {
        id: '123',
        username: 'Mheg',
      },
      {
        id: '1234',
        username: 'Ryan',
      },
    ];

    mockRepository.getAllUsers.mockResolvedValue(users);

    const result = await handler.execute();

    expect(result).toEqual(users);
    expect(mockRepository.getAllUsers).toHaveBeenCalled();
  });
});
