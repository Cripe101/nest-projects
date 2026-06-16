import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<ProductEntity> {
    const product = new ProductEntity(
      null,
      command.productName,
      command.productCategory,
      command.addedBy,
      command.buyingPrice,
      command.sellingPrice,
      command.description,
      command.imageUrl,
    );

    return this.repository.create(product);
  }
}
