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
      new DeleteProductSaleCommand(sale._id),
    );

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) {
      expect(result.value).toEqual(sale._id);
    }
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith(sale._id);
  });

  it('should return ProcutSaleError.NOT_FOUND when sale does not exist', async () => {
    mockRepository.deleteOneProductSale.mockResolvedValue(null);

    const result = await handler.execute(
      new DeleteProductSaleCommand('sale-id'),
    );

    expect(result.isErr()).toEqual(true);
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith('sale-id');
  });
});
