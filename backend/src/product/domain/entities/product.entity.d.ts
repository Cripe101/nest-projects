export declare class ProductEntity {
    productName: string;
    productCategory: string;
    buyingPrice: number;
    sellingPrice: number;
    stock: number;
    description?: string | undefined;
    imageUrl?: string | undefined;
    constructor(productName: string, productCategory: string, buyingPrice: number, sellingPrice: number, stock: number, description?: string | undefined, imageUrl?: string | undefined);
}
