import { Injectable } from '@nestjs/common';
import { ProductSaleRepository } from '../../domain/repositories/product-sale.repository';
import { CreateProductSaleDto } from '../../presentation/product-sale/dto/product-sale.dto';
import { ProductSaleEntity } from '../../domain/entities/product-sale.entity';

@Injectable()
export class ProductSaleUseCase {
  constructor(private readonly repository: ProductSaleRepository) {}

  async createProductSale(dto: CreateProductSaleDto) {
    const productSale = new ProductSaleEntity(
      dto.productId,
      dto.quantity,
      dto.sellingPrice,
      dto.buyingPrice,
      dto.totalPrice,
      dto.profit,
    );

    return this.repository.createProductSale(productSale);
  }

  async getAllProductSales() {
    return this.repository.getAllProductSales();
  }

  async getOneProductSale(id: string) {
    return this.repository.getOneProductSale(id);
  }

  async getTotalSaleProfit() {
    return this.repository.getTotalSaleProfit();
  }

  async deleteOneProductSale(id: string) {
    return this.repository.deleteOneProductSale(id);
  }
}
