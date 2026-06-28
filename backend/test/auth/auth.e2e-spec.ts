import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus } from '@nestjs/cqrs';
import request from 'supertest';
import { ok, err } from '../../src/core/libs/result';
import { AuthController } from '@modules/auth/interface/auth.controller';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const commandBus = {
    execute: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: CommandBus,
          useValue: commandBus,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should login successfully and return access token', async () => {
    commandBus.execute.mockResolvedValue(
      ok({
        accessToken: 'jwt-token',
        user: {
          id: '1',
          username: 'admin',
        },
      }),
    );

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'password',
      });

    expect(response.status).toBe(201);
    expect(commandBus.execute).toHaveBeenCalled();
    expect(response.body).toEqual({
      value: {
        accessToken: 'jwt-token',
        user: {
          id: '1',
          username: 'admin',
        },
      },
    });
  });

  it('should return 406 when login fails', async () => {
    commandBus.execute.mockResolvedValue(err('Invalid credentials'));

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'wrong-password',
      });

    expect(response.status).toBe(406);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
