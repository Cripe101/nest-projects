import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { NotAcceptableException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { LoginUserHandler } from './login-user.handler';
import { LoginUserCommand } from './login-user.command';
import {
  USER_REPOSITORY,
  UserRepositoryPort,
} from '@modules/user/application/ports/user.repository.port';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('LoginUserHandler', () => {
  let handler: LoginUserHandler;

  const mockRepository: Partial<UserRepositoryPort> = {
    getUserByUsername: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginUserHandler,
        {
          provide: USER_REPOSITORY,
          useValue: mockRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    handler = module.get(LoginUserHandler);

    jest.clearAllMocks();
  });

  it('should login a user', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      password: 'hashed-password',
      role: 'admin',
    };

    (mockRepository.getUserByUsername as jest.Mock).mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await handler.execute(
      new LoginUserCommand('Mheg', 'password'),
    );

    expect(result).toEqual({
      accessToken: 'jwt-token',
      user: {
        sub: '123',
        username: 'Mheg',
        role: 'admin',
      },
    });
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed-password');
    expect(mockJwtService.sign).toHaveBeenCalled();
  });

  it('should throw NotAcceptableException when password is invalid', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      password: 'hashed-password',
      role: 'admin',
    };

    const command = new LoginUserCommand('Mheg', 'wrong-password');

    (mockRepository.getUserByUsername as jest.Mock).mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(handler.execute(command)).rejects.toThrow(
      NotAcceptableException,
    );
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });
});
