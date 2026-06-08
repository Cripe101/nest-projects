import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateProductSaleDto } from './dto/product-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from '../application/commands/create-product-sale/create-product-sale.command';
import { DeleteProductSaleCommand } from '../application/commands/delete-product-sale/delete-product-sale.command';
import { GetProductSalesQuery } from '../application/queries/get-product-sales/get-product-sales.query';
import { GetTotalSaleProfitQuery } from '../application/queries/get-total-sale-profit/get-total-sale-profit.query';
import { GetProductSaleQuery } from '../application/queries/get-product-sale/get-product-sale.query';
import { JwtAuthGuard } from '../../../core/guard/jwt.auth.guard';
import { RolesGuard } from '../../../core/guard/roles.guard';
import { UserRole } from '../../../core/constants/user-role.enum';
import { Roles } from '../../../core/decorators/roles.decorator';

@Controller('product-sales')
export class ProductSaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER)
  create(@Body() dto: CreateProductSaleDto) {
    return this.commandBus.execute(
      new CreateProductSaleCommand(dto.productId, dto.quantity),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER)
  getAllProductSales() {
    return this.queryBus.execute(new GetProductSalesQuery());
  }

  @Get('total-profit')
  @UseGuards(JwtAuthGuard)
  getTotalSaleProfit() {
    return this.queryBus.execute(new GetTotalSaleProfitQuery());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER)
  getOneProductSale(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductSaleQuery(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER)
  deleteOneProductSale(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductSaleCommand(id));
  }
}
