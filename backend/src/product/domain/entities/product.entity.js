"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
const common_1 = require("@nestjs/common");
class ProductEntity {
    productName;
    productCategory;
    buyingPrice;
    sellingPrice;
    stock;
    description;
    imageUrl;
    constructor(productName, productCategory, buyingPrice, sellingPrice, stock, description, imageUrl) {
        this.productName = productName;
        this.productCategory = productCategory;
        this.buyingPrice = buyingPrice;
        this.sellingPrice = sellingPrice;
        this.stock = stock;
        this.description = description;
        this.imageUrl = imageUrl;
        if (stock < 0) {
            throw new common_1.NotAcceptableException('Stock cannot be negative');
        }
        if (buyingPrice < 0) {
            throw new common_1.NotAcceptableException('Buying Price cannot be negative');
        }
        if (sellingPrice < 0) {
            throw new common_1.NotAcceptableException('Selling price cannot be negative');
        }
    }
}
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map