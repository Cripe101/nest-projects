import { Module } from '@nestjs/common';
import { MongoProductRepository } from './persistance/mongo-product.repository';
import { ProductController } from '../presentation/product/product.controller';
import { ProductRepository } from '../domain/repositories/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity } from '../domain/entities/product.entity';
import { ProductSchema } from '../../schemas/product/product.schema';
import { ProductUseCase } from '../application/use-case/product.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductEntity.name,
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductUseCase,
    { provide: ProductRepository, useClass: MongoProductRepository },
  ],
})
export class ProductModule {}
