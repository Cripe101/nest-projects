import { Test } from '@nestjs/testing';
import { DeleteUserHandler } from './delete-user.handler';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { DeleteUserCommand } from './delete-user.command';
import { NotFoundException } from '@nestjs/common';

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
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(DeleteUserHandler);

    jest.clearAllMocks();
  });

  it('should throw an NotFoundException when no user is found with id: 123', async () => {
    mockRepository.deleteOneUser.mockResolvedValue(null);

    await expect(handler.execute(new DeleteUserCommand('123'))).rejects.toThrow(
      NotFoundException,
    );

    expect(mockRepository.deleteOneUser).toHaveBeenCalledWith('123');
  });

  it('should delete one user', async () => {
    const user = {
      id: '123',
      username: 'Mheg',
    };
    mockRepository.deleteOneUser.mockResolvedValue(user);

    const result = await handler.execute(new DeleteUserCommand('123'));

    expect(result).toEqual(user);

    expect(mockRepository.deleteOneUser).toHaveBeenCalledWith('123');
  });
});
