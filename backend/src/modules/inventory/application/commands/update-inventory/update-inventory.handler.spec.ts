import { Test } from '@nestjs/testing';
import { UpdateInventoryHandler } from './update-inventory.handler';
import { UpdateInventoryCommand } from './update-inventory.command';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';
import { ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

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

    mockRepository.updateOneInventory.mockResolvedValue(ok(updatedInventory));

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
    if (result.isOk()) expect(result.value).toEqual('inventory-id');
    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });

  it('should return InventoryError.NOT_FOUND when inventory does not exist', async () => {
    mockRepository.updateOneInventory.mockResolvedValue(
      err(InventoryError.NOT_FOUND),
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

    expect(result.isErr()).toEqual(true);
    if (result.isErr()) expect(result.error).toEqual(InventoryError.NOT_FOUND);
    expect(mockRepository.updateOneInventory).toHaveBeenCalled();
  });
});
