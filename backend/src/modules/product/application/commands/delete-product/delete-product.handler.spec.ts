import { Test } from '@nestjs/testing';
import { DeleteProductHandler } from './delete-product.handler';
import { DeleteProductCommand } from './delete-product.command';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { PRODUCT_REPOSITORY } from '../../ports/product.repository.port';

describe('DeleteProductHandler', () => {
  let handler: DeleteProductHandler;

  const mockRepository = {
    deleteOneProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DeleteProductHandler,
        { provide: PRODUCT_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    handler = module.get(DeleteProductHandler);

    jest.clearAllMocks();
  });

  it('should throw an NotFoundException when no product found', async () => {
    mockRepository.deleteOneProduct.mockResolvedValue(null);

    await expect(
      handler.execute(new DeleteProductCommand('6a226ef26b64a0e432214543')),
    ).rejects.toThrow(NotFoundException);

    expect(mockRepository.deleteOneProduct).toHaveBeenCalledWith(
      '6a226ef26b64a0e432214543',
    );
  });

  it('should delete a product', async () => {
    const product = {
      _id: '123',
      productName: 'Biscuit',
    };
    mockRepository.deleteOneProduct.mockResolvedValue(product);

    const result = await handler.execute(
      new DeleteProductCommand('6a226ef26b64a0e432214543'),
    );

    expect(result).toEqual(product);

    expect(mockRepository.deleteOneProduct).toHaveBeenCalledWith(
      '6a226ef26b64a0e432214543',
    );
  });
});
