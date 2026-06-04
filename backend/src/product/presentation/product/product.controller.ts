import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { CreateProductCommand } from '../../application/commands/create-product/create-product.command';
import { GetProductQuery } from '../../application/queries/get-product/get-product.query';
import { UpdateProductCommand } from '../../application/commands/update-product/update-product.command';
import { GetProductsQuery } from '../../application/queries/get-products/get-products.query';
import { DeleteProductCommand } from '../../application/commands/delete-product/delete-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.commandBus.execute(
      new CreateProductCommand(
        dto.productName,
        dto.productCategory,
        dto.buyingPrice,
        dto.sellingPrice,
        dto.description,
        dto.imageUrl,
      ),
    );
  }

  @Get()
  getAllProducts() {
    return this.queryBus.execute(new GetProductsQuery());
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductQuery(id));
  }

  @Put(':id')
  updateOneProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.commandBus.execute(
      new UpdateProductCommand(
        id,
        dto.productName,
        dto.productCategory,
        dto.buyingPrice,
        dto.sellingPrice,
        dto.description,
        dto.imageUrl,
      ),
    );
  }

  @Delete(':id')
  deleteOneProduct(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
