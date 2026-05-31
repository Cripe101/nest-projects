"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSaleUseCase = void 0;
const common_1 = require("@nestjs/common");
const product_sale_repository_1 = require("../../domain/repositories/product-sale.repository");
const product_sale_entity_1 = require("../../domain/entities/product-sale.entity");
let ProductSaleUseCase = class ProductSaleUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async createProductSale(dto) {
        const productSale = new product_sale_entity_1.ProductSaleEntity(dto.productId, dto.quantity, dto.sellingPrice, dto.buyingPrice, dto.totalPrice, dto.profit);
        return this.repository.createProductSale(productSale);
    }
    async getAllProductSales() {
        return this.repository.getAllProductSales();
    }
    async getOneProductSale(id) {
        return this.repository.getOneProductSale(id);
    }
    async getTotalSaleProfit() {
        return this.repository.getTotalSaleProfit();
    }
    async deleteOneProductSale(id) {
        return this.repository.deleteOneProductSale(id);
    }
};
exports.ProductSaleUseCase = ProductSaleUseCase;
exports.ProductSaleUseCase = ProductSaleUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_sale_repository_1.ProductSaleRepository])
], ProductSaleUseCase);
//# sourceMappingURL=product-sale.use-case.js.map