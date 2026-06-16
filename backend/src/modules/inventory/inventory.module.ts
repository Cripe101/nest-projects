import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateInventoryHandler } from './application/commands/create-inventory/create-inventory.handlers';
import { UpdateInventoryHandler } from './application/commands/update-inventory/update-inventory.handler';
import { DeleteInventoryHandler } from './application/commands/delete-inventory/delete-inventory.handler';
import { AddInventoryStockHandler } from './application/commands/add-inventory-stock/add-inventory-stock.handler';
import { GetInventoriesHandler } from './application/queries/get-inventories/get-inventories.handler';
import { GetInventoryHandler } from './application/queries/get-inventory/get-inventory.handler';
import {
  Inventory,
  InventorySchema,
} from '../../core/schemas/inventory/inventory.schema';
import { InventoryController } from './interface/inventory.controller';
import { INVENTORY_REPOSITORY } from './application/ports/inventory.repository.port';
import { InventoryRepository } from './infrastructure/adapters/inventory.repository';
import { ProductModule } from '@modules/product/product.module';

const commandHandlers = [
  CreateInventoryHandler,
  UpdateInventoryHandler,
  DeleteInventoryHandler,
  AddInventoryStockHandler,
];
const queryHandlers = [GetInventoriesHandler, GetInventoryHandler];

@Module({
  imports: [
    CqrsModule,
    ProductModule,
    MongooseModule.forFeature([
      {
        name: Inventory.name,
        schema: InventorySchema,
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    { provide: INVENTORY_REPOSITORY, useClass: InventoryRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoryModule {}
