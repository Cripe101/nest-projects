import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductSaleDto } from './dto/product-sale.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductSaleCommand } from '../application/commands/create-product-sale/create-product-sale.command';
import { DeleteProductSaleCommand } from '../application/commands/delete-product-sale/delete-product-sale.command';

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

  // @Get()
  // getAllProductSales() {
  //   return this.productSaleUseCase.getAllProductSales();
  // }

  // @Get('total-profit')
  // getTotalSaleProfit() {
  //   return this.productSaleUseCase.getTotalSaleProfit();
  // }

  // @Get(':id')
  // getOneProductSale(@Param('id') id: string) {
  //   return this.productSaleUseCase.getOneProductSale(id);
  // }

  @Delete(':id')
  deleteOneProductSale(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductSaleCommand(id));
  }
}
