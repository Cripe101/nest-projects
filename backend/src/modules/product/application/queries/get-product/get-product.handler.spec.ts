import { Test } from '@nestjs/testing';
import { GetProductHandler } from './get-product.handler';
import { GetProductQuery } from './get-product.query';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { ProductError } from '@modules/product/domain/errors/product.error';

describe('GetProductHandler', () => {
  let handler: GetProductHandler;

  const mockRepository = {
    getOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetProductHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(GetProductHandler);

    jest.clearAllMocks();
  });

  it('should return a product', async () => {
    const query = new GetProductQuery('123');

    const product = new ProductEntity(
      '123',
      'Coke',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink',
      'image.jpg',
    );

    mockRepository.getOneProduct.mockResolvedValue(product);

    const result = await handler.execute(query);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) {
      expect(result.value).toEqual(product);
    }
    expect(mockRepository.getOneProduct).toHaveBeenCalledTimes(1);
  });

  it('should return ProductError.NOT_FOUND when product does not exist', async () => {
    const query = new GetProductQuery('123');

    mockRepository.getOneProduct.mockResolvedValue(null);

    const result = await handler.execute(query);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) {
      expect(result.error).toEqual(ProductError.NOT_FOUND);
    }
    expect(mockRepository.getOneProduct).toHaveBeenCalledTimes(1);
  });
});
