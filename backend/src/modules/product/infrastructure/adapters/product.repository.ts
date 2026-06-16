import { Product } from '@core/schemas/product/product.schema';
import { ProductRepositoryPort } from '@modules/product/application/ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const createdProduct = await this.productModel.create({
      productName: product.productName,
      productCategory: product.productCategory,
      addedBy: new Types.ObjectId(product.addedBy),
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      description: product.description,
      imageUrl: product.imageUrl,
    });

    return new ProductEntity(
      createdProduct._id.toString(),
      createdProduct.productName,
      createdProduct.productCategory,
      createdProduct.addedBy.toString(),
      createdProduct.buyingPrice,
      createdProduct.sellingPrice,
      createdProduct.description,
      createdProduct.imageUrl,
    );
  }

  async updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<ProductEntity | null> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      returnDocument: 'after',
    });
  }

  async deleteOneProduct(id: string): Promise<ProductEntity | null> {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productModel.find();
  }

  async getOneProduct(id: string): Promise<ProductEntity | null> {
    return await this.productModel.findById(id);
  }
}
