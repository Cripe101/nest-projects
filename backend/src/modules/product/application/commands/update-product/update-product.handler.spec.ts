import { Test } from '@nestjs/testing';
import { UpdateProductHandler } from './update-product.handler';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductCommand } from './update-product.command';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';

describe('UpdateProductHandler', () => {
  let handler: UpdateProductHandler;

  const mockRepository = {
    updateOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateProductHandler,
        { provide: PRODUCT_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    handler = module.get(UpdateProductHandler);

    jest.clearAllMocks();
  });

  it('should throw an NotFoundException when no product is found', async () => {
    mockRepository.updateOneProduct.mockResolvedValue(null);

    await expect(
      handler.execute(
        new UpdateProductCommand(
          '6a226ef26b64a0e432214543',
          'Biscuit',
          'Snack',
          'userId01',
          8,
          10,
          'sample',
        ),
      ),
    ).rejects.toThrow(NotFoundException);

    expect(mockRepository.updateOneProduct).toHaveBeenCalled();
  });

  it('should update one product', async () => {
    const product = {
      _id: '6a226ef26b64a0e432214543',
      productName: 'Biscuit',
      productCategory: 'Snack',
      addedBy: 'userId01',
      buyingPrice: 8,
      sellingPrice: 10,
      imageUrl: 'sample',
    };

    mockRepository.updateOneProduct.mockResolvedValue(product);

    const result = await handler.execute(
      new UpdateProductCommand(
        '6a226ef26b64a0e432214543',
        'Biscuit',
        'Snack',
        'userId01',
        8,
        10,
        'sample',
      ),
    );

    expect(result).toEqual(product);

    expect(mockRepository.updateOneProduct).toHaveBeenCalled();
  });
});
