"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSaleEntity = void 0;
const common_1 = require("@nestjs/common");
class ProductSaleEntity {
    productId;
    quantity;
    sellingPrice;
    buyingPrice;
    totalPrice;
    profit;
    constructor(productId, quantity, sellingPrice, buyingPrice, totalPrice, profit) {
        this.productId = productId;
        this.quantity = quantity;
        this.sellingPrice = sellingPrice;
        this.buyingPrice = buyingPrice;
        this.totalPrice = totalPrice;
        this.profit = profit;
        if (quantity < 0) {
            throw new common_1.NotAcceptableException('Quantity cannot be negative');
        }
        if (totalPrice < 0) {
            throw new common_1.NotAcceptableException('Total Price cannot be negative');
        }
        if (profit < 0) {
            throw new common_1.NotAcceptableException('Profit cannot be negative');
        }
    }
}
exports.ProductSaleEntity = ProductSaleEntity;
//# sourceMappingURL=product-sale.entity.js.map