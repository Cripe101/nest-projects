import { NotFoundException } from '@nestjs/common';
import { GetUserHandler } from './get-user.handler';
import { GetUserQuery } from './get-user.query';
import { Test } from '@nestjs/testing';
import { USER_REPOSITORY } from '../../ports/user.repository.port';

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

  it('should throw NotFoundException when user does not exist', async () => {
    mockRepository.getOneUser.mockResolvedValue(null);

    await expect(handler.execute(new GetUserQuery('123'))).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return a user', async () => {
    const user = {
      id: '123',
      username: 'mheg',
    };

    mockRepository.getOneUser.mockResolvedValue(user);

    const result = await handler.execute(new GetUserQuery('123'));

    expect(result).toEqual(user);
    expect(mockRepository.getOneUser).toHaveBeenCalledWith('123');
  });
});
