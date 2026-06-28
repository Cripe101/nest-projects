import { Test } from '@nestjs/testing';
import { DeleteInventoryHandler } from './delete-inventory.handler';
import { DeleteInventoryCommand } from './delete-inventory.command';
import { INVENTORY_REPOSITORY } from '../../ports/inventory.repository.port';
import { ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

describe('DeleteInventoryHandler', () => {
  let handler: DeleteInventoryHandler;

  const mockRepository = {
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

    mockRepository.deleteOneInventory.mockResolvedValue(ok(inventory));

    const result = await handler.execute(
      new DeleteInventoryCommand('inventory-id'),
    );

    expect(result.isOk()).toEqual(true);
    if (result.isOk()) expect(result.value).toEqual('inventory-id');
    expect(mockRepository.deleteOneInventory).toHaveBeenCalledWith(
      'inventory-id',
    );
  });

  it('should return InventoryError.NOT_FOUND when inventory does not exist', async () => {
    mockRepository.deleteOneInventory.mockResolvedValue(
      err(InventoryError.NOT_FOUND),
    );

    const result = await handler.execute(new DeleteInventoryCommand(''));

    expect(result.isErr()).toEqual(true);
    if (result.isErr()) expect(result.error).toEqual(InventoryError.NOT_FOUND);
    expect(mockRepository.deleteOneInventory).toHaveBeenCalled();
  });
});
