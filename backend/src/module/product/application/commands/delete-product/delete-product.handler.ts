import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { DeleteProductCommand } from './delete-product.command';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<ProductEntity | null> {
    const { id } = command;

    const product = await this.repository.deleteOneProduct(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
