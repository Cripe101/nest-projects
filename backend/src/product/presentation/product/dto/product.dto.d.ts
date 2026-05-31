export declare class CreateProductDto {
    productName: string;
    productCategory: string;
    buyingPrice: number;
    sellingPrice: number;
    stock: number;
    description?: string;
    imageUrl: string;
}
export declare class UpdateProductDto {
    productName: string;
    productCategory: string;
    buyingPrice: number;
    sellingPrice: number;
    stock: number;
    description?: string;
    imageUrl?: string;
}
