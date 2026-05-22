import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/presentation/dto/product.dto';

@Injectable()
export class ProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async createProduct(dto: CreateProductDto) {
    const product = new ProductEntity(
      dto.productName,
      dto.productCategory,
      dto.buyingPrice,
      dto.sellingPrice,
      dto.stock,
      dto?.description,
      dto.imageUrl,
    );

    return this.repository.createProduct(product);
  }

  async getAllProducts() {
    return this.repository.getAllProducts();
  }

  async getOneProduct(id: string) {
    return this.repository.getOneProduct(id);
  }

  async updateOneProduct(id: string, product: UpdateProductDto) {
    return this.repository.updateOneProduct(id, product);
  }

  async deleteOneProduct(id: string) {
    return this.repository.deleteOneProduct(id);
  }
}
