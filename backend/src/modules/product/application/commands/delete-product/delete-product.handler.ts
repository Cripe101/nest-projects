import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '../../ports/product.repository.port';
import { Result, err, ok } from '@core/libs/result';
import { ProductError } from '@modules/product/domain/errors/product.error';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly repository: ProductRepositoryPort,
  ) {}

  async execute(
    command: DeleteProductCommand,
  ): Promise<Result<string, ProductError>> {
    const { id } = command;

    const product = await this.repository.deleteOneProduct(id);

    if (!product) {
      return err(ProductError.NOT_FOUND);
    }

    return ok(product?._id as string);
  }
}
