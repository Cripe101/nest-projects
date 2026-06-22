import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GetInventoryHandler } from './get-inventory.handler';
import { GetInventoryQuery } from './get-inventory.query';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';
import { Result } from 'neverthrow';

describe('GetInventoryHandler', () => {
  let handler: GetInventoryHandler;

  const mockRepository = {
    getOneInventory: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetInventoryHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetInventoryHandler);

    jest.clearAllMocks();
  });

  it('should return an inventory', async () => {
    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 100,
      minimumStock: 10,
    };

    mockRepository.getOneInventory.mockResolvedValue(inventory);

    const result = await handler.execute(new GetInventoryQuery('inventory-id'));

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) {
      expect(result.value).toEqual(inventory);
    }
    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });

  it('should return InventoryError.NOT_FOUND when inventory does not exist', async () => {
    mockRepository.getOneInventory.mockResolvedValue(null);

    const result = await handler.execute(new GetInventoryQuery('inventory-id'));

    expect(result.isErr()).toEqual(true);
    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });
});
