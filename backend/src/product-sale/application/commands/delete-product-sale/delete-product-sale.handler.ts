import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductSaleCommand } from './delete-product-sale.command';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';

@CommandHandler(DeleteProductSaleCommand)
export class DeleteProductSaleHandler implements ICommandHandler<DeleteProductSaleCommand> {
  constructor(private readonly respository: ProductSaleRepository) {}

  async execute(command: DeleteProductSaleCommand): Promise<ProductSaleEntity> {
    const { _id } = command;
    return this.respository.deleteOneProductSale(_id);
  }
}
