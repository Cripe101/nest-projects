import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: UpdateProductCommand): Promise<ProductEntity | null> {
    const product: ProductEntity = {
      productName: command.productName,
      productCategory: command.productCategory,
      sellingPrice: command.sellingPrice,
      buyingPrice: command.buyingPrice,
      stock: command.stock,
      description: command.description,
      imageUrl: command.imageUrl,
    };
    return this.repository.updateOneProduct(command._id, product);
  }
}
