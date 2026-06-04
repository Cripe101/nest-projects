import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const product = new ProductEntity(
      command.productName,
      command.productCategory,
      command.buyingPrice,
      command.sellingPrice,
      command.description,
      command.imageUrl,
    );

    return this.repository.create(product);
  }
}
