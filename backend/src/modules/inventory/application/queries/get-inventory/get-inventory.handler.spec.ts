import { Test } from '@nestjs/testing';

import { GetInventoryHandler } from './get-inventory.handler';
import { GetInventoryQuery } from './get-inventory.query';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';
import { ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

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

    mockRepository.getOneInventory.mockResolvedValue(ok(inventory));

    const result = await handler.execute(new GetInventoryQuery('inventory-id'));

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) expect(result.value).toEqual(inventory);
    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });

  it('should return InventoryError.NOT_FOUND when inventory does not exist', async () => {
    mockRepository.getOneInventory.mockResolvedValue(
      err(InventoryError.NOT_FOUND),
    );

    const result = await handler.execute(new GetInventoryQuery('inventory-id'));

    expect(result.isErr()).toEqual(true);
    if (result.isErr()) expect(result.error).toEqual(InventoryError.NOT_FOUND);
    expect(mockRepository.getOneInventory).toHaveBeenCalledWith('inventory-id');
  });
});
