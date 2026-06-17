import { Test } from '@nestjs/testing';
import { GetUserByUsernameHandler } from './get-user-by-username.handler';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../ports/user.repository.port';

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

  it('should throw NotFoundException when no user found', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    await expect(() =>
      handler.execute(new GetUserByUsernameQuery('mheg')),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return a user', async () => {
    const user = {
      id: '123',
      username: 'Mheg',
    };
    mockRepository.getUserByUsername.mockResolvedValue(user);

    const result = await handler.execute(new GetUserByUsernameQuery('Mheg'));

    expect(result).toEqual(user);
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });
});
