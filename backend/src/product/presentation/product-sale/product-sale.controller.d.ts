import { CreateProductSaleDto } from './dto/product-sale.dto';
import { ProductSaleUseCase } from '../../application/use-case/product-sale.use-case';
export declare class ProductSaleController {
    private readonly productSaleUseCase;
    constructor(productSaleUseCase: ProductSaleUseCase);
    createProductSale(dto: CreateProductSaleDto): Promise<import("../../domain/entities/product-sale.entity").ProductSaleEntity>;
    getAllProductSales(): Promise<import("../../domain/entities/product-sale.entity").ProductSaleEntity[]>;
    getTotalSaleProfit(): Promise<{
        totalProfit: number;
    }>;
    getOneProductSale(id: string): Promise<import("../../domain/entities/product-sale.entity").ProductSaleEntity>;
    deleteOneProductSale(id: string): Promise<import("../../domain/entities/product-sale.entity").ProductSaleEntity>;
}
