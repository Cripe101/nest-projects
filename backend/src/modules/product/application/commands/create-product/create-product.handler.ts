import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { CreateProductCommand } from './create-product.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Result, ok } from '@core/libs/result';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(command: CreateProductCommand): Promise<Result<string, null>> {
    const createdProduct = new ProductEntity(
      null,
      command.productName,
      command.productCategory,
      command.addedBy,
      command.buyingPrice,
      command.sellingPrice,
      command.description,
      command.imageUrl,
    );

    const product = await this.repository.create(createdProduct);

    return ok(product?._id as string);
  }
}
