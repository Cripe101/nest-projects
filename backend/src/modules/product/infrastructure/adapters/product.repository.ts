import { Product } from '@core/schemas/product/product.schema';
import { ProductRepositoryPort } from '@modules/product/application/ports/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Result, ok, err } from '@core/libs/result';
import { ProductError } from '@modules/product/domain/errors/product.error';
import { ProductMapper } from './product.mapper';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(product: ProductEntity): Promise<Result<ProductEntity, null>> {
    const createdProduct = await this.productModel.create({
      productName: product.productName,
      productCategory: product.productCategory,
      addedBy: new Types.ObjectId(product.addedBy),
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
      description: product.description,
      imageUrl: product.imageUrl,
    });

    return ok(
      new ProductEntity(
        createdProduct._id.toString(),
        createdProduct.productName,
        createdProduct.productCategory,
        createdProduct.addedBy.toString(),
        createdProduct.buyingPrice,
        createdProduct.sellingPrice,
        createdProduct.description,
        createdProduct.imageUrl,
      ),
    );
  }

  async updateOneProduct(
    id: string,
    product: ProductEntity,
  ): Promise<Result<ProductEntity | null, ProductError>> {
    const result = await this.productModel.findByIdAndUpdate(id, product, {
      returnDocument: 'after',
    });

    if (!result) return err(ProductError.NOT_FOUND);

    return ok(ProductMapper.toEntity(result));
  }

  async deleteOneProduct(
    id: string,
  ): Promise<Result<ProductEntity | null, ProductError>> {
    const result = await this.productModel.findByIdAndDelete(id);

    if (!result) return err(ProductError.NOT_FOUND);

    return ok(ProductMapper.toEntity(result));
  }

  async getAllProducts(): Promise<Result<ProductEntity[], null>> {
    const result = await this.productModel.find().lean();

    return ok(ProductMapper.toEntity(result));
  }

  async getOneProduct(
    id: string,
  ): Promise<Result<ProductEntity | null, ProductError>> {
    const result = await this.productModel.findById(id).lean();

    if (!result) return err(ProductError.NOT_FOUND);

    return ok(ProductMapper.toEntity(result));
  }
}
