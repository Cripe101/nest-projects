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
exports.MongoProductSaleRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_sale_entity_1 = require("../../domain/entities/product-sale.entity");
const product_entity_1 = require("../../domain/entities/product.entity");
let MongoProductSaleRepository = class MongoProductSaleRepository {
    productSaleModel;
    productModel;
    constructor(productSaleModel, productModel) {
        this.productSaleModel = productSaleModel;
        this.productModel = productModel;
    }
    deductStock = async (productId, quantity) => {
        await this.productModel.findByIdAndUpdate({ _id: productId }, {
            $inc: { stock: quantity },
        });
    };
    async createProductSale(productSale) {
        const getProduct = await this.productModel.findById(productSale.productId);
        if (!getProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (getProduct?.stock < productSale.quantity) {
            throw new common_1.BadRequestException('Insufficient stock');
        }
        const totalPrice = getProduct?.sellingPrice * productSale.quantity;
        const totalProfit = (getProduct?.sellingPrice - getProduct?.buyingPrice) *
            productSale.quantity;
        const createdProductSale = await this.productSaleModel.create({
            productId: productSale.productId,
            quantity: productSale.quantity,
            sellingPrice: getProduct?.sellingPrice,
            buyingPrice: getProduct?.buyingPrice,
            totalPrice: totalPrice,
            profit: totalProfit,
        });
        if (!createdProductSale) {
            throw new common_1.NotAcceptableException('Provide valid datas');
        }
        this.deductStock(productSale.productId, -productSale.quantity);
        await getProduct?.save();
        return createdProductSale;
    }
    async getAllProductSales() {
        const productSale = await this.productSaleModel
            .find()
            .populate('productId');
        return productSale;
    }
    async getOneProductSale(id) {
        const productSale = await this.productSaleModel.findById(id);
        if (!productSale) {
            throw new common_1.NotFoundException('Product not found');
        }
        return productSale;
    }
    async getTotalSaleProfit() {
        const [summary] = await this.productSaleModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: '$profit' },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async deleteOneProductSale(id) {
        const productSale = await this.productSaleModel.findByIdAndDelete(id);
        if (!productSale) {
            throw new common_1.NotFoundException('Product not found');
        }
        return productSale;
    }
};
exports.MongoProductSaleRepository = MongoProductSaleRepository;
exports.MongoProductSaleRepository = MongoProductSaleRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_sale_entity_1.ProductSaleEntity.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.ProductEntity.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MongoProductSaleRepository);
//# sourceMappingURL=mongo-product-sale.repository.js.map