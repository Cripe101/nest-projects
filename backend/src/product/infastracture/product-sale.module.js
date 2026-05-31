"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSaleModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_product_sale_repository_1 = require("./persistance/mongo-product-sale.repository");
const product_sale_controller_1 = require("../presentation/product-sale/product-sale.controller");
const product_sale_repository_1 = require("../domain/repositories/product-sale.repository");
const product_sale_entity_1 = require("../domain/entities/product-sale.entity");
const product_sale_schema_1 = require("../../schemas/product/product-sale.schema");
const product_entity_1 = require("../domain/entities/product.entity");
const product_schema_1 = require("../../schemas/product/product.schema");
const product_sale_use_case_1 = require("../application/use-case/product-sale.use-case");
let ProductSaleModule = class ProductSaleModule {
};
exports.ProductSaleModule = ProductSaleModule;
exports.ProductSaleModule = ProductSaleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: product_sale_entity_1.ProductSaleEntity.name,
                    schema: product_sale_schema_1.ProductSaleSchema,
                },
                {
                    name: product_entity_1.ProductEntity.name,
                    schema: product_schema_1.ProductSchema,
                },
            ]),
        ],
        controllers: [product_sale_controller_1.ProductSaleController],
        providers: [
            product_sale_use_case_1.ProductSaleUseCase,
            { provide: product_sale_repository_1.ProductSaleRepository, useClass: mongo_product_sale_repository_1.MongoProductSaleRepository },
        ],
    })
], ProductSaleModule);
//# sourceMappingURL=product-sale.module.js.map