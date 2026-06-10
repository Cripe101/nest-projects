import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSaleEntity } from '../../domain/entities/product-sale.entity';
import { ProductSaleRepository } from '../../domain/repositories/product-sale.repository';

@Injectable()
export class MongoProductSaleRepository implements ProductSaleRepository {
  constructor(
    @InjectModel(ProductSaleEntity.name)
    private readonly productSaleModel: Model<ProductSaleEntity>,
  ) {}

  async create(productSale: ProductSaleEntity): Promise<ProductSaleEntity> {
    return await this.productSaleModel.create(productSale);
  }

  async getAllProductSales(): Promise<ProductSaleEntity[]> {
    const productSale = await this.productSaleModel
      .find()
      .populate('productId');

    return productSale;
  }

  async getOneProductSale(id: string): Promise<ProductSaleEntity | null> {
    return await this.productSaleModel.findById(id);
  }

  async getTotalSaleProfit(): Promise<{ totalProfit: number }> {
    const [summary] = await this.productSaleModel.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: { $sum: '$profit' },
        },
      },
    ]);

    return {
      totalProfit: summary?.totalProfit ?? 0,
    };
  }

  async getTotalSale(): Promise<{ totalSale: number }> {
    const [summary] = await this.productSaleModel.aggregate([
      {
        $group: {
          _id: null,
          totalSale: { $sum: '$totalPrice' },
        },
      },
    ]);

    return {
      totalSale: summary?.totalSale ?? 0,
    };
  }

  async deleteOneProductSale(id: string): Promise<ProductSaleEntity | null> {
    return await this.productSaleModel.findByIdAndDelete(id);
  }
}
