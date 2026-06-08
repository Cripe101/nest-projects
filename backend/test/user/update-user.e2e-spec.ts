import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { Test } from '@nestjs/testing';
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

  it('should return an updated user', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'Mhegz',
        password: 'Mhegz2003',
      });

    const token = loginResponse.body.accessToken;

    const createResponse = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'update-test-user',
        password: 'testpassword',
        role: UserRole.STAFF,
      });

    const userId = createResponse.body?._id;

    const response = await request(app.getHttpServer())
      .put('/users/' + userId)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'update-user',
        role: UserRole.STAFF,
      });

    expect(response.status).toEqual(200);

    expect(response.body.username).toEqual('update-user');
    expect(response.body.role).toEqual('staff');

    await request(app.getHttpServer())
      .delete('/users/' + userId)
      .set('Authorization', `Bearer ${token}`);
  });
});
