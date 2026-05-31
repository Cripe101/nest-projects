import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { ProductUseCase } from '../../application/use-case/product.use-case';
export declare class ProductController {
    private readonly productUseCase;
    constructor(productUseCase: ProductUseCase);
    createProduct(dto: CreateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    getAllProducts(): Promise<import("../../domain/entities/product.entity").ProductEntity[]>;
    getOneProduct(id: string): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    updateOneProduct(id: string, dto: UpdateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    deleteOneProduct(id: string): Promise<import("../../domain/entities/product.entity").ProductEntity>;
}
