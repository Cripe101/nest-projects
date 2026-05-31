import { Model } from 'mongoose';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../domain/entities/product.entity';
export declare class MongoProductRepository implements ProductRepository {
    private readonly productModel;
    constructor(productModel: Model<ProductEntity>);
    createProduct(product: ProductEntity): Promise<ProductEntity>;
    getAllProducts(): Promise<ProductEntity[]>;
    getOneProduct(id: string): Promise<ProductEntity>;
    updateOneProduct(id: string, product: ProductEntity): Promise<import("mongoose").Document<unknown, {}, ProductEntity, {}, import("mongoose").DefaultSchemaOptions> & ProductEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteOneProduct(id: string): Promise<import("mongoose").Document<unknown, {}, ProductEntity, {}, import("mongoose").DefaultSchemaOptions> & ProductEntity & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
