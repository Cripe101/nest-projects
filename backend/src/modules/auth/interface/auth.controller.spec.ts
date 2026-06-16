import { Test } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
      ],
    }).compile();

    controller = module.get(AuthController);

    jest.clearAllMocks();
  });

  it('should login a user', async () => {
    const dto = {
      username: 'Mheg',
      password: 'password',
    };

    const loginResponse = {
      accessToken: 'jwt-token',
    };

    mockCommandBus.execute.mockResolvedValue(loginResponse);

    const result = await controller.login(dto);

    expect(result).toEqual(loginResponse);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });
});
