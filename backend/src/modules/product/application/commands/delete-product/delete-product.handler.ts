import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from './delete-product.command';
import { Inject } from '@nestjs/common';
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

    const result = await this.repository.deleteOneProduct(id);

    if (result.isErr()) return err(result.error);

    return ok(result.value?._id as string);
  }
}
