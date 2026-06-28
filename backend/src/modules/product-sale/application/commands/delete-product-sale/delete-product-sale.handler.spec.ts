import { Test } from '@nestjs/testing';
import { DeleteProductSaleHandler } from './delete-product-sale.handler';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';
import { ok, err } from '@core/libs/result';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

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

    mockRepository.deleteOneProductSale.mockResolvedValue(ok(sale));

    const result = await handler.execute(
      new DeleteProductSaleCommand(sale._id),
    );

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) expect(result.value).toEqual(sale._id);
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith(sale._id);
  });

  it('should return ProcutSaleError.NOT_FOUND when sale does not exist', async () => {
    mockRepository.deleteOneProductSale.mockResolvedValue(
      err(ProductSaleError.NOT_FOUND),
    );

    const result = await handler.execute(
      new DeleteProductSaleCommand('sale-id'),
    );

    expect(result.isErr()).toEqual(true);
    if (result.isErr())
      expect(result.error).toEqual(ProductSaleError.NOT_FOUND);
    expect(mockRepository.deleteOneProductSale).toHaveBeenCalledWith('sale-id');
  });
});
