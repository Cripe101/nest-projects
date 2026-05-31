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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSaleController = void 0;
const common_1 = require("@nestjs/common");
const product_sale_dto_1 = require("./dto/product-sale.dto");
const product_sale_use_case_1 = require("../../application/use-case/product-sale.use-case");
let ProductSaleController = class ProductSaleController {
    productSaleUseCase;
    constructor(productSaleUseCase) {
        this.productSaleUseCase = productSaleUseCase;
    }
    createProductSale(dto) {
        return this.productSaleUseCase.createProductSale(dto);
    }
    getAllProductSales() {
        return this.productSaleUseCase.getAllProductSales();
    }
    getTotalSaleProfit() {
        return this.productSaleUseCase.getTotalSaleProfit();
    }
    getOneProductSale(id) {
        return this.productSaleUseCase.getOneProductSale(id);
    }
    deleteOneProductSale(id) {
        return this.productSaleUseCase.deleteOneProductSale(id);
    }
};
exports.ProductSaleController = ProductSaleController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_sale_dto_1.CreateProductSaleDto]),
    __metadata("design:returntype", void 0)
], ProductSaleController.prototype, "createProductSale", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductSaleController.prototype, "getAllProductSales", null);
__decorate([
    (0, common_1.Get)('total-profit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductSaleController.prototype, "getTotalSaleProfit", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductSaleController.prototype, "getOneProductSale", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductSaleController.prototype, "deleteOneProductSale", null);
exports.ProductSaleController = ProductSaleController = __decorate([
    (0, common_1.Controller)('product-sales'),
    __metadata("design:paramtypes", [product_sale_use_case_1.ProductSaleUseCase])
], ProductSaleController);
//# sourceMappingURL=product-sale.controller.js.map