"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profit = void 0;
const common_1 = require("@nestjs/common");
class Profit {
    amount;
    description;
    date;
    constructor(amount, description, date) {
        this.amount = amount;
        this.description = description;
        this.date = date;
        if (amount < 0) {
            throw new common_1.NotAcceptableException('Profit amount cannot be negative');
        }
    }
}
exports.Profit = Profit;
//# sourceMappingURL=profit.entity.js.map