import { Test } from '@nestjs/testing';

import { GetInventoriesHandler } from './get-inventories.handler';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

describe('GetInventoriesHandler', () => {
  let handler: GetInventoriesHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
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

    (mockRepository.getAllInventories as jest.Mock).mockResolvedValue(
      inventories,
    );

    const result = await handler.execute();

    expect(result).toEqual([
      {
        _id: 'inventory-1',
        productId: 'product-1',
        currentStock: 100,
        minimumStock: 10,
      },
      {
        _id: 'inventory-2',
        productId: 'product-2',
        currentStock: 200,
        minimumStock: 20,
      },
    ]);
    expect(mockRepository.getAllInventories).toHaveBeenCalled();
  });
});
