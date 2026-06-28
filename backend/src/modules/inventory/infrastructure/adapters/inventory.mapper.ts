import { Inventory } from '@core/schemas/inventory/inventory.schema';
import { InventoryEntity } from '@modules/inventory/domain/entities/inventory.entity';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Types } from 'mongoose';

interface InventoryObject extends Inventory {
  _id: Types.ObjectId;
}

export class InventoryMapper {
  static toEntity(inventory: InventoryObject): InventoryEntity;
  static toEntity(inventories: InventoryObject[]): InventoryEntity[];

  static toEntity(
    inventoryOrInventories: InventoryObject | InventoryObject[],
  ): InventoryEntity | InventoryEntity[] {
    if (Array.isArray(inventoryOrInventories)) {
      return inventoryOrInventories.map((inventory) =>
        this.mapInventory(inventory),
      );
    }

    return this.mapInventory(inventoryOrInventories);
  }

  static getProductId(product: string | ProductEntity): string {
    return typeof product === 'string' ? product : product._id!;
  }

  private static mapProduct(product: unknown): string | ProductEntity {
    if (product instanceof Types.ObjectId || typeof product === 'string') {
      return product.toString();
    }

    const p = product as {
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
      p._id.toString(),
      p.productName,
      p.productCategory,
      p.addedBy.toString(),
      p.buyingPrice,
      p.sellingPrice,
      p.description,
      p.imageUrl,
    );
  }

  private static mapInventory(inventory: InventoryObject): InventoryEntity {
    return new InventoryEntity(
      inventory._id.toString(),
      InventoryMapper.mapProduct(inventory.productId),
      inventory.createdBy.toString(),
      inventory.minimumStock,
      inventory.currentStock,
    );
  }
}
