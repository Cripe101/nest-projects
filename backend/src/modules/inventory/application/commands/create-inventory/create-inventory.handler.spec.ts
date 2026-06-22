import { Test } from '@nestjs/testing';
import { CreateInventoryCommand } from './create-inventory.command';
import {
  INVENTORY_REPOSITORY,
  InventoryRepositoryPort,
} from '../../ports/inventory.repository.port';
import { InventoryEntity } from '../../../domain/entities/inventory.entity';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';
import { CreateInventoryHandler } from './create-inventory.handlers';

describe('CreateInventoryHandler', () => {
  let handler: CreateInventoryHandler;

  const mockRepository = {
    getInventoryByProduct: jest.fn(),
    create: jest.fn(),
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
    const command = new CreateInventoryCommand(
      'product-id',
      'user-id',
      100,
      10,
    );

    mockRepository.getInventoryByProduct.mockResolvedValue(null);

    const createdInventory = new InventoryEntity(
      '123',
      'product-id',
      'user-id',
      10,
      100,
    );

    mockRepository.create.mockResolvedValue(createdInventory);

    const result = await handler.execute(command);

    expect(result.isOk()).toEqual(true);

    if (result.isOk()) {
      expect(result.value).toEqual('123');
    }

    expect(mockRepository.getInventoryByProduct).toHaveBeenCalledWith(
      'product-id',
    );

    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        productId: 'product-id',
        createdBy: 'user-id',
        minimumStock: 10,
        currentStock: 100,
      }),
    );
  });

  it('should return DUPLICATE_PRODUCT when inventory already exists', async () => {
    const command = new CreateInventoryCommand(
      'product-id',
      'user-id',
      100,
      10,
    );

    const existingInventory = new InventoryEntity(
      '456',
      'product-id',
      'user-id',
      10,
      100,
    );

    mockRepository.getInventoryByProduct.mockResolvedValue(existingInventory);

    const result = await handler.execute(command);

    expect(result.isErr()).toEqual(true);

    if (result.isErr()) {
      expect(result.error).toEqual(InventoryError.DUPLICATE_PRODUCT);
    }

    expect(mockRepository.create).not.toHaveBeenCalled();
  });
});
