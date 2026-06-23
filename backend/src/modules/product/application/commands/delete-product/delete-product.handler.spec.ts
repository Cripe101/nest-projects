import { Test } from '@nestjs/testing';
import { DeleteProductHandler } from './delete-product.handler';
import { DeleteProductCommand } from './delete-product.command';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductError } from '@modules/product/domain/errors/product.error';

describe('DeleteProductHandler', () => {
  let handler: DeleteProductHandler;

  const mockRepository = {
    deleteOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteProductHandler,
        {
          provide: PRODUCT_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    handler = module.get(DeleteProductHandler);

    jest.clearAllMocks();
  });

  it('should delete a product', async () => {
    const command = new DeleteProductCommand('123');

    const deletedProduct = new ProductEntity(
      '123',
      'Coke',
      'Drinks',
      'user-id',
      20,
      25,
      'Softdrink',
      'image.jpg',
    );

    mockRepository.deleteOneProduct.mockResolvedValue(deletedProduct);

    const result = await handler.execute(command);

    expect(result.isOk()).toBe(true);

    if (result.isOk()) {
      expect(result.value).toEqual(deletedProduct._id);
    }

    expect(mockRepository.deleteOneProduct).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteOneProduct).toHaveBeenCalledWith('123');
  });

  it('should return ProductError.NOT_FOUND when product does not exist', async () => {
    const command = new DeleteProductCommand('123');

    mockRepository.deleteOneProduct.mockResolvedValue(null);

    const result = await handler.execute(command);

    expect(result.isErr()).toBe(true);

    if (result.isErr()) {
      expect(result.error).toEqual(ProductError.NOT_FOUND);
    }

    expect(mockRepository.deleteOneProduct).toHaveBeenCalledTimes(1);
    expect(mockRepository.deleteOneProduct).toHaveBeenCalledWith('123');
  });
});
