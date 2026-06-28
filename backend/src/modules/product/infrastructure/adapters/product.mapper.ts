import { Product } from '@core/schemas/product/product.schema';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Types } from 'mongoose';

interface ProductObject extends Product {
  _id: Types.ObjectId;
}

export class ProductMapper {
  static toEntity(product: ProductObject): ProductEntity;
  static toEntity(products: ProductObject[]): ProductEntity[];

  static toEntity(
    productOrProducts: ProductObject | ProductObject[],
  ): ProductEntity | ProductEntity[] {
    if (Array.isArray(productOrProducts)) {
      return productOrProducts.map(this.mapProduct);
    }

    return this.mapProduct(productOrProducts);
  }

  private static mapProduct(product: ProductObject): ProductEntity {
    return {
      ...product,
      _id: product._id.toString(),
      addedBy: product.addedBy.toString(),
    };
  }
}
