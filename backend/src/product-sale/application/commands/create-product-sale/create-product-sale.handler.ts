import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from './create-product-sale.command';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';

@CommandHandler(CreateProductSaleCommand)
export class CreateProductSaleHandler implements ICommandHandler<CreateProductSaleCommand> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(
    command: CreateProductSaleCommand,
  ): Promise<{ productId: string; quantity: number }> {
    const productSaleData = {
      productId: command.productId,
      quantity: command.quantity,
    };

    return await this.repository.createProductSale(productSaleData);
  }
}
