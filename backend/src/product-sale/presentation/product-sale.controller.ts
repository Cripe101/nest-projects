import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductSaleDto } from './dto/product-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from '../application/commands/create-product-sale/create-product-sale.command';
import { DeleteProductSaleCommand } from '../application/commands/delete-product-sale/delete-product-sale.command';
import { GetProductSalesQuery } from '../application/queries/get-product-sales/get-product-sales.query';
import { GetTotalSaleProfitQuery } from '../application/queries/get-total-sale-profit/get-total-sale-profit.query';
import { GetProductSaleQuery } from '../application/queries/get-product-sale/get-product-sale.query';

@Controller('product-sales')
export class ProductSaleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  createProductSale(@Body() dto: CreateProductSaleDto) {
    return this.commandBus.execute(
      new CreateProductSaleCommand(
        dto.productId,
        dto.buyingPrice,
        dto.sellingPrice,
        dto.totalPrice,
        dto.profit,
        dto.quantity,
      ),
    );
  }

  @Get()
  getAllProductSales() {
    return this.queryBus.execute(new GetProductSalesQuery());
  }

  @Get('total-profit')
  getTotalSaleProfit() {
    return this.queryBus.execute(new GetTotalSaleProfitQuery());
  }

  @Get(':id')
  getOneProductSale(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductSaleQuery(id));
  }

  @Delete(':id')
  deleteOneProductSale(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductSaleCommand(id));
  }
}
