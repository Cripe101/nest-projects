import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UpdateInventoryHandler } from './update-inventory.handler';
import { UpdateInventoryCommand } from './update-inventory.command';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';

describe('UpdateInventoryHandler', () => {
  let handler: UpdateInventoryHandler;

  const mockRepository = {
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

    mockRepository.updateOneInventory.mockResolvedValue(updatedInventory);

    const result = await handler.execute(
      new UpdateInventoryCommand(
        'inventory-id',
        'product-id',
        200,
        20,
        'user-id',
      ),
    );

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) {
      expect(result.value).toEqual('inventory-id');
    }
    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });

  it('should throw NotFoundException when inventory does not exist', async () => {
    mockRepository.updateOneInventory.mockResolvedValue(null);

    const result = await handler.execute(
      new UpdateInventoryCommand(
        'inventory-id',
        'product-id',
        200,
        20,
        'user-id',
      ),
    );

    expect(result.isErr()).toEqual(true);
    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });
});
