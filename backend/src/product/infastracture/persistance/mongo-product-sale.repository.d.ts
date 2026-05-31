import { Model } from 'mongoose';
import { ProductSaleRepository } from '../../domain/repositories/product-sale.repository';
import { ProductSaleEntity } from '../../domain/entities/product-sale.entity';
import { ProductEntity } from '../../domain/entities/product.entity';
export declare class MongoProductSaleRepository implements ProductSaleRepository {
    private readonly productSaleModel;
    private readonly productModel;
    constructor(productSaleModel: Model<ProductSaleEntity>, productModel: Model<ProductEntity>);
    private deductStock;
    createProductSale(productSale: ProductSaleEntity): Promise<ProductSaleEntity>;
    getAllProductSales(): Promise<ProductSaleEntity[]>;
    getOneProductSale(id: string): Promise<ProductSaleEntity>;
    getTotalSaleProfit(): Promise<{
        totalProfit: number;
    }>;
    deleteOneProductSale(id: string): Promise<ProductSaleEntity>;
}
