import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DeleteProductSaleHandler } from './delete-product-sale.handler';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';

describe('DeleteProductSaleHandler', () => {
  let handler: DeleteProductSaleHandler;

  const mockRepository = {
    deleteOneProductSale: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteProductSaleHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(DeleteProductSaleHandler);

    jest.clearAllMocks();
  });

  it('should delete a product sale', async () => {
    const sale = {
      _id: 'sale-id',
      productId: 'product-id',
      quantity: 2,
      totalPrice: 100,
      profit: 20,
    };

    mockRepository.deleteOneProductSale.mockResolvedValue(sale);

    const result = await handler.execute(
      new DeleteProductSaleCommand('sale-id'),
    );

    expect(result).toEqual(sale);
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith('sale-id');
  });

  it('should throw NotFoundException when sale does not exist', async () => {
    mockRepository.deleteOneProductSale.mockResolvedValue(null);

    await expect(
      handler.execute(new DeleteProductSaleCommand('sale-id')),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith('sale-id');
  });
});
