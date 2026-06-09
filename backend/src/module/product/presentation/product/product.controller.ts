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
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { CreateProductCommand } from '../../application/commands/create-product/create-product.command';
import { GetProductQuery } from '../../application/queries/get-product/get-product.query';
import { UpdateProductCommand } from '../../application/commands/update-product/update-product.command';
import { GetProductsQuery } from '../../application/queries/get-products/get-products.query';
import { DeleteProductCommand } from '../../application/commands/delete-product/delete-product.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JwtAuthGuard } from '../../../../core/guard/jwt.auth.guard';
import { RolesGuard } from '../../../../core/guard/roles.guard';
import { Roles } from '../../../../core/decorators/roles.decorator';
import { UserRole } from '../../../../core/constants/user-role.enum';
import type { RequestWithUser } from '../../../../core/interfaces/request-with-user.interface';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() dto: CreateProductDto, @Req() req: RequestWithUser) {
    return this.commandBus.execute(
      new CreateProductCommand(
        dto.productName,
        dto.productCategory,
        req.user.id,
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  deleteOneProduct(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
