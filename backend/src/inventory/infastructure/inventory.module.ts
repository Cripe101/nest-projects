import { Module } from '@nestjs/common';
import { CreateInventoryHandler } from '../application/commands/create-inventory/create-inventory.handlers';
import { InventoryRepositpory } from '../domain/repositories/inventory.repository';
import { MongoInventoryRepository } from './persistance/mongo-inventory.repository';
import { InventoryController } from '../presentation/inventory.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { InventoryEntity } from '../domain/entities/inventory.entity';
import { InventorySchema } from '../../schemas/inventory/inventory.schema';
import { ProductModule } from '../../product/infastracture/product.module';

const commandHandlers = [CreateInventoryHandler];
const queryHandlers = [];

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
})
export class InventoryModule {}
