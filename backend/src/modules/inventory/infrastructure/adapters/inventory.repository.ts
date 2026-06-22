import { Injectable } from '@nestjs/common';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from '@core/schemas/inventory/inventory.schema';
import { InventoryRepositoryPort } from '@modules/inventory/application/ports/inventory.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@Injectable()
export class InventoryRepository implements InventoryRepositoryPort {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
  ) {}

  private toProduct(product: unknown): string | ProductEntity {
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

  private toEntity(
    inventory: Inventory & { _id: Types.ObjectId | string },
  ): InventoryEntity {
    return new InventoryEntity(
      inventory._id.toString(),
      this.toProduct(inventory.productId),
      inventory.createdBy.toString(),
      inventory.minimumStock,
      inventory.currentStock,
    );
  }

  private getProductId(product: string | ProductEntity): string {
    return typeof product === 'string' ? product : product._id!;
  }

  async create(inventory: InventoryEntity): Promise<InventoryEntity> {
    const createdInventory = await this.inventoryModel.create({
      productId: new Types.ObjectId(this.getProductId(inventory.productId)),
      createdBy: new Types.ObjectId(inventory.createdBy),
      minimumStock: inventory.minimumStock,
      currentStock: inventory.currentStock,
    });

    return this.toEntity(createdInventory);
  }

  async updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(
        id,
        {
          productId: new Types.ObjectId(this.getProductId(inventory.productId)),
          createdBy: new Types.ObjectId(inventory.createdBy),
          minimumStock: inventory.minimumStock,
          currentStock: inventory.currentStock,
        },
        {
          returnDocument: 'after',
        },
      )
      .populate('productId');

    return updatedInventory ? this.toEntity(updatedInventory) : null;
  }

  async deleteOneInventory(id: string): Promise<InventoryEntity | null> {
    const deletedInventory = await this.inventoryModel.findByIdAndDelete(id);

    return deletedInventory ? this.toEntity(deletedInventory) : null;
  }

  async deductStock(
    id: string,
    quantity: number,
  ): Promise<InventoryEntity | null> {
    const updatedInventory = await this.inventoryModel.findOneAndUpdate(
      {
        _id: id,
        currentStock: { $gte: quantity },
      },
      {
        $inc: {
          currentStock: -quantity,
        },
      },
      {
        returnDocument: 'after',
      },
    );

    return updatedInventory ? this.toEntity(updatedInventory) : null;
  }

  async addStock(
    id: string,
    quantity: number,
  ): Promise<InventoryEntity | null> {
    const updatedInventory = await this.inventoryModel.findByIdAndUpdate(
      id,
      {
        $inc: {
          currentStock: quantity,
        },
      },
      {
        returnDocument: 'after',
      },
    );

    return updatedInventory ? this.toEntity(updatedInventory) : null;
  }

  async getInventoryByProduct(
    productId: string,
  ): Promise<InventoryEntity | null> {
    const inventory = await this.inventoryModel.findOne({
      productId: new Types.ObjectId(productId),
    });

    return inventory ? this.toEntity(inventory) : null;
  }

  async getOneInventory(id: string): Promise<InventoryEntity | null> {
    const inventory = await this.inventoryModel
      .findById(id)
      .populate('productId');

    return inventory ? this.toEntity(inventory) : null;
  }

  async getAllInventories(): Promise<InventoryEntity[]> {
    const inventories = await this.inventoryModel.find().populate('productId');

    return inventories.map((inventory) => this.toEntity(inventory));
  }
}
