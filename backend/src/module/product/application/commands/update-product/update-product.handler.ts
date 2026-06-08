import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly repository: ProductRepository) {}

  async execute(command: UpdateProductCommand): Promise<ProductEntity | null> {
    const updatedProduct = new ProductEntity(
      command.productName,
      command.productCategory,
      command.sellingPrice,
      command.buyingPrice,
      command.description,
      command.imageUrl,
    );

    const product = await this.repository.updateOneProduct(
      command._id,
      updatedProduct,
    );

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
