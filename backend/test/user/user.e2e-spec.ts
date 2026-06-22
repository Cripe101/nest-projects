import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';
import { UserRole } from '../../src/core/constants/user-role.enum';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let createdUserId: string;
  let createdUserUsername: string;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'Mhegz',
        password: 'Mhegz2003',
      });

    token = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'test-user',
        password: 'password123',
        role: UserRole.STAFF,
      });

    createdUserId = response.body.value;

    expect(response.body).toBeDefined();
    expect(response.body.value).toEqual(createdUserId);
  });

  it('should get all users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(Array.isArray(response.body.value)).toEqual(true);
    expect(response.body.value.length).toBeGreaterThan(0);
  });

  it('should get user by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/' + createdUserId)
      .set('Authorization', `Bearer ${token}`);

    createdUserUsername = response.body.value.username;

    expect(response.body).toBeDefined();
    expect(response.body.value._id).toEqual(createdUserId);
    expect(response.body.value.username).toEqual('test-user');
    expect(response.body.value.role).toEqual(UserRole.STAFF);
  });

  it('should get user by username', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/username/' + createdUserUsername)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toBeDefined();
    expect(response.body.value.username).toEqual(createdUserUsername);
    expect(response.body.value.role).toEqual(UserRole.STAFF);
  });

  it('should update user', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/' + createdUserId)
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'updated-user',
        role: UserRole.CASHIER,
      });

    expect(response.body).toBeDefined();
    expect(response.body.value.username).toEqual('updated-user');
    expect(response.body.value.role).toEqual(UserRole.CASHIER);
  });

  it('should delete user', async () => {
    const response = await request(app.getHttpServer())
      .delete('/users/' + createdUserId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});
