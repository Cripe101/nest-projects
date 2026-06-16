import { Test } from '@nestjs/testing';

import { GetProductSalesHandler } from './get-product-sales.handler';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';

describe('GetProductSalesHandler', () => {
  let handler: GetProductSalesHandler;

  const mockRepository = {
    getAllProductSales: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetProductSalesHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetProductSalesHandler);

    jest.clearAllMocks();
  });

  it('should return all product sales', async () => {
    const sales = [
      {
        _id: 'sale-id-1',
        productId: 'product-id-1',
        quantity: 2,
        totalPrice: 100,
        profit: 20,
      },
      {
        _id: 'sale-id-2',
        productId: 'product-id-2',
        quantity: 3,
        totalPrice: 150,
        profit: 30,
      },
    ];

    mockRepository.getAllProductSales.mockResolvedValue(sales);

    const result = await handler.execute();

    expect(result).toEqual(sales);

    expect(mockRepository.getAllProductSales).toHaveBeenCalled();
  });

  it('should return an empty array when there are no sales', async () => {
    mockRepository.getAllProductSales.mockResolvedValue([]);

    const result = await handler.execute();

    expect(result).toEqual([]);

    expect(mockRepository.getAllProductSales).toHaveBeenCalled();
  });
});
