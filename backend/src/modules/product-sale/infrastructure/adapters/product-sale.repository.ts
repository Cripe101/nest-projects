import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductSaleRepositoryPort } from '@modules/product-sale/application/ports/product-sale.port';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { ProductSale } from '@core/schemas/product-sale/product-sale.schema';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@Injectable()
export class ProductSaleRepository implements ProductSaleRepositoryPort {
  constructor(
    @InjectModel(ProductSale.name)
    private readonly productSaleModel: Model<ProductSale>,
  ) {}

  private toEntity(
    sale: ProductSale & { _id: Types.ObjectId | string },
  ): ProductSaleEntity {
    return new ProductSaleEntity(
      sale._id.toString(),
      this.toProduct(sale.productId),
      sale.quantity,
      sale.cashier.toString(),
      sale.sellingPrice,
      sale.buyingPrice,
      sale.totalPrice,
      sale.profit,
    );
  }

  private toProduct(product: unknown): string | ProductEntity {
    if (product instanceof Types.ObjectId || typeof product === 'string') {
      return product.toString();
    }

    const productDocument = product as {
      _id: Types.ObjectId | string;
      productName: string;
      productCategory: string;
      addedBy: Types.ObjectId | string;
      buyingPrice: number;
      sellingPrice: number;
      description?: string;
      imageUrl?: string;
    };

    return new ProductEntity(
      productDocument._id.toString(),
      productDocument.productName,
      productDocument.productCategory,
      productDocument.addedBy.toString(),
      productDocument.buyingPrice,
      productDocument.sellingPrice,
      productDocument.description,
      productDocument.imageUrl,
    );
  }

  private getProductId(product: string | ProductEntity): string {
    return typeof product === 'string' ? product : product._id!;
  }

  async create(productSale: ProductSaleEntity): Promise<ProductSaleEntity> {
    const createdProductSale = await this.productSaleModel.create({
      productId: new Types.ObjectId(this.getProductId(productSale.productId)),
      quantity: productSale.quantity,
      cashier: new Types.ObjectId(productSale.cashier),
      sellingPrice: productSale.sellingPrice,
      buyingPrice: productSale.buyingPrice,
      totalPrice: productSale.totalPrice,
      profit: productSale.profit,
    });

    return new ProductSaleEntity(
      createdProductSale._id.toString(),
      createdProductSale.productId.toString(),
      createdProductSale.quantity,
      createdProductSale.cashier.toString(),
      createdProductSale.sellingPrice,
      createdProductSale.buyingPrice,
      createdProductSale.totalPrice,
      createdProductSale.profit,
    );
  }

  async getAllProductSales(): Promise<ProductSaleEntity[]> {
    const sales = await this.productSaleModel
      .find()
      .populate('productId')
      .exec();

    return sales.map((sale) => this.toEntity(sale));
  }

  async getOneProductSale(id: string): Promise<ProductSaleEntity | null> {
    const sale = await this.productSaleModel
      .findById(id)
      .populate('productId')
      .exec();

    return sale ? this.toEntity(sale) : null;
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
    const sale = await this.productSaleModel
      .findByIdAndDelete(id)
      .populate('productId')
      .exec();

    return sale ? this.toEntity(sale) : null;
  }
}
