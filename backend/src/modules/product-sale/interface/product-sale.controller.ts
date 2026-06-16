import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProductSaleDto } from './dto/product-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RolesGuard } from '@core/guard/roles.guard';
import { JwtAuthGuard } from '@core/guard/jwt.auth.guard';
import { UserRole } from '@core/constants/user-role.enum';
import { Roles } from '@core/decorators/roles.decorator';
import { type RequestWithUser } from '@core/interfaces/request-with-user.interface';
import { CreateProductSaleCommand } from '../application/commands/create-product-sale/create-product-sale.command';
import { GetProductSalesQuery } from '../application/queries/get-product-sales/get-product-sales.query';
import { GetTotalSaleProfitQuery } from '../application/queries/get-total-sale-profit/get-total-sale-profit.query';
import { GetTotalSaleQuery } from '../application/queries/get-total-sale/get-total-sale.query';
import { GetProductSaleQuery } from '../application/queries/get-product-sale/get-product-sale.query';
import { DeleteProductSaleCommand } from '../application/commands/delete-product-sale/delete-product-sale.command';

@Controller('product-sales')
export class ProductSaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER, UserRole.ADMIN)
  create(@Body() dto: CreateProductSaleDto, @Req() req: RequestWithUser) {
    return this.commandBus.execute(
      new CreateProductSaleCommand(dto.productId, dto.quantity, req.user.id),
    );
  }

  @Get('total-profit')
  @UseGuards(JwtAuthGuard)
  getTotalSaleProfit() {
    return this.queryBus.execute(new GetTotalSaleProfitQuery());
  }

  @Get('total-sale')
  @UseGuards(JwtAuthGuard)
  getTotalSalet() {
    return this.queryBus.execute(new GetTotalSaleQuery());
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllProductSales() {
    return this.queryBus.execute(new GetProductSalesQuery());
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getOneProductSale(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductSaleQuery(id));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER, UserRole.ADMIN)
  deleteOneProductSale(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductSaleCommand(id));
  }
}
