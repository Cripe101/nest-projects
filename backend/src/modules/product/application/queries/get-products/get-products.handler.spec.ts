import { Test } from '@nestjs/testing';
import { GetProductsHandler } from './get-products.handler';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

describe('GetProductsHandler', () => {
  let handler: GetProductsHandler;

  const mockRepository = {
    getAllProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetProductsHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetProductsHandler);

    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    const products = [
      new ProductEntity(
        '123',
        'Coke',
        'Drinks',
        'user-id',
        20,
        25,
        'Softdrink',
        'image.jpg',
      ),
      new ProductEntity(
        '456',
        'Pepsi',
        'Drinks',
        'user-id',
        18,
        23,
        'Softdrink',
        'pepsi.jpg',
      ),
    ];

    mockRepository.getAllProducts.mockResolvedValue(products);

    const result = await handler.execute();

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(products);
    }
    expect(mockRepository.getAllProducts).toHaveBeenCalledTimes(1);
  });
});
