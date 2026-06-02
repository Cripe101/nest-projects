import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { DeleteProductCommand } from './delete-product.command';
import { ProductEntity } from '../../../domain/entities/product.entity';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<ProductEntity | null> {
    const { id } = command;
    return await this.repository.deleteOneProduct(id);
  }
}
