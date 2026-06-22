import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ok, err } from '@core/interfaces/result';

describe('ProductController', () => {
  let controller: ProductController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ProductController],
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

    controller = module.get<ProductController>(ProductController);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = {
        productName: 'Coke',
        productCategory: 'Drinks',
        buyingPrice: 20,
        sellingPrice: 25,
        description: 'Softdrink',
        imageUrl: 'image.jpg',
      };

      const req = {
        user: {
          id: 'user-id',
        },
      };

      const createdProduct = {
        _id: '123',
        ...dto,
      };

      mockCommandBus.execute.mockResolvedValue(ok(createdProduct));

      const result = await controller.create(dto as any, req as any);

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual('123');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [
        {
          _id: '123',
          productName: 'Coke',
        },
      ];

      mockQueryBus.execute.mockResolvedValue(ok(products));

      const result = await controller.getAllProducts();

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(products);
      }

      expect(mockQueryBus.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('getOneProduct', () => {
    it('should return one product', async () => {
      const product = {
        _id: '123',
        productName: 'Coke',
      };

      mockQueryBus.execute.mockResolvedValue(ok(product));

      const result = await controller.getOneProduct('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual(product);
      }

      expect(mockQueryBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockQueryBus.execute.mockResolvedValue(err('Product not found'));

      await expect(controller.getOneProduct('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateOneProduct', () => {
    it('should update a product', async () => {
      const dto = {
        productName: 'Coke Zero',
        productCategory: 'Drinks',
        buyingPrice: 22,
        sellingPrice: 28,
        description: 'Updated Softdrink',
        imageUrl: 'updated-image.jpg',
      };

      const req = {
        user: {
          id: 'user-id',
        },
      };

      const updatedProduct = {
        _id: '123',
        ...dto,
      };

      mockCommandBus.execute.mockResolvedValue(ok(updatedProduct));

      const result = await controller.updateOneProduct(
        '123',
        dto as any,
        req as any,
      );

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual('123');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockCommandBus.execute.mockResolvedValue(err('Product not found'));

      await expect(
        controller.updateOneProduct(
          '123',
          {} as any,
          { user: { id: 'user-id' } } as any,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteOneProduct', () => {
    it('should delete a product', async () => {
      const deletedProduct = {
        _id: '123',
      };

      mockCommandBus.execute.mockResolvedValue(ok(deletedProduct));

      const result = await controller.deleteOneProduct('123');

      expect(result.isOk()).toBe(true);

      if (result.isOk()) {
        expect(result.value).toEqual('123');
      }

      expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when product does not exist', async () => {
      mockCommandBus.execute.mockResolvedValue(err('Product not found'));

      await expect(controller.deleteOneProduct('123')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
