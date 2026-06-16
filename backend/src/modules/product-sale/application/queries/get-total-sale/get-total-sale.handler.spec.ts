import { Test } from '@nestjs/testing';

import { GetTotalSaleHandler } from './get-total-sale.handler';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';

describe('GetTotalSaleHandler', () => {
  let handler: GetTotalSaleHandler;

  const mockRepository = {
    getTotalSale: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetTotalSaleHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetTotalSaleHandler);

    jest.clearAllMocks();
  });

  it('should return total sale', async () => {
    const totalSale = {
      totalSale: 5000,
    };

    mockRepository.getTotalSale.mockResolvedValue(totalSale);

    const result = await handler.execute();

    expect(result).toEqual(totalSale);

    expect(mockRepository.getTotalSale).toHaveBeenCalled();
  });

  it('should return zero total sale', async () => {
    const totalSale = {
      totalSale: 0,
    };

    mockRepository.getTotalSale.mockResolvedValue(totalSale);

    const result = await handler.execute();

    expect(result).toEqual(totalSale);

    expect(mockRepository.getTotalSale).toHaveBeenCalled();
  });
});
