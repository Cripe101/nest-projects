import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductController } from './product.controller';

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
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    controller = module.get(ProductController);

    jest.clearAllMocks();
  });

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
      addedBy: 'user-id',
    };

    mockCommandBus.execute.mockResolvedValue(createdProduct);

    const result = await controller.create(dto, req as any);

    expect(result).toEqual(createdProduct);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

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
      updatedBy: 'user-id',
    };

    mockCommandBus.execute.mockResolvedValue(updatedProduct);

    const result = await controller.updateOneProduct('123', dto, req as any);

    expect(result).toEqual(updatedProduct);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should delete a product', async () => {
    const deletedProduct = {
      _id: '123',
      productName: 'Coke',
    };

    mockCommandBus.execute.mockResolvedValue(deletedProduct);

    const result = await controller.deleteOneProduct('123');

    expect(result).toEqual(deletedProduct);

    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should return all products', async () => {
    const products = [
      {
        _id: '123',
        productName: 'Coke',
      },
    ];

    mockQueryBus.execute.mockResolvedValue(products);

    const result = await controller.getAllProducts();

    expect(result).toEqual(products);

    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return one product', async () => {
    const product = {
      _id: '123',
      productName: 'Coke',
    };

    mockQueryBus.execute.mockResolvedValue(product);

    const result = await controller.getOneProduct('123');

    expect(result).toEqual(product);

    expect(mockQueryBus.execute).toHaveBeenCalled();
  });
});
