import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(command: DeleteProductCommand): Promise<ProductEntity | null> {
    const { id } = command;

    const product = await this.repository.deleteOneProduct(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
