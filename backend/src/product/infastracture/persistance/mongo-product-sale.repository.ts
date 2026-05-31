import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSaleRepository } from '../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../domain/entities/product-sale.entity';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class MongoProductSaleRepository implements ProductSaleRepository {
  constructor(
    @InjectModel(ProductSaleEntity.name)
    private readonly productSaleModel: Model<ProductSaleEntity>,

    @InjectModel(ProductEntity.name)
    private readonly productModel: Model<ProductEntity>,
  ) {}

  private deductStock = async (productId: string, quantity: number) => {
    await this.productModel.findByIdAndUpdate(
      { _id: productId },
      {
        $inc: { stock: quantity },
      },
    );
  };

  async createProductSale(
    productSale: ProductSaleEntity,
  ): Promise<ProductSaleEntity> {
    const getProduct = await this.productModel.findById(productSale.productId);

    if (!getProduct) {
      throw new NotFoundException('Product not found');
    }

    if (getProduct?.stock < productSale.quantity) {
      throw new BadRequestException('Insufficient stock');
    }

    const totalPrice = getProduct?.sellingPrice * productSale.quantity;
    const totalProfit =
      (getProduct?.sellingPrice - getProduct?.buyingPrice) *
      productSale.quantity;

    const createdProductSale = await this.productSaleModel.create({
      productId: productSale.productId,
      quantity: productSale.quantity,
      sellingPrice: getProduct?.sellingPrice,
      buyingPrice: getProduct?.buyingPrice,
      totalPrice: totalPrice,
      profit: totalProfit,
    });

    if (!createdProductSale) {
      throw new NotAcceptableException('Provide valid datas');
    }

    this.deductStock(productSale.productId, -productSale.quantity);

    await getProduct?.save();

    return createdProductSale;
  }

  async getAllProductSales(): Promise<ProductSaleEntity[]> {
    const productSale = await this.productSaleModel
      .find()
      .populate('productId');

    return productSale;
  }

  async getOneProductSale(id: string): Promise<ProductSaleEntity> {
    const productSale = await this.productSaleModel.findById(id);

    if (!productSale) {
      throw new NotFoundException('Product not found');
    }

    return productSale;
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

  async deleteOneProductSale(id: string): Promise<ProductSaleEntity> {
    const productSale = await this.productSaleModel.findByIdAndDelete(id);

    if (!productSale) {
      throw new NotFoundException('Product not found');
    }

    return productSale;
  }
}
