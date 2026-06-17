import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InventoryController } from './inventory.controller';

describe('InventoryController', () => {
  let controller: InventoryController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    controller = module.get(InventoryController);

    jest.clearAllMocks();
  });

  it('should create an inventory', async () => {
    const dto = {
      productId: 'product-id',
      currentStock: 100,
      minimumStock: 10,
    };

    const req = {
      user: {
        id: 'user-id',
      },
    };

    const inventory = {
      _id: 'inventory-id',
      ...dto,
      addedBy: req.user.id,
    };

    mockCommandBus.execute.mockResolvedValue(inventory);

    const result = await controller.createInventory(dto, req as any);

    expect(result).toEqual(inventory);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should add stock to inventory', async () => {
    const dto = {
      quantity: 50,
    };

    const inventory = {
      _id: 'inventory-id',
      currentStock: 150,
    };

    mockCommandBus.execute.mockResolvedValue(inventory);

    const result = await controller.addStock('inventory-id', dto);

    expect(result).toEqual(inventory);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should update inventory', async () => {
    const dto = {
      productId: 'product-id',
      currentStock: 200,
      minimumStock: 20,
    };

    const req = {
      body: {
        _id: 'user-id',
      },
    };

    const updatedInventory = {
      _id: 'inventory-id',
      ...dto,
    };

    mockCommandBus.execute.mockResolvedValue(updatedInventory);

    const result = await controller.updateInventory(
      'inventory-id',
      dto,
      req as any,
    );

    expect(result).toEqual(updatedInventory);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should delete inventory', async () => {
    const deletedInventory = {
      _id: 'inventory-id',
      productId: 'product-id',
    };

    mockCommandBus.execute.mockResolvedValue(deletedInventory);

    const result = await controller.deleteInventory('inventory-id');

    expect(result).toEqual(deletedInventory);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should return all inventories', async () => {
    const inventories = [
      {
        _id: 'inventory-id',
        productId: 'product-id',
        currentStock: 100,
      },
    ];

    mockQueryBus.execute.mockResolvedValue(inventories);

    const result = await controller.getAllInventory();

    expect(result).toEqual(inventories);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return one inventory', async () => {
    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 100,
    };

    mockQueryBus.execute.mockResolvedValue(inventory);

    const result = await controller.getOneInventory('inventory-id');

    expect(result).toEqual(inventory);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });
});
