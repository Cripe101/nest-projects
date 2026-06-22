import { Test } from '@nestjs/testing';
import { AddInventoryStockHandler } from './add-inventory-stock.handler';
import { AddInventoryStockCommand } from './add-inventory-stock.command';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

describe('AddInventoryStockHandler', () => {
  let handler: AddInventoryStockHandler;

  const mockRepository = {
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
    const command = new AddInventoryStockCommand('inventory-id', 50);

    const inventory = new InventoryEntity(
      'inventory-id',
      'product-id',
      'user-id',
      10,
      150,
    );

    mockRepository.addStock.mockResolvedValue(inventory);

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toBe('Stock added');
    }

    expect(mockRepository.addStock).toHaveBeenCalledTimes(1);
    expect(mockRepository.addStock).toHaveBeenCalledWith('inventory-id', 50);
  });

  it('should return InventoryError.NOT_FOUND when inventory does not exist', async () => {
    const command = new AddInventoryStockCommand('inventory-id', 50);

    mockRepository.addStock.mockResolvedValue(null);

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toBe(InventoryError.NOT_FOUND);
    }

    expect(mockRepository.addStock).toHaveBeenCalledTimes(1);
    expect(mockRepository.addStock).toHaveBeenCalledWith('inventory-id', 50);
  });
});
