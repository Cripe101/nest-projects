import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductSaleHandler } from './application/commands/create-product-sale/create-product-sale.handler';
import { DeleteProductSaleHandler } from './application/commands/delete-product-sale/delete-product-sale.handler';
import { GetProductSalesHandler } from './application/queries/get-product-sales/get-product-sales.handler';
import { GetProductSaleHandler } from './application/queries/get-product-sale/get-product-sale.handler';
import { GetTotalSaleProfitHandler } from './application/queries/get-total-sale-profit/get-total-sale-profit.handler';
import { GetTotalSaleHandler } from './application/queries/get-total-sale/get-total-sale.handler';
import { ProductModule } from '@modules/product/product.module';
import { InventoryModule } from '@modules/inventory/inventory.module';
import {
  ProductSale,
  ProductSaleSchema,
} from '@core/schemas/product-sale/product-sale.schema';
import { ProductSaleController } from './interface/product-sale.controller';
import { PRODUCT_SALE_REPOSITORY } from './application/ports/product-sale.port';
import { ProductSaleRepository } from './infrastructure/adapters/product-sale.repository';

const commandHandlers = [CreateProductSaleHandler, DeleteProductSaleHandler];
const queryHandlers = [
  GetProductSaleHandler,
  GetProductSalesHandler,
  GetTotalSaleProfitHandler,
  GetTotalSaleHandler,
];

@Module({
  imports: [
    CqrsModule,
    ProductModule,
    InventoryModule,
    MongooseModule.forFeature([
      {
        name: ProductSale.name,
        schema: ProductSaleSchema,
      },
    ]),
  ],
  controllers: [ProductSaleController],
  providers: [
    { provide: PRODUCT_SALE_REPOSITORY, useClass: ProductSaleRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
})
export class ProductSaleModule {}
