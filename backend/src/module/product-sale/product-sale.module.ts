import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoProductSaleRepository } from './infastracture/persistance/mongo-product-sale.repository';
import { ProductSaleRepository } from './domain/repositories/product-sale.repository';
import { ProductSaleController } from './presentation/product-sale.controller';
import { CreateProductSaleHandler } from './application/commands/create-product-sale/create-product-sale.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteProductSaleHandler } from './application/commands/delete-product-sale/delete-product-sale.handler';
import { ProductSaleEntity } from './domain/entities/product-sale.entity';
import { GetProductSaleHandler } from './application/queries/get-product-sale/get-product-sale.handler';
import { GetProductSalesHandler } from './application/queries/get-product-sales/get-product-sales.handler';
import { GetTotalSaleProfitHandler } from './application/queries/get-total-sale-profit/get-total-sale-profit.handler';
import { ProductSaleSchema } from '../../core/schemas/product-sale/product-sale.schema';
import { InventoryModule } from '../inventory/inventory.module';
import { ProductModule } from '../product/product.module';
import { GetTotalSaleHandler } from './application/queries/get-total-sale/get-total-sale.handler';

const commandHandler = [CreateProductSaleHandler, DeleteProductSaleHandler];
const queryHandler = [
  GetProductSaleHandler,
  GetProductSalesHandler,
  GetTotalSaleProfitHandler,
  GetTotalSaleHandler,
];

@Module({
  imports: [
    ProductModule,
    InventoryModule,
    MongooseModule.forFeature([
      {
        name: ProductSaleEntity.name,
        schema: ProductSaleSchema,
      },
    ]),
    CqrsModule,
  ],
  controllers: [ProductSaleController],
  providers: [
    ...commandHandler,
    ...queryHandler,
    { provide: ProductSaleRepository, useClass: MongoProductSaleRepository },
  ],
})
export class ProductSaleModule {}
