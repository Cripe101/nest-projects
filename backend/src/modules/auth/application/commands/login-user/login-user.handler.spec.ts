import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { LoginUserHandler } from './login-user.handler';
import { LoginUserCommand } from './login-user.command';
import { USER_REPOSITORY } from '@modules/user/application/ports/user.repository.port';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

describe('LoginUserHandler', () => {
  let handler: LoginUserHandler;

  const mockRepository = {
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

    mockRepository.getUserByUsername.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    mockJwtService.sign.mockReturnValue('jwt-token');

    const result = await handler.execute(
      new LoginUserCommand('Mheg', 'password'),
    );

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) {
      expect(result.value).toEqual({
        accessToken: 'jwt-token',
        user: {
          sub: '123',
          username: 'Mheg',
          role: 'admin',
        },
      });
    }
    expect(mockRepository.getUserByUsername).toHaveBeenCalledWith('Mheg');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashed-password');
    expect(mockJwtService.sign).toHaveBeenCalled();
  });

  it('should return AuthError.INVALID when password or user is invalid', async () => {
    const user = {
      _id: '123',
      username: 'Mheg',
      password: 'hashed-password',
      role: 'admin',
    };

    const command = new LoginUserCommand('Mheg', 'wrong-password');

    mockRepository.getUserByUsername.mockResolvedValue(user);

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const result = await handler.execute(command);

    expect(result.isErr()).toEqual(true);
    expect(mockJwtService.sign).not.toHaveBeenCalled();
  });
});
