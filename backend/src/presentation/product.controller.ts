import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductUseCase } from 'src/application/use-cases/product.use-case';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productUseCase.createProduct(dto);
  }

  @Get()
  getAllProducts() {
    return this.productUseCase.getAllProducts();
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.productUseCase.getOneProduct(id);
  }

  @Put(':id')
  updateOneProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productUseCase.updateOneProduct(id, dto);
  }

  @Delete(':id')
  deleteOneProduct(@Param('id') id: string) {
    return this.productUseCase.deleteOneProduct(id);
  }
}
