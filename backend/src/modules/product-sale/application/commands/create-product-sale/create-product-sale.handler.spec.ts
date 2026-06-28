import { Test } from '@nestjs/testing';

import { CreateProductSaleHandler } from './create-product-sale.handler';
import { CreateProductSaleCommand } from './create-product-sale.command';
import { PRODUCT_SALE_REPOSITORY } from '../../ports/product-sale.port';
import { PRODUCT_REPOSITORY } from '@modules/product/application/ports/product.repository.port';
import { INVENTORY_REPOSITORY } from '@modules/inventory/application/ports/inventory.repository.port';
import { ok, err } from '@core/libs/result';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

describe('CreateProductSaleHandler', () => {
  let handler: CreateProductSaleHandler;

  const mockSaleRepository = {
    create: jest.fn(),
  };

  const mockProductRepository = {
    getOneProduct: jest.fn(),
  };

  const mockInventoryRepository = {
    getInventoryByProduct: jest.fn(),
    deductStock: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateProductSaleHandler,
        {
          provide: PRODUCT_SALE_REPOSITORY,
          useValue: mockSaleRepository,
        },
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockProductRepository,
        },
        {
          provide: INVENTORY_REPOSITORY,
          useValue: mockInventoryRepository,
        },
      ],
    }).compile();

    handler = module.get(CreateProductSaleHandler);

    jest.clearAllMocks();
  });

  it('should create a product sale', async () => {
    const product = {
      _id: 'product-id',
      sellingPrice: 50,
      buyingPrice: 30,
    };

    const inventory = {
      _id: 'inventory-id',
      productId: 'product-id',
      currentStock: 10,
    };

    const sale = {
      _id: 'sale-id',
      productId: 'product-id',
      quantity: 2,
      totalPrice: 100,
      profit: 20,
    };

    mockProductRepository.getOneProduct.mockResolvedValue(ok(product));

    mockInventoryRepository.getInventoryByProduct.mockResolvedValue(
      ok(inventory),
    );

    mockInventoryRepository.deductStock.mockResolvedValue(
      err(InventoryError.NOT_FOUND),
    );

    mockSaleRepository.create.mockResolvedValue(ok(sale));

    const result = await handler.execute(
      new CreateProductSaleCommand('product-id', 2, 'cashier-id'),
    );

    expect(result.isOk()).toEqual(true);
    expect(mockProductRepository.getOneProduct).toHaveBeenCalledWith(
      'product-id',
    );
    expect(mockInventoryRepository.getInventoryByProduct).toHaveBeenCalledWith(
      'product-id',
    );
    expect(mockInventoryRepository.deductStock).toHaveBeenCalledWith(
      'inventory-id',
      2,
    );
    expect(mockSaleRepository.create).toHaveBeenCalled();
  });

  it('should return ProductSaleError.PRODUCT_NOT_FOUND when product does not exist', async () => {
    mockProductRepository.getOneProduct.mockResolvedValue(
      err(ProductSaleError.PRODUCT_NOT_FOUND),
    );

    const result = await handler.execute(
      new CreateProductSaleCommand('product-id', 2, 'cashier-id'),
    );

    expect(result.isErr()).toEqual(true);
    expect(mockProductRepository.getOneProduct).toHaveBeenCalled();
    expect(mockSaleRepository.create).not.toHaveBeenCalled();
  });

  it('should return ProductSaleError.INVENTORY_NOT_FOUND when inventory does not exist', async () => {
    mockProductRepository.getOneProduct.mockResolvedValue(
      ok({
        _id: 'product-id',
        sellingPrice: 50,
        buyingPrice: 30,
      }),
    );

    mockInventoryRepository.getInventoryByProduct.mockResolvedValue(
      err(ProductSaleError.INVENTORY_NOT_FOUND),
    );

    const result = await handler.execute(
      new CreateProductSaleCommand('product-id', 2, 'cashier-id'),
    );

    expect(result.isErr()).toEqual(true);
    expect(mockInventoryRepository.getInventoryByProduct).toHaveBeenCalled();
    expect(mockSaleRepository.create).not.toHaveBeenCalled();
  });

  it('should return ProductSaleError.INSUFFICIENT_STOCK when stock is insufficient', async () => {
    mockProductRepository.getOneProduct.mockResolvedValue(
      ok({
        _id: 'product-id',
        sellingPrice: 50,
        buyingPrice: 30,
      }),
    );

    mockInventoryRepository.getInventoryByProduct.mockResolvedValue(
      ok({
        _id: 'inventory-id',
        currentStock: 1,
      }),
    );

    const result = await handler.execute(
      new CreateProductSaleCommand('product-id', 2, 'cashier-id'),
    );

    expect(result.isErr()).toEqual(true);
    expect(mockInventoryRepository.deductStock).not.toHaveBeenCalled();
    expect(mockSaleRepository.create).not.toHaveBeenCalled();
  });
});
