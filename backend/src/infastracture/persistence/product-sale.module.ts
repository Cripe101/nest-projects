import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSaleUseCase } from 'src/application/use-cases/product-sale.use-case';
import { ProductSaleEntity } from 'src/domain/entities/product-sale.entity';
import { ProductSaleRepository } from 'src/domain/repositories/product-sale.repository';
import { ProductSaleController } from 'src/presentation/product-sale.controller';
import { ProductSaleSchema } from 'src/schema/product-sale.schema';
import { MongoProductSaleRepository } from './mongo-product-sale.repository';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { ProductSchema } from 'src/schema/product.schema';

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
