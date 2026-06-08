import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from './create-product-sale.command';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';
import { ProductRepository } from '../../../../product/domain/repositories/product.repository';
import {
  BadRequestException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InventoryRepositpory } from '../../../../inventory/domain/repositories/inventory.repository';

@CommandHandler(CreateProductSaleCommand)
export class CreateProductSaleHandler implements ICommandHandler<CreateProductSaleCommand> {
  constructor(
    private readonly repository: ProductSaleRepository,
    private readonly productRepo: ProductRepository,
    private readonly inventoryRepo: InventoryRepositpory,
  ) {}

  async execute(command: CreateProductSaleCommand): Promise<ProductSaleEntity> {
    const { productId, quantity } = command;

    const product = await this.productRepo.getOneProduct(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const inventory = await this.inventoryRepo.getInventoryByProduct(productId);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    const totalPrice = product.sellingPrice * quantity;
    const profit = product.sellingPrice - product.buyingPrice;

    const saleData = new ProductSaleEntity(
      productId,
      quantity,
      product.sellingPrice,
      product.buyingPrice,
      totalPrice,
      profit,
    );

    const updateStock = await this.inventoryRepo.deductStock(
      inventory._id as string,
      quantity,
    );

    if (!updateStock) {
      throw new BadRequestException('Insuffecient stock');
    }

    return await this.repository.create(saleData);
  }
}
