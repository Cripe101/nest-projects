import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class MongoProductRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const createdProduct = new this.productModel(product);

    return await createdProduct.save();
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productModel.find();
  }

  async getOneProduct(id: string): Promise<ProductEntity | null> {
    return await this.productModel.findById(id);
  }

  async updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity | null> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async deleteOneProduct(id: string): Promise<ProductEntity | null> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
