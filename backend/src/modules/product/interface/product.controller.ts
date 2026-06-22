import { UserRole } from '@core/constants/user-role.enum';
import { Roles } from '@core/decorators/roles.decorator';
import { JwtAuthGuard } from '@core/guard/jwt.auth.guard';
import { RolesGuard } from '@core/guard/roles.guard';
import {
  Body,
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
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import type { RequestWithUser } from '@core/interfaces/request-with-user.interface';
import { CreateProductCommand } from '../application/commands/create-product/create-product.command';
import { GetProductsQuery } from '../application/queries/get-products/get-products.query';
import { GetProductQuery } from '../application/queries/get-product/get-product.query';
import { UpdateProductCommand } from '../application/commands/update-product/update-product.command';
import { DeleteProductCommand } from '../application/commands/delete-product/delete-product.command';
import { ok } from '@core/interfaces/result';

@Controller('products')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async create(@Body() dto: CreateProductDto, @Req() req: RequestWithUser) {
    const result = await this.commandBus.execute(
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

    return ok(result.value._id);
  }

  @Get()
  async getAllProducts() {
    const result = await this.queryBus.execute(new GetProductsQuery());

    return ok(result.value);
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string) {
    const result = await this.queryBus.execute(new GetProductQuery(id));

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async updateOneProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @Req() req: RequestWithUser,
  ) {
    const result = await this.commandBus.execute(
      new UpdateProductCommand(
        id,
        dto.productName,
        dto.productCategory,
        req.user.id,
        dto.buyingPrice,
        dto.sellingPrice,
        dto.description,
        dto.imageUrl,
      ),
    );

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value._id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async deleteOneProduct(@Param('id') id: string) {
    const result = await this.commandBus.execute(new DeleteProductCommand(id));

    if (result.isErr()) {
      throw new NotFoundException(result.error);
    }

    return ok(result.value._id);
  }
}
