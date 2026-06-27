import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CqrsModule } from '@nestjs/cqrs';
import { CreateProductHandler } from './application/commands/create-product/create-product.handler';
import { UpdateProductHandler } from './application/commands/update-product/update-product.handler';
import { DeleteProductHandler } from './application/commands/delete-product/delete-product.handler';
import { GetProductHandler } from './application/queries/get-product/get-product.handler';
import { GetProductsHandler } from './application/queries/get-products/get-products.handler';
import {
  Product,
  ProductSchema,
} from '../../core/schemas/product/product.schema';
import { ProductController } from './interface/product.controller';
import { PRODUCT_REPOSITORY } from './application/ports/product.repository.port';
import { ProductRepository } from './infrastructure/adapters/product.repository';

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
        name: Product.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: PRODUCT_REPOSITORY, useClass: ProductRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [PRODUCT_REPOSITORY, MongooseModule],
})
export class ProductModule {}
