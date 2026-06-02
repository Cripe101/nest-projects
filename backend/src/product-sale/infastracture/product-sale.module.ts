import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSaleSchema } from '../../schemas/product/product-sale.schema';
import { ProductSchema } from '../../schemas/product/product.schema';
import { MongoProductSaleRepository } from './persistance/mongo-product-sale.repository';
import { ProductSaleRepository } from '../domain/repositories/product-sale.repository';
import { ProductSaleController } from '../presentation/product-sale.controller';
import { CreateProductSaleHandler } from '../application/commands/create-product-sale/create-product-sale.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteProductSaleHandler } from '../application/commands/delete-product-sale/delete-product-sale.handler';
import { ProductSaleEntity } from '../domain/entities/product-sale.entity';
import { ProductEntity } from '../../product/domain/entities/product.entity';

const commandHandler = [CreateProductSaleHandler, DeleteProductSaleHandler];
const queryHandler = [];

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductSaleEntity.name,
        schema: ProductSaleSchema,
      },
      {
        name: ProductEntity.name,
        schema: ProductSchema,
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
