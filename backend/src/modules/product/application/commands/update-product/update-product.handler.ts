import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(command: UpdateProductCommand): Promise<ProductEntity | null> {
    const {
      productCategory,
      productName,
      buyingPrice,
      sellingPrice,
      imageUrl,
      _id,
      addedBy,
      description,
    } = command;

    const updatedProduct = new ProductEntity(
      _id,
      productName,
      productCategory,
      addedBy,
      sellingPrice,
      buyingPrice,
      imageUrl,
      description,
    );

    const product = await this.repository.updateOneProduct(_id, updatedProduct);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
