import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { InventoryDto } from './dto/inventory.dto';
import { CreateInventoryCommand } from '../application/commands/create-inventory/create-inventory.command';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { UpdateInventoryCommand } from '../application/commands/update-inventory/update-inventory.command';
import { PassThrough } from 'stream';
import { DeleteInventoryCommand } from '../application/commands/delete-inventory/delete-inventory.command';
import { GetInventoryQuery } from '../application/queries/get-inventory/get-inventory.query';
import { GetInventoriesQuery } from '../application/queries/get-inventories/get-inventories.query';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  createInventory(@Body() dto: InventoryDto) {
    return this.commandBus.execute(
      new CreateInventoryCommand(
        dto.productId,
        dto.currentStock,
        dto.minimumStock,
      ),
    );
  }

  @Put(':id')
  updateInventory(@Param('id') id: string, @Body() dto: UpdateInventoryDto) {
    return this.commandBus.execute(
      new UpdateInventoryCommand(
        id,
        dto.productId,
        dto.currentStock,
        dto.minimumStock,
      ),
    );
  }

  @Delete(':id')
  deleteInventory(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteInventoryCommand(id));
  }

  @Get()
  getAllInventory() {
    return this.queryBus.execute(new GetInventoriesQuery());
  }

  @Get(':id')
  getOneInventory(@Param('id') id: string) {
    return this.queryBus.execute(new GetInventoryQuery(id));
  }
}
