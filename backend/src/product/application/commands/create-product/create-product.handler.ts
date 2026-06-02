import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const productData: ProductEntity = {
      productName: command.productName,
      productCategory: command.productCategory,
      buyingPrice: command.buyingPrice,
      sellingPrice: command.sellingPrice,
      stock: command.stock,
      description: command.description,
      imageUrl: command.imageUrl,
    };
    return this.repository.createProduct(productData);
  }
}
