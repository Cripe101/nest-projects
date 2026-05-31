import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoProductSaleRepository } from './persistance/mongo-product-sale.repository';
import { ProductSaleController } from '../presentation/product-sale/product-sale.controller';
import { ProductSaleRepository } from '../domain/repositories/product-sale.repository';
import { ProductSaleSchema } from '../../schemas/product/product-sale.schema';
import { ProductEntity } from '../domain/entities/product.entity';
import { ProductSchema } from '../../schemas/product/product.schema';
import { ProductSaleUseCase } from '../application/use-case/product-sale.use-case';
import { ProductSaleEntity } from '../domain/entities/product-sale.entity';

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
  ],
  controllers: [ProductSaleController],
  providers: [
    ProductSaleUseCase,
    { provide: ProductSaleRepository, useClass: MongoProductSaleRepository },
  ],
})
export class ProductSaleModule {}
