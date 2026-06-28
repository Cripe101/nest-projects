import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductSaleRepositoryPort } from '@modules/product-sale/application/ports/product-sale.port';
import { ProductSaleEntity } from '@modules/product-sale/domain/entities/product-sale.entity';
import { ProductSale } from '@core/schemas/product-sale/product-sale.schema';
import { Result, ok, err } from '@core/libs/result';
import { InventoryMapper } from '@modules/inventory/infrastructure/adapters/inventory.mapper';
import { ProductSaleMapper } from './product-sale.mapper';
import { ProductSaleError } from '@modules/product-sale/domain/errors/product-sale.error';

@Injectable()
export class ProductSaleRepository implements ProductSaleRepositoryPort {
  constructor(
    @InjectModel(ProductSale.name)
    private readonly productSaleModel: Model<ProductSale>,
  ) {}

  async create(
    productSale: ProductSaleEntity,
  ): Promise<Result<ProductSaleEntity, null>> {
    const createdProductSale = await this.productSaleModel.create({
      productId: new Types.ObjectId(
        InventoryMapper.getProductId(productSale.productId),
      ),
      quantity: productSale.quantity,
      cashier: new Types.ObjectId(productSale.cashier),
      sellingPrice: productSale.sellingPrice,
      buyingPrice: productSale.buyingPrice,
      totalPrice: productSale.totalPrice,
      profit: productSale.profit,
    });

    const sale = new ProductSaleEntity(
      createdProductSale._id.toString(),
      createdProductSale.productId.toString(),
      createdProductSale.quantity,
      createdProductSale.cashier.toString(),
      createdProductSale.sellingPrice,
      createdProductSale.buyingPrice,
      createdProductSale.totalPrice,
      createdProductSale.profit,
    );

    return ok(sale);
  }

  async getAllProductSales(): Promise<Result<ProductSaleEntity[], null>> {
    const sales = await this.productSaleModel
      .find()
      .populate('productId')
      .lean();

    if (!sales) return err(null);

    return ok(ProductSaleMapper.toEntity(sales));
  }

  async getOneProductSale(
    id: string,
  ): Promise<Result<ProductSaleEntity | null, ProductSaleError>> {
    const sale = await this.productSaleModel
      .findById(id)
      .populate('productId')
      .lean();

    if (!sale) return err(ProductSaleError.NOT_FOUND);

    return ok(ProductSaleMapper.toEntity(sale));
  }

  async getTotalSaleProfit(): Promise<Result<{ totalProfit: number }, null>> {
    const [summary] = await this.productSaleModel.aggregate([
      {
        $group: {
          _id: null,
          totalProfit: { $sum: '$profit' },
        },
      },
    ]);

    return ok({
      totalProfit: summary?.totalProfit ?? 0,
    });
  }

  async getTotalSale(): Promise<Result<{ totalSale: number }, null>> {
    const [summary] = await this.productSaleModel.aggregate([
      {
        $group: {
          _id: null,
          totalSale: { $sum: '$totalPrice' },
        },
      },
    ]);

    return ok({
      totalSale: summary?.totalSale ?? 0,
    });
  }

  async deleteOneProductSale(
    id: string,
  ): Promise<Result<ProductSaleEntity | null, ProductSaleError>> {
    const sale = await this.productSaleModel
      .findByIdAndDelete(id)
      .populate('productId')
      .exec();

    if (!sale) return err(ProductSaleError.NOT_FOUND);

    return ok(ProductSaleMapper.toEntity(sale));
  }
}
