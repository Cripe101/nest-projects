import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { GetInventoryHandler } from './get-inventory.handler';
import { GetInventoryQuery } from './get-inventory.query';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

describe('GetInventoryHandler', () => {
  let handler: GetInventoryHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
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

    (mockRepository.getOneInventory as jest.Mock).mockResolvedValue(inventory);

    const result = await handler.execute(new GetInventoryQuery('inventory-id'));

    expect(result).toEqual(inventory);

    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });

  it('should throw NotFoundException when inventory does not exist', async () => {
    (mockRepository.getOneInventory as jest.Mock).mockResolvedValue(null);

    await expect(
      handler.execute(new GetInventoryQuery('inventory-id')),
    ).rejects.toThrow(NotFoundException);

    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });
});
