import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { UserRole } from '../../src/core/constants/user-role.enum';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let userId: string;
  let username: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    const login = await request(app.getHttpServer()).post('/auth/login').send({
      username: 'admin',
      password: 'admin',
    });

    token = login.body?.value?.accessToken;
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /users', async () => {
    const response = await request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'John',
        middleName: 'A',
        lastName: 'Doe',
        email: 'john@example.com',
        username: 'john-doe',
        password: 'password123',
        role: UserRole.STAFF,
      });

    expect(response.status).toBe(201);

    expect(response.body.value).toBeDefined();

    userId = response.body.value;
  });

  it('GET /users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.value)).toBe(true);
  });

  it('GET /users/:id', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body.value._id).toBe(userId);

    username = response.body.value?.username;
  });

  it('GET /users/username/:username', async () => {
    const response = await request(app.getHttpServer())
      .get(`/users/username/${username}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.value.username).toBe(username);
  });

  it('PUT /users/:id', async () => {
    const response = await request(app.getHttpServer())
      .put(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Jane',
        middleName: 'B',
        lastName: 'Smith',
        email: 'jane@example.com',
        username: 'jane-smith',
        role: UserRole.CASHIER,
      });

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(userId);
  });

  it('DELETE /users/:id', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.value).toBe(userId);
  });
});
