import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  let token: string;
  let createdProductId: string;

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

  it('should create a product', async () => {
    const response = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productName: 'Test Product',
        productCategory: 'Drinks',
        buyingPrice: 20,
        sellingPrice: 30,
        description: 'Test product description',
        imageUrl: 'http://example.com/image.png',
      });

    expect(response.status).toEqual(201);

    expect(response.body).toBeDefined();
    expect(response.body.productName).toEqual('Test Product');
    expect(response.body.productCategory).toEqual('Drinks');

    createdProductId = response.body._id;
  });

  it('should get all products', async () => {
    const response = await request(app.getHttpServer()).get('/products');

    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get product by id', async () => {
    const response = await request(app.getHttpServer()).get(
      '/products/' + createdProductId,
    );

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body._id).toEqual(createdProductId);
    expect(response.body.productName).toEqual('Test Product');
  });

  it('should update product', async () => {
    const response = await request(app.getHttpServer())
      .put('/products/' + createdProductId)
      .set('Authorization', `Bearer ${token}`)
      .send({
        productName: 'Updated Product',
        productCategory: 'Foods',
        buyingPrice: 25,
        sellingPrice: 40,
        description: 'Updated description',
        imageUrl: 'http://example.com/updated.png',
      });

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
    expect(response.body.productName).toEqual('Updated Product');
    expect(response.body.productCategory).toEqual('Foods');
  });

  it('should delete product', async () => {
    const response = await request(app.getHttpServer())
      .delete('/products/' + createdProductId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined();
  });
});
