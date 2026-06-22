import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { DeleteInventoryCommand } from '../application/commands/delete-inventory/delete-inventory.command';
import { GetInventoryQuery } from '../application/queries/get-inventory/get-inventory.query';
import { GetInventoriesQuery } from '../application/queries/get-inventories/get-inventories.query';
import type { RequestWithUser } from '../../../core/interfaces/request-with-user.interface';
import { Roles } from '../../../core/decorators/roles.decorator';
import { UserRole } from '../../../core/constants/user-role.enum';
import { JwtAuthGuard } from '../../../core/guard/jwt.auth.guard';
import { RolesGuard } from '../../../core/guard/roles.guard';
import { AddInventoryStockCommand } from '../application/commands/add-inventory-stock/add-inventory-stock.command';
import { AddStockDto } from './dto/add-stock.dto';
import { InventoryResponseDto } from './dto/inventory-response.dto';
import { InventoryError } from '../domain/errors/inventory.error';
import { ok } from '@core/interfaces/result';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async createInventory(
    @Body() dto: InventoryDto,
    @Req() req: RequestWithUser,
  ) {
    const result = await this.commandBus.execute(
      new CreateInventoryCommand(
        dto.productId,
        req.user.id,
        dto.currentStock,
        dto.minimumStock,
      ),
    );

    if (result.isErr()) {
      throw new ConflictException(result.error);
    }

    return ok(result.value);
  }

  @Put('add-stock/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async addStock(@Param('id') id: string, @Body() dto: AddStockDto) {
    const result = await this.commandBus.execute(
      new AddInventoryStockCommand(id, dto.quantity),
    );

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateInventory(
    @Param('id') id: string,
    @Body() dto: UpdateInventoryDto,
    @Req() req: RequestWithUser,
  ) {
    const result = await this.commandBus.execute(
      new UpdateInventoryCommand(
        id,
        dto.productId,
        dto.currentStock,
        dto.minimumStock,
        req.body._id,
      ),
    );

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteInventory(@Param('id') id: string) {
    const result = await this.commandBus.execute(
      new DeleteInventoryCommand(id),
    );

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Get()
  async getAllInventory() {
    const result = await this.queryBus.execute(new GetInventoriesQuery());

    return ok(result.value);
  }

  @Get(':id')
  async getOneInventory(@Param('id') id: string) {
    const result = await this.queryBus.execute(new GetInventoryQuery(id));

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }
}
