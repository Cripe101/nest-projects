import { ProductRepository } from '../../domain/repositories/product.repository';
import { CreateProductDto, UpdateProductDto } from '../../presentation/product/dto/product.dto';
import { ProductEntity } from '../../domain/entities/product.entity';
export declare class ProductUseCase {
    private readonly repository;
    constructor(repository: ProductRepository);
    createProduct(dto: CreateProductDto): Promise<ProductEntity>;
    getAllProducts(): Promise<ProductEntity[]>;
    getOneProduct(id: string): Promise<ProductEntity>;
    updateOneProduct(id: string, product: UpdateProductDto): Promise<ProductEntity>;
    deleteOneProduct(id: string): Promise<ProductEntity>;
}
