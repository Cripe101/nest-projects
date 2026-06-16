import { Test } from '@nestjs/testing';

import { GetTotalSaleProfitHandler } from './get-total-sale-profit.handler';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';

describe('GetTotalSaleProfitHandler', () => {
  let handler: GetTotalSaleProfitHandler;

  const mockRepository = {
    getTotalSaleProfit: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetTotalSaleProfitHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetTotalSaleProfitHandler);

    jest.clearAllMocks();
  });

  it('should return total sale profit', async () => {
    const totalProfit = {
      totalProfit: 2000,
    };

    mockRepository.getTotalSaleProfit.mockResolvedValue(totalProfit);

    const result = await handler.execute();

    expect(result).toEqual(totalProfit);

    expect(mockRepository.getTotalSaleProfit).toHaveBeenCalled();
  });

  it('should return zero total sale profit', async () => {
    const totalProfit = {
      totalProfit: 0,
    };

    mockRepository.getTotalSaleProfit.mockResolvedValue(totalProfit);

    const result = await handler.execute();

    expect(result).toEqual(totalProfit);

    expect(mockRepository.getTotalSaleProfit).toHaveBeenCalled();
  });
});
