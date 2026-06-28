import { Injectable } from '@nestjs/common';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inventory } from '@core/schemas/inventory/inventory.schema';
import { InventoryRepositoryPort } from '@modules/inventory/application/ports/inventory.repository.port';
import { Types } from 'mongoose';
import { Result, err, ok } from '@core/libs/result';
import { InventoryMapper } from './inventory.mapper';
import { InventoryError } from '@modules/inventory/domain/errors/inventory.error';

@Injectable()
export class InventoryRepository implements InventoryRepositoryPort {
  constructor(
    @InjectModel(Inventory.name)
    private readonly inventoryModel: Model<Inventory>,
  ) {}

  async create(
    inventory: InventoryEntity,
  ): Promise<Result<InventoryEntity, InventoryError>> {
    const createdInventory = await this.inventoryModel.create({
      productId: new Types.ObjectId(
        InventoryMapper.getProductId(inventory.productId),
      ),
      createdBy: new Types.ObjectId(inventory.createdBy),
      minimumStock: inventory.minimumStock,
      currentStock: inventory.currentStock,
    });

    if (!createdInventory) return err(InventoryError.DUPLICATE_PRODUCT);

    return ok(InventoryMapper.toEntity(createdInventory));
  }

  async updateOneInventory(
    id: string,
    inventory: InventoryEntity,
  ): Promise<Result<InventoryEntity | null, InventoryError>> {
    const updatedInventory = await this.inventoryModel
      .findByIdAndUpdate(
        id,
        {
          productId: new Types.ObjectId(
            InventoryMapper.getProductId(inventory.productId),
          ),
          createdBy: new Types.ObjectId(inventory.createdBy),
          minimumStock: inventory.minimumStock,
          currentStock: inventory.currentStock,
        },
        {
          returnDocument: 'after',
        },
      )
      .populate('productId');

    if (!updatedInventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(updatedInventory));
  }

  async deleteOneInventory(
    id: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>> {
    const deletedInventory = await this.inventoryModel.findByIdAndDelete(id);

    if (!deletedInventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(deletedInventory));
  }

  async deductStock(
    id: string,
    quantity: number,
  ): Promise<Result<InventoryEntity, InventoryError>> {
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

    if (!updatedInventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(updatedInventory));
  }

  async addStock(
    id: string,
    quantity: number,
  ): Promise<Result<InventoryEntity, InventoryError>> {
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

    if (!updatedInventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(updatedInventory));
  }

  async getInventoryByProduct(
    productId: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>> {
    const inventory = await this.inventoryModel
      .findOne({
        productId: new Types.ObjectId(productId),
      })
      .lean();

    if (!inventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(inventory));
  }

  async getOneInventory(
    id: string,
  ): Promise<Result<InventoryEntity | null, InventoryError>> {
    const inventory = await this.inventoryModel
      .findById(id)
      .populate('productId')
      .lean();

    if (!inventory) return err(InventoryError.NOT_FOUND);

    return ok(InventoryMapper.toEntity(inventory));
  }

  async getAllInventories(): Promise<Result<InventoryEntity[], null>> {
    const inventories = await this.inventoryModel
      .find()
      .populate('productId')
      .lean();

    return ok(InventoryMapper.toEntity(inventories));
  }
}
