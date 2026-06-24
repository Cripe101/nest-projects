import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import request from 'supertest';

describe('InventoryController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let inventoryId: string;
  let productId: string;

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

    const productResponse = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productName: 'Inventory Test Product',
        productCategory: 'Drinks',
        buyingPrice: 20,
        sellingPrice: 30,
        description: 'Test product',
        imageUrl: 'http://example.com/image.png',
      });

    productId = productResponse.body.value;
  });

  afterAll(async () => {
    if (app) {
   await app.close();
 }
 });

  it('should create inventory', async () => {
    const response = await request(app.getHttpServer())
      .post('/inventories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        currentStock: 100,
        minimumStock: 10,
      });

    inventoryId = response.body.value;

    expect(response.body).toBeDefined();
    expect(response.body.value).toEqual(inventoryId);
  });

  it('should get all inventories', async () => {
    const response = await request(app.getHttpServer())
      .get('/inventories')
      .set('Authorization', `Bearer ${token}`);

    expect(Array.isArray(response.body.value)).toBe(true);
    expect(response.body.value.length).toBeGreaterThan(0);
  });

  it('should get inventory by id', async () => {
    const response = await request(app.getHttpServer())
      .get('/inventories/' + inventoryId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toBeDefined();
    expect(response.body.value?._id).toEqual(inventoryId);
  });

  it('should add stock to inventory', async () => {
    const response = await request(app.getHttpServer())
      .put('/inventories/add-stock/' + inventoryId)
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 50,
      });

    expect(response.body).toBeDefined();
  });

  it('should update inventory', async () => {
    const response = await request(app.getHttpServer())
      .put('/inventories/' + inventoryId)
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        minimumStock: 20,
      });

    expect(response.body).toBeDefined();
    expect(response.body.value).toEqual(inventoryId);
  });

  it('should delete inventory', async () => {
    await request(app.getHttpServer())
      .delete('/products/' + productId)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app.getHttpServer())
      .delete('/inventories/' + inventoryId)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toBeDefined();
    expect(response.body.value).toEqual(inventoryId);
  });
});
