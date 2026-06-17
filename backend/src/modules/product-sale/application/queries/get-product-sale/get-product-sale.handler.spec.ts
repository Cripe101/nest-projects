import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GetProductSaleHandler } from './get-product-sale.handler';
import { GetProductSaleQuery } from './get-product-sale.query';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';

describe('GetProductSaleHandler', () => {
  let handler: GetProductSaleHandler;

  const mockRepository = {
    getOneProductSale: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetProductSaleHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetProductSaleHandler);

    jest.clearAllMocks();
  });

  it('should return a product sale', async () => {
    const sale = {
      _id: 'sale-id',
      productId: 'product-id',
      quantity: 2,
      totalPrice: 100,
      profit: 20,
    };

    mockRepository.getOneProductSale.mockResolvedValue(sale);

    const result = await handler.execute(new GetProductSaleQuery('sale-id'));

    expect(result).toEqual(sale);
    expect(mockRepository.getOneProductSale).toHaveBeenCalledWith('sale-id');
  });

  it('should throw NotFoundException when sale does not exist', async () => {
    mockRepository.getOneProductSale.mockResolvedValue(null);

    await expect(
      handler.execute(new GetProductSaleQuery('sale-id')),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepository.getOneProductSale).toHaveBeenCalledWith('sale-id');
  });
});
