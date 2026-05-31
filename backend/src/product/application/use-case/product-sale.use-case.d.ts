import { ProductSaleRepository } from '../../domain/repositories/product-sale.repository';
import { CreateProductSaleDto } from '../../presentation/product-sale/dto/product-sale.dto';
import { ProductSaleEntity } from '../../domain/entities/product-sale.entity';
export declare class ProductSaleUseCase {
    private readonly repository;
    constructor(repository: ProductSaleRepository);
    createProductSale(dto: CreateProductSaleDto): Promise<ProductSaleEntity>;
    getAllProductSales(): Promise<ProductSaleEntity[]>;
    getOneProductSale(id: string): Promise<ProductSaleEntity>;
    getTotalSaleProfit(): Promise<{
        totalProfit: number;
    }>;
    deleteOneProductSale(id: string): Promise<ProductSaleEntity>;
}
