import { Test } from '@nestjs/testing';
import { CreateProductHandler } from './create-product.handler';
import { CreateProductCommand } from './create-product.command';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { ok } from '@core/libs/result';

describe('CreateProductHandler', () => {
  let handler: CreateProductHandler;

  const mockRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(CreateProductHandler);

    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const command = new CreateProductCommand(
      'Coke',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink',
      'image.jpg',
    );

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

    mockRepository.create.mockResolvedValue(ok(product));

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toEqual(product._id);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
  });
});
