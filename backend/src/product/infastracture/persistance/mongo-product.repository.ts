import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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

    if (!createdProduct) {
      throw new NotAcceptableException('Provide valid datas');
    }

    return createdProduct.save();
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const products = await this.productModel.find();

    return products;
  }

  async getOneProduct(id: string): Promise<ProductEntity> {
    const product = await this.productModel.findById(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async updateOneProduct(id: string, product: ProductEntity) {
    const toBeUpdatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { returnDocument: 'after' },
    );

    if (!toBeUpdatedProduct) {
      throw new NotFoundException('Product not found');
    }

    return toBeUpdatedProduct;
  }

  async deleteOneProduct(id: string) {
    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
