import { Test } from '@nestjs/testing';

import { GetProductsHandler } from './get-products.handler';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../ports/product.repository.port';

describe('GetProductsHandler', () => {
  let handler: GetProductsHandler;

  const mockRepository: Partial<ProductRepositoryPort> = {
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
      {
        _id: 'product-1',
        productName: 'Coke',
        productCategory: 'Drinks',
        buyingPrice: 20,
        sellingPrice: 25,
      },
      {
        _id: 'product-2',
        productName: 'Pepsi',
        productCategory: 'Drinks',
        buyingPrice: 18,
        sellingPrice: 24,
      },
    ];

    (mockRepository.getAllProducts as jest.Mock).mockResolvedValue(products);

    const result = await handler.execute();

    expect(result).toEqual(products);
    expect(mockRepository.getAllProducts).toHaveBeenCalled();
  });
});
