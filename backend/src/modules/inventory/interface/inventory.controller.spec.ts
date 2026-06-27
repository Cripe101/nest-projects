import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { ok, err } from '@core/libs/result';
import { InventoryError } from '../domain/errors/inventory.error';

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
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);

    jest.clearAllMocks();
  });

  describe('createInventory', () => {
    it('should create inventory', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('123'));

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

      const result = await controller.createInventory(dto, req as any);

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('123');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException when inventory already exists', async () => {
      mockCommandBus.execute.mockResolvedValue(
        err(InventoryError.DUPLICATE_PRODUCT),
      );

      await expect(
        controller.createInventory(
          {} as any,
          { user: { id: 'user-id' } } as any,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('addStock', () => {
    it('should add stock', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('Stock added'));

      const result = await controller.addStock('123', {
        quantity: 10,
      });

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('Stock added');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when inventory does not exist', async () => {
      mockCommandBus.execute.mockResolvedValue(err(InventoryError.NOT_FOUND));

      await expect(
        controller.addStock('123', {
          quantity: 10,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateInventory', () => {
    it('should update inventory', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('Inventory updated'));

      const dto = {
        productId: 'product-id',
        currentStock: 100,
        minimumStock: 10,
      };

      const req = {
        body: {
          _id: 'user-id',
        },
      };

      const result = await controller.updateInventory('123', dto, req as any);

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('Inventory updated');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when inventory is not found', async () => {
      mockCommandBus.execute.mockResolvedValue(err(InventoryError.NOT_FOUND));

      await expect(
        controller.updateInventory(
          '123',
          {} as any,
          { body: { _id: 'user-id' } } as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteInventory', () => {
    it('should delete inventory', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('Inventory deleted'));

      const result = await controller.deleteInventory('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('Inventory deleted');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when inventory does not exist', async () => {
      mockCommandBus.execute.mockResolvedValue(err(InventoryError.NOT_FOUND));

      await expect(controller.deleteInventory('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllInventory', () => {
    it('should return all inventories', async () => {
      const inventories = [
        {
          _id: '123',
          currentStock: 100,
        },
      ];

      mockQueryBus.execute.mockResolvedValue(ok(inventories));

      const result = await controller.getAllInventory();

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(inventories);
      }

      expect(mockQueryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneInventory', () => {
    it('should return one inventory', async () => {
      const inventory = {
        _id: '123',
        currentStock: 100,
      };

      mockQueryBus.execute.mockResolvedValue(ok(inventory));

      const result = await controller.getOneInventory('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(inventory);
      }

      expect(mockQueryBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when inventory does not exist', async () => {
      mockQueryBus.execute.mockResolvedValue(err(InventoryError.NOT_FOUND));

      await expect(controller.getOneInventory('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
