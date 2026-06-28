import { Test } from '@nestjs/testing';
import { UpdateProductHandler } from './update-product.handler';
import { UpdateProductCommand } from './update-product.command';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { ProductError } from '@modules/product/domain/errors/product.error';
import { ok, err } from '@core/libs/result';

describe('UpdateProductHandler', () => {
  let handler: UpdateProductHandler;

  const mockRepository = {
    updateOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateProductHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(UpdateProductHandler);

    jest.clearAllMocks();
  });

  it('should update a product', async () => {
    const command = new UpdateProductCommand(
      '123',
      'Coke Zero',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink Zero',
      'image.jpg',
    );

    const updatedProduct = new ProductEntity(
      '123',
      'Coke Zero',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink Zero',
      'image.jpg',
    );

    mockRepository.updateOneProduct.mockResolvedValue(ok(updatedProduct));

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value).toEqual(updatedProduct._id);
    expect(mockRepository.updateOneProduct).toHaveBeenCalledTimes(1);
  });

  it('should return ProductError.NOT_FOUND when product does not exist', async () => {
    const command = new UpdateProductCommand(
      '123',
      'Coke Zero',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink Zero',
      'image.jpg',
    );

    mockRepository.updateOneProduct.mockResolvedValue(
      err(ProductError.NOT_FOUND),
    );

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error).toEqual(ProductError.NOT_FOUND);
    expect(mockRepository.updateOneProduct).toHaveBeenCalledTimes(1);
  });
});
