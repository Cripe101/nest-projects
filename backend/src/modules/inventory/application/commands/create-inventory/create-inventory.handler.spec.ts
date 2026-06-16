import { Test } from '@nestjs/testing';
import { NotAcceptableException } from '@nestjs/common';

import { CreateInventoryCommand } from './create-inventory.command';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { CreateInventoryHandler } from './create-inventory.handlers';

describe('CreateInventoryHandler', () => {
  let handler: CreateInventoryHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
    create: jest.fn(),
    getInventoryByProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateInventoryHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(CreateInventoryHandler);

    jest.clearAllMocks();
  });

  it('should create an inventory', async () => {
    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      createdBy: 'user-id',
      currentStock: 100,
      minimumStock: 10,
    };

    (mockRepository.getInventoryByProduct as jest.Mock).mockResolvedValue(null);

    (mockRepository.create as jest.Mock).mockResolvedValue(inventory);

    const result = await handler.execute(
      new CreateInventoryCommand('product-id', 'user-id', 100, 10),
    );

    expect(result).toEqual(inventory);

    expect(mockRepository.getInventoryByProduct).toHaveBeenCalledWith(
      'product-id',
    );

    expect(mockRepository.create).toHaveBeenCalled();
  });

  it('should throw when inventory already exists', async () => {
    (mockRepository.getInventoryByProduct as jest.Mock).mockResolvedValue({
      _id: 'existing-inventory',
    });

    await expect(
      handler.execute(
        new CreateInventoryCommand('product-id', 'user-id', 100, 10),
      ),
    ).rejects.toThrow(NotAcceptableException);

    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
