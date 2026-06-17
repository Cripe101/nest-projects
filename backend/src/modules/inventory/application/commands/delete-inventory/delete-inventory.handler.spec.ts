import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { DeleteInventoryHandler } from './delete-inventory.handler';
import { DeleteInventoryCommand } from './delete-inventory.command';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

describe('DeleteInventoryHandler', () => {
  let handler: DeleteInventoryHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
    deleteOneInventory: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteInventoryHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(DeleteInventoryHandler);

    jest.clearAllMocks();
  });

  it('should delete an inventory', async () => {
    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 100,
      minimumStock: 10,
    };

    (mockRepository.deleteOneInventory as jest.Mock).mockResolvedValue(
      inventory,
    );

    const result = await handler.execute(
      new DeleteInventoryCommand('inventory-id'),
    );

    expect(result).toEqual(inventory);
    expect(mockRepository.deleteOneInventory).toHaveBeenCalledWith(
      'inventory-id',
    );
  });

  it('should throw NotFoundException when inventory does not exist', async () => {
    (mockRepository.deleteOneInventory as jest.Mock).mockResolvedValue(null);

    await expect(
      handler.execute(new DeleteInventoryCommand('inventory-id')),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepository.deleteOneInventory).toHaveBeenCalledWith(
      'inventory-id',
    );
  });
});
