import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

describe('ProductSaleController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let productId: string;
  let inventoryId: string;
  let saleId: string;

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

    token = loginResponse.body.value.accessToken;

    const productResponse = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productName: 'Sale Product',
        productCategory: 'Drinks',
        buyingPrice: 20,
        sellingPrice: 50,
        description: 'Test',
        imageUrl: 'http://example.com/img.png',
      });

    productId = productResponse.body.value;

    const inventoryResponse = await request(app.getHttpServer())
      .post('/inventories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        currentStock: 100,
        minimumStock: 10,
      });

    inventoryId = inventoryResponse.body.value;
  });

  afterAll(async () => {
    if (app) {
   await app.close();
 }
 });

  it('should create a product sale', async () => {
    const response = await request(app.getHttpServer())
      .post('/product-sales')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 2,
      });

    saleId = response.body.value;

    expect(response.body).toBeDefined();
    expect(response.body.value).toEqual(saleId);
  });

  it('should get all product sales', async () => {
    const response = await request(app.getHttpServer())
      .get('/product-sales')
      .set('Authorization', `Bearer ${token}`);

    expect(Array.isArray(response.body.value)).toBe(true);
    expect(response.body.value.length).toBeGreaterThan(0);
  });

  it('should get one product sale', async () => {
    const response = await request(app.getHttpServer())
      .get('/product-sales/' + saleId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.value).toBeDefined();
    expect(response.body.value._id).toEqual(saleId);
  });

  it('should get total sales', async () => {
    const response = await request(app.getHttpServer())
      .get('/product-sales/total-sale')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.value).toHaveProperty('totalSale');
  });

  it('should get total profit', async () => {
    const response = await request(app.getHttpServer())
      .get('/product-sales/total-profit')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.value).toHaveProperty('totalProfit');
  });

  it('should delete product sale', async () => {
    const response = await request(app.getHttpServer())
      .delete('/product-sales/' + saleId)
      .set('Authorization', `Bearer ${token}`);

    await request(app.getHttpServer())
      .delete('/products/' + productId)
      .set('Authorization', `Bearer ${token}`);

    await request(app.getHttpServer())
      .delete('/inventories/' + inventoryId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body.value).toEqual(saleId);
    expect(response.body).toBeDefined();
  });
});
