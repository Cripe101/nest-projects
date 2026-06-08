import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { UserRole } from '../../src/core/constants/user-role.enum';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return created user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'Mhegz',
        password: 'Mhegz2003',
      });

    const token = loginResponse.body.accessToken;

    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'create-test-user',
        password: 'password',
        role: UserRole.STAFF,
      });

    expect(response.status).toEqual(201);

    expect(response.body.username).toEqual('create-test-user');
    expect(response.body.role).toEqual('staff');

    await request(app.getHttpServer())
      .delete('/users/' + response.body._id)
      .set('Authorization', `Bearer ${token}`);
  });
});
