import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { AddInventoryStockHandler } from './add-inventory-stock.handler';
import { AddInventoryStockCommand } from './add-inventory-stock.command';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';

describe('AddInventoryStockHandler', () => {
  let handler: AddInventoryStockHandler;

  const mockRepository: Partial<InventoryRepositoryPort> = {
    addStock: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AddInventoryStockHandler,
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(AddInventoryStockHandler);

    jest.clearAllMocks();
  });

  it('should add stock to inventory', async () => {
    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 150,
      minimumStock: 10,
    };

    (mockRepository.addStock as jest.Mock).mockResolvedValue(inventory);

    const result = await handler.execute(
      new AddInventoryStockCommand('inventory-id', 50),
    );

    expect(result).toEqual(inventory);
    expect(mockRepository.addStock).toHaveBeenCalledWith('inventory-id', 50);
  });

  it('should throw NotFoundException when inventory does not exist', async () => {
    (mockRepository.addStock as jest.Mock).mockResolvedValue(null);

    await expect(
      handler.execute(new AddInventoryStockCommand('inventory-id', 50)),
    ).rejects.toThrow(NotFoundException);
    expect(mockRepository.addStock).toHaveBeenCalledWith('inventory-id', 50);
  });
});
