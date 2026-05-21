import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductUseCase } from 'src/application/use-cases/product.use-case';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductController } from 'src/presentation/product.controller';
import { ProductSchema } from 'src/schema/product.schema';
import { MongoProductRepository } from './persistence/mongo-product.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';

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
