import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './application/commands/create-product/create-product.handler';
import { UpdateProductHandler } from './application/commands/update-product/update-product.handler';
import { DeleteProductHandler } from './application/commands/delete-product/delete-product.handler';
import { GetProductHandler } from './application/queries/get-product/get-product.handler';
import { GetProductsHandler } from './application/queries/get-products/get-products.handler';
import { ProductEntity } from './domain/entities/product.entity';
import { ProductSchema } from '../../core/schemas/product/product.schema';
import { ProductController } from './presentation/product/product.controller';
import { ProductRepository } from './domain/repositories/product.repository';
import { MongoProductRepository } from './infastracture/persistance/mongo-product.repository';

const commandHandlers = [
  CreateProductHandler,
  UpdateProductHandler,
  DeleteProductHandler,
];
const queryHandlers = [GetProductHandler, GetProductsHandler];

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: ProductRepository, useClass: MongoProductRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [ProductRepository],
})
export class ProductModule {}
