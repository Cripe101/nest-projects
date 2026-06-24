import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
     if (app) {
    await app.close();
  }
  });

  it('should login successfully and return access token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'Mhegz',
        password: 'Mhegz2003',
      });

    expect(response.status).toEqual(201);
    expect(response.body).toBeDefined();
    expect(response.body.value.accessToken).toBeDefined();
    expect(response.body.value.user).toBeDefined();
  });

  it('should fail login with invalid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'wrong-user',
        password: 'wrong-password',
      });

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body.value?.accessToken).toBeUndefined();
  });
});
