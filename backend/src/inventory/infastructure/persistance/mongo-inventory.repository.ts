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

  async createInventory(inventory: InventoryEntity): Promise<InventoryEntity> {
    const createdInventory = new this.inventoryModel(inventory);

    return await createdInventory.save();
  }

  async updateInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndUpdate(id, inventory);
  }

  async deleteInventory(id: string): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findByIdAndDelete(id);
  }

  async getOneInventory(id: string): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findById(id);
  }

  async getInventoryByProduct(
    productId: string,
  ): Promise<InventoryEntity | null> {
    return await this.inventoryModel.findOne({ productId });
  }

  async getAllInventory(): Promise<InventoryEntity[]> {
    return await this.inventoryModel.find();
  }
}
