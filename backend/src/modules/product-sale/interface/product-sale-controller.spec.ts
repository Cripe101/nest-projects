import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductSaleController } from './product-sale.controller';
import { ok, err } from '@core/interfaces/result';
import { ProductSaleError } from '../domain/errors/product-sale.error';

describe('ProductSaleController', () => {
  let controller: ProductSaleController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductSaleController],
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

    controller = module.get<ProductSaleController>(ProductSaleController);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product sale', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('sale-id'));

      const dto = {
        productId: 'product-id',
        quantity: 2,
      };

      const req = {
        user: {
          id: 'user-id',
        },
      };

      const result = await controller.create(dto as any, req as any);

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('sale-id');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw BadRequestException when stock is insufficient', async () => {
      mockCommandBus.execute.mockResolvedValue(
        err(ProductSaleError.INSUFFECIENT_STOCK),
      );

      await expect(
        controller.create(
          {
            productId: 'product-id',
            quantity: 2,
          } as any,
          {
            user: {
              id: 'user-id',
            },
          } as any,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException when product is not found', async () => {
      mockCommandBus.execute.mockResolvedValue(err(ProductSaleError.NOT_FOUND));

      await expect(
        controller.create(
          {
            productId: 'product-id',
            quantity: 2,
          } as any,
          {
            user: {
              id: 'user-id',
            },
          } as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getTotalSaleProfit', () => {
    it('should return total sale profit', async () => {
      mockQueryBus.execute.mockResolvedValue(ok(1000));

      const result = await controller.getTotalSaleProfit();

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe(1000);
      }
    });
  });

  describe('getTotalSalet', () => {
    it('should return total sale', async () => {
      mockQueryBus.execute.mockResolvedValue(ok(5000));

      const result = await controller.getTotalSalet();

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe(5000);
      }
    });
  });

  describe('getAllProductSales', () => {
    it('should return all product sales', async () => {
      const sales = [
        {
          _id: '123',
        },
      ];

      mockQueryBus.execute.mockResolvedValue(ok(sales));

      const result = await controller.getAllProductSales();

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(sales);
      }
    });
  });

  describe('getOneProductSale', () => {
    it('should return one product sale', async () => {
      const sale = {
        _id: '123',
      };

      mockQueryBus.execute.mockResolvedValue(ok(sale));

      const result = await controller.getOneProductSale('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(sale);
      }
    });

    it('should throw NotFoundException', async () => {
      mockQueryBus.execute.mockResolvedValue(err(ProductSaleError.NOT_FOUND));

      await expect(controller.getOneProductSale('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteOneProductSale', () => {
    it('should delete a product sale', async () => {
      mockCommandBus.execute.mockResolvedValue(ok('deleted'));

      const result = await controller.deleteOneProductSale('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toBe('deleted');
      }
    });

    it('should throw NotFoundException', async () => {
      mockCommandBus.execute.mockResolvedValue(err(ProductSaleError.NOT_FOUND));

      await expect(controller.deleteOneProductSale('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
