import { Test } from '@nestjs/testing';

import { GetInventoriesHandler } from './get-inventories.handler';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';

describe('GetInventoriesHandler', () => {
  let handler: GetInventoriesHandler;

  const mockRepository = {
    getAllInventories: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetInventoriesHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetInventoriesHandler);

    jest.clearAllMocks();
  });

  it('should return all inventories', async () => {
    const inventories = [
      {
        _id: 'inventory-1',
        productId: 'product-1',
        currentStock: 100,
        minimumStock: 10,
        createdBy: 'user-1',
      },
      {
        _id: 'inventory-2',
        productId: 'product-2',
        currentStock: 200,
        minimumStock: 20,
        createdBy: 'user-2',
      },
    ];

    mockRepository.getAllInventories.mockResolvedValue(inventories);

    const result = await handler.execute();

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) {
      expect(result.value).toEqual(inventories);
    }
    expect(mockRepository.getAllInventories).toHaveBeenCalled();
  });
});
