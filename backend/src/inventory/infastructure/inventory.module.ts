import { Module } from '@nestjs/common';
import { CreateInventoryHandler } from '../application/commands/create-inventory/create-inventory.handlers';
import { InventoryRepositpory } from '../domain/repositories/inventory.repository';
import { MongoInventoryRepository } from './persistance/mongo-inventory.repository';
import { InventoryController } from '../presentation/inventory.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryEntity } from '../domain/entities/inventory.entity';
import { InventorySchema } from '../../schemas/inventory/inventory.schema';
import { UpdateInventoryHandler } from '../application/commands/update-inventory/update-inventory.handler';
import { DeleteInventoryHandler } from '../application/commands/delete-inventory/delete-inventory.handler';
import { GetInventoryHandler } from '../application/queries/get-inventory/get-inventory.handler';
import { GetInventoriesHandler } from '../application/queries/get-inventories/get-inventories.handler';
import { AddInventoryStockHandler } from '../application/commands/add-inventory-stock/add-inventory-stock.handler';

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
