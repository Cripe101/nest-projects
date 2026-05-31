import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateProductSaleDto } from './dto/product-sale.dto';
import { ProductSaleUseCase } from '../../application/use-case/product-sale.use-case';

@Controller('product-sales')
export class ProductSaleController {
  constructor(private readonly productSaleUseCase: ProductSaleUseCase) {}

  @Post()
  createProductSale(@Body() dto: CreateProductSaleDto) {
    return this.productSaleUseCase.createProductSale(dto);
  }

  @Get()
  getAllProductSales() {
    return this.productSaleUseCase.getAllProductSales();
  }

  @Get('total-profit')
  getTotalSaleProfit() {
    return this.productSaleUseCase.getTotalSaleProfit();
  }

  @Get(':id')
  getOneProductSale(@Param('id') id: string) {
    return this.productSaleUseCase.getOneProductSale(id);
  }

  @Delete(':id')
  deleteOneProductSale(@Param('id') id: string) {
    return this.productSaleUseCase.deleteOneProductSale(id);
  }
}
