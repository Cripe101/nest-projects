import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
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
import type { RequestWithUser } from '../../../core/interfaces/request-with-user.interface';
import { Roles } from '../../../core/decorators/roles.decorator';
import { UserRole } from '../../../core/constants/user-role.enum';
import { JwtAuthGuard } from '../../../core/guard/jwt.auth.guard';
import { RolesGuard } from '../../../core/guard/roles.guard';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  createInventory(@Body() dto: InventoryDto, @Req() req: RequestWithUser) {
    return this.commandBus.execute(
      new CreateInventoryCommand(
        dto.productId,
        req.user.id,
        dto.currentStock,
        dto.minimumStock,
      ),
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  updateInventory(
    @Param('id') id: string,
    @Body() dto: UpdateInventoryDto,
    @Req() req: RequestWithUser,
  ) {
    return this.commandBus.execute(
      new UpdateInventoryCommand(
        id,
        dto.productId,
        dto.currentStock,
        dto.minimumStock,
        req.body._id,
      ),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
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
