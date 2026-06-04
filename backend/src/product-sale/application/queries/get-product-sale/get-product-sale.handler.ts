import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductSaleQuery } from './get-product-sale.query';
import { ProductSaleRepository } from '../../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../../domain/entities/product-sale.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetProductSaleQuery)
export class GetProductSaleHandler implements IQueryHandler<GetProductSaleQuery> {
  constructor(private readonly repository: ProductSaleRepository) {}

  async execute(query: GetProductSaleQuery): Promise<ProductSaleEntity | null> {
    const { _id } = query;

    const product = await this.repository.getOneProductSale(_id);

    if (!product) {
      throw new NotFoundException('Sale not found');
    }

    return product;
  }
}
