import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GetProductHandler } from './get-product.handler';
import { GetProductQuery } from './get-product.query';
import {
  PRODUCT_REPOSITORY,
  ProductRepositoryPort,
} from '../../ports/product.repository.port';

describe('GetProductHandler', () => {
  let handler: GetProductHandler;

  const mockRepository: Partial<ProductRepositoryPort> = {
    getOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetProductHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetProductHandler);

    jest.clearAllMocks();
  });

  it('should return a product', async () => {
    const product = {
      _id: 'product-id',
      productName: 'Coke',
      productCategory: 'Drinks',
      buyingPrice: 20,
      sellingPrice: 25,
    };

    (mockRepository.getOneProduct as jest.Mock).mockResolvedValue(product);

    const result = await handler.execute(new GetProductQuery('product-id'));

    expect(result).toEqual(product);
    expect(mockRepository.getOneProduct).toHaveBeenCalledWith('product-id');
  });

  it('should throw NotFoundException when product does not exist', async () => {
    (mockRepository.getOneProduct as jest.Mock).mockResolvedValue(null);

    await expect(
      handler.execute(new GetProductQuery('product-id')),
    ).rejects.toThrow(NotFoundException);

    expect(mockRepository.getOneProduct).toHaveBeenCalledWith('product-id');
  });
});
