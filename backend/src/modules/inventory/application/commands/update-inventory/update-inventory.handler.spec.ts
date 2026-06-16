import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UpdateInventoryHandler } from './update-inventory.handler';
import { UpdateInventoryCommand } from './update-inventory.command';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

describe('UpdateInventoryHandler', () => {
  let handler: UpdateInventoryHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
    updateOneInventory: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateInventoryHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(UpdateInventoryHandler);

    jest.clearAllMocks();
  });

  it('should update an inventory', async () => {
    const updatedInventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 200,
      minimumStock: 20,
      createdBy: 'user-id',
    };

    (mockRepository.updateOneInventory as jest.Mock).mockResolvedValue(
      updatedInventory,
    );

    const result = await handler.execute(
      new UpdateInventoryCommand(
        'inventory-id',
        'product-id',
        200,
        20,
        'user-id',
      ),
    );

    expect(result).toEqual(updatedInventory);

    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });

  it('should throw NotFoundException when inventory does not exist', async () => {
    (mockRepository.updateOneInventory as jest.Mock).mockResolvedValue(null);

    await expect(
      handler.execute(
        new UpdateInventoryCommand(
          'inventory-id',
          'product-id',
          200,
          20,
          'user-id',
        ),
      ),
    ).rejects.toThrow(NotFoundException);

    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });
});
