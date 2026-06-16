import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from './create-product-sale.command';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '@modules/product/application/ports/product.repository.port';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '@modules/inventory/application/ports/inventory.repository.port';

@CommandHandler(CreateProductSaleCommand)
export class CreateProductSaleHandler implements ICommandHandler<CreateProductSaleCommand> {
  constructor(
    @Inject(PRODUCT_SALE_REPOSITORY)
    private readonly repository: ProductSaleRepositoryPort,

    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepositoryPort,

    @Inject(INVENTORY_REPOSITORY)
    private readonly inventoryRepo: InventoryRepositoryPort,
  ) {}

  async execute(command: CreateProductSaleCommand): Promise<ProductSaleEntity> {
    const { productId, quantity, cashier } = command;

    const product = await this.productRepo.getOneProduct(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const inventory = await this.inventoryRepo.getInventoryByProduct(productId);

    if (!inventory) {
      throw new NotFoundException('Product not found in inventory');
    }

    if (inventory.currentStock < quantity) {
      throw new BadRequestException('Insuffecient stock');
    }

    const totalPrice = product.sellingPrice * quantity;
    const profit = product.sellingPrice - product.buyingPrice;

    const saleData = new ProductSaleEntity(
      null,
      productId,
      quantity,
      cashier,
      product.sellingPrice,
      product.buyingPrice,
      totalPrice,
      profit,
    );

    await this.inventoryRepo.deductStock(inventory._id as string, quantity);

    return await this.repository.create(saleData);
  }
}
