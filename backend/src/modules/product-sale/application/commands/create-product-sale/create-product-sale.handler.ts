import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from './create-product-sale.command';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_SALE_REPOSITORY,
  type ProductSaleRepositoryPort,
} from '../../ports/product-sale.port';
import {
  INVENTORY_REPOSITORY,
  type InventoryRepositoryPort,
} from '@modules/inventory/application/ports/inventory.repository.port';
import { Result, ok, err } from '@core/libs/result';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';
import {
  PRODUCT_REPOSITORY,
  type ProductRepositoryPort,
} from '@modules/product/application/ports/product.repository.port';

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

  async execute(
    command: CreateProductSaleCommand,
  ): Promise<Result<string, ProductSaleError>> {
    const { productId, quantity, cashier } = command;

    const inventory = await this.inventoryRepo.getInventoryByProduct(productId);

    const product = await this.productRepo.getOneProduct(productId);

    if (inventory.isErr()) return err(ProductSaleError.INVENTORY_NOT_FOUND);

    if (product.isErr()) return err(ProductSaleError.PRODUCT_NOT_FOUND);

    if (product.value?.sellingPrice === undefined)
      return err(ProductSaleError.PRODUCT_NOT_FOUND);

    if (inventory.value?.currentStock === undefined)
      return err(ProductSaleError.INSUFFECIENT_STOCK);

    if (inventory.value?.currentStock < quantity)
      return err(ProductSaleError.INSUFFECIENT_STOCK);

    const totalPrice = product.value?.sellingPrice * quantity;

    const profit =
      (product.value.sellingPrice - product.value.buyingPrice) * quantity;

    const saleData = new ProductSaleEntity(
      null,
      productId,
      quantity,
      cashier,
      product.value.sellingPrice,
      product.value.buyingPrice,
      totalPrice,
      profit,
    );

    const productSale = await this.repository.create(saleData);

    if (productSale.isErr()) return err(ProductSaleError.INVENTORY_NOT_FOUND);

    await this.inventoryRepo.deductStock(
      inventory.value?._id as string,
      quantity,
    );

    return ok(productSale.value?._id as string);
  }
}
