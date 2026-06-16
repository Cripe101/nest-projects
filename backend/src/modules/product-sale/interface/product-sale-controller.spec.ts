import { Test } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductSaleController } from './product-sale.controller';

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
        { provide: CommandBus, useValue: mockCommandBus },
        { provide: QueryBus, useValue: mockQueryBus },
      ],
    }).compile();

    controller = module.get(ProductSaleController);

    jest.clearAllMocks();
  });

  it('should create a product sale', async () => {
    const dto = {
      productId: 'product-id',
      quantity: 5,
    };

    const req = {
      user: {
        id: 'user-id',
      },
    };

    const createdSale = {
      _id: 'sale-id',
      productId: dto.productId,
      quantity: dto.quantity,
      soldBy: req.user.id,
    };

    mockCommandBus.execute.mockResolvedValue(createdSale);

    const result = await controller.create(dto, req as any);

    expect(result).toEqual(createdSale);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });

  it('should return total sale profit', async () => {
    const totalProfit = 1500;

    mockQueryBus.execute.mockResolvedValue(totalProfit);

    const result = await controller.getTotalSaleProfit();

    expect(result).toEqual(totalProfit);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return total sales', async () => {
    const totalSales = 5000;

    mockQueryBus.execute.mockResolvedValue(totalSales);

    const result = await controller.getTotalSalet();

    expect(result).toEqual(totalSales);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return all product sales', async () => {
    const sales = [
      {
        _id: 'sale-id',
        productId: 'product-id',
        quantity: 5,
      },
    ];

    mockQueryBus.execute.mockResolvedValue(sales);

    const result = await controller.getAllProductSales();

    expect(result).toEqual(sales);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should return a product sale by id', async () => {
    const sale = {
      _id: 'sale-id',
      productId: 'product-id',
      quantity: 5,
    };

    mockQueryBus.execute.mockResolvedValue(sale);

    const result = await controller.getOneProductSale('sale-id');

    expect(result).toEqual(sale);
    expect(mockQueryBus.execute).toHaveBeenCalled();
  });

  it('should delete a product sale', async () => {
    const deletedSale = {
      _id: 'sale-id',
      productId: 'product-id',
      quantity: 5,
    };

    mockCommandBus.execute.mockResolvedValue(deletedSale);

    const result = await controller.deleteOneProductSale('sale-id');

    expect(result).toEqual(deletedSale);
    expect(mockCommandBus.execute).toHaveBeenCalled();
  });
});
