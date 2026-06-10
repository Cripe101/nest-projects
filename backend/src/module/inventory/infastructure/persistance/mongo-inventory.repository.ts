import { Injectable } from '@nestjs/common';
import { InventoryRepositpory } from '../../domain/repositories/inventory.repository';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoInventoryRepository implements InventoryRepositpory {
  constructor(
    @InjectModel(InventoryEntity.name)
    private readonly inventoryModel: Model<InventoryEntity>,
  ) {}

  async create(inventory: InventoryEntity): Promise<InventoryEntity> {
    const createdInventory = new this.inventoryModel(inventory);

    return await createdInventory.save();
  }

  async updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndUpdate(id, inventory, {
      returnDocument: 'after',
    });
  }

  async deleteOneInventory(id: string): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndDelete(id);
  }

  async deductStock(
    id: string,
    quantity: number,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndUpdate(
      { _id: id, currentStock: { $gte: quantity } },
      { $inc: { currentStock: -quantity } },
      {
        returnDocument: 'after',
      },
    );
  }

  async addStock(
    id: string,
    quantity: number,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndUpdate(
      id,
      { $inc: { currentStock: quantity } },
      {
        returnDocument: 'after',
      },
    );
  }

  async getOneInventory(id: string): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findById(id).populate('productId');
  }

  async getInventoryByProduct(
    productId: string,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findOne({ productId });
  }

  async getAllInventories(): Promise<InventoryEntity[]> {
    return await this.inventoryModel.find().populate('productId');
  }
}
