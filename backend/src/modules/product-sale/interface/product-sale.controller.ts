import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
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
import { ProductSaleError } from '../domain/errors/product-sale.error';
import { ok } from '@core/libs/result';

@Controller('product-sales')
export class ProductSaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER, UserRole.ADMIN)
  async create(@Body() dto: CreateProductSaleDto, @Req() req: RequestWithUser) {
    const result = await this.commandBus.execute(
      new CreateProductSaleCommand(dto.productId, dto.quantity, req.user.id),
    );

    if (result.isErr()) {
      if (result.error === ProductSaleError.INSUFFECIENT_STOCK) {
        throw new BadRequestException(result.error);
      }

      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Get('total-profit')
  @UseGuards(JwtAuthGuard)
  async getTotalSaleProfit() {
    const result = await this.queryBus.execute(new GetTotalSaleProfitQuery());

    return ok(result.value);
  }

  @Get('total-sale')
  @UseGuards(JwtAuthGuard)
  async getTotalSalet() {
    const result = await this.queryBus.execute(new GetTotalSaleQuery());

    return ok(result.value);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllProductSales() {
    const result = await this.queryBus.execute(new GetProductSalesQuery());

    return ok(result.value);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOneProductSale(@Param('id') id: string) {
    const result = await this.queryBus.execute(new GetProductSaleQuery(id));

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CASHIER, UserRole.ADMIN)
  async deleteOneProductSale(@Param('id') id: string) {
    const result = await this.commandBus.execute(
      new DeleteProductSaleCommand(id),
    );
    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }
}
