import { Test } from '@nestjs/testing';
import { CreateProductHandler } from './create-product.handler';
import { CreateProductCommand } from './create-product.command';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

describe('CreateProductHandler', () => {
  let handler: CreateProductHandler;

  const mockRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateProductHandler,
        { provide: PRODUCT_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    handler = module.get(CreateProductHandler);

    jest.clearAllMocks();
  });

  it('should create a product', async () => {
    const product = new ProductEntity(
      null,
      'Biscuit',
      'Snack',
      '6a226ef26b64a0e432214543',
      8,
      10,
      'sample',
    );
    mockRepository.create.mockResolvedValue(product);

    const result = await handler.execute(
      new CreateProductCommand(
        'Biscuit',
        'Snack',
        '6a226ef26b64a0e432214543',
        8,
        10,
        'sample',
      ),
    );

    expect(result).toEqual(product);
    expect(mockRepository.create).toHaveBeenCalled();
  });
});
