import mongoose from 'mongoose';
export declare class ProductSale {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    buyingPrice: number;
    sellingPrice: number;
    totalPrice: number;
    profit?: number;
}
export declare const ProductSaleSchema: mongoose.Schema<ProductSale, mongoose.Model<ProductSale, any, any, any, any, any, ProductSale>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    productId?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: mongoose.SchemaDefinitionProperty<number, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    buyingPrice?: mongoose.SchemaDefinitionProperty<number, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sellingPrice?: mongoose.SchemaDefinitionProperty<number, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalPrice?: mongoose.SchemaDefinitionProperty<number, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    profit?: mongoose.SchemaDefinitionProperty<number | undefined, ProductSale, mongoose.Document<unknown, {}, ProductSale, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<ProductSale & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, ProductSale>;
