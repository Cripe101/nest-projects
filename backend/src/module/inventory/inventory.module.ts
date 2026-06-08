import { Module } from '@nestjs/common';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateInventoryHandler } from './application/commands/create-inventory/create-inventory.handlers';
import { UpdateInventoryHandler } from './application/commands/update-inventory/update-inventory.handler';
import { DeleteInventoryHandler } from './application/commands/delete-inventory/delete-inventory.handler';
import { AddInventoryStockHandler } from './application/commands/add-inventory-stock/add-inventory-stock.handler';
import { GetInventoriesHandler } from './application/queries/get-inventories/get-inventories.handler';
import { GetInventoryHandler } from './application/queries/get-inventory/get-inventory.handler';
import { InventoryEntity } from './domain/entities/inventory.entity';
import { InventorySchema } from '../../core/schemas/inventory/inventory.schema';
import { InventoryController } from './presentation/inventory.controller';
import { InventoryRepositpory } from './domain/repositories/inventory.repository';
import { MongoInventoryRepository } from './infastructure/persistance/mongo-inventory.repository';

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
    MongooseModule.forFeature([
      {
        name: InventoryEntity.name,
        schema: InventorySchema,
      },
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    { provide: InventoryRepositpory, useClass: MongoInventoryRepository },
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [InventoryRepositpory],
})
export class InventoryModule {}
