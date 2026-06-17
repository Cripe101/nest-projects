import { Test } from '@nestjs/testing';
import { UpdateUserHandler } from './update-user.handler';
import { UpdateUserCommand } from './update-user.command';
import { UserRole } from '@core/constants/user-role.enum';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY } from '../../ports/user.repository.port';

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

  it('should throw an ConflictException when username already exist', async () => {
    mockRepository.getUserByUsername.mockResolvedValue({
      id: '1234',
      uesrname: 'Mheg',
    });

    await expect(
      handler.execute(new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN)),
    ).rejects.toThrow(ConflictException);
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.updateOneUser).not.toHaveBeenCalledWith('123');
  });

  it('should throw NotFoundException when user does not exist', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    mockRepository.updateOneUser.mockResolvedValue(null);

    await expect(
      handler.execute(new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN)),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepository.updateOneUser).toHaveBeenCalledWith('123', {
      _id: '123',
      role: 'admin',
      username: 'Mheg',
    });
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
  });

  it('should update a user', async () => {
    mockRepository.getUserByUsername.mockResolvedValue(null);

    const updatedUser = {
      _id: '123',
      username: 'Mheg',
      role: 'admin',
    };
    mockRepository.updateOneUser.mockResolvedValue(updatedUser);

    const result = await handler.execute(
      new UpdateUserCommand('123', 'Mheg', UserRole.ADMIN),
    );

    expect(result).toEqual(updatedUser);
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(mockRepository.updateOneUser).toHaveBeenCalled();
  });
});
