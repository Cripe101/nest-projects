"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const profit_module_1 = require("./sample-profit/infrastracture/profit.module");
const mongoose_1 = require("@nestjs/mongoose");
const product_sale_module_1 = require("./product/infastracture/product-sale.module");
const product_module_1 = require("./product/infastracture/product.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            profit_module_1.ProfitModule,
            product_module_1.ProductModule,
            product_sale_module_1.ProductSaleModule,
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI ??
                'mongodb+srv://admin:admin1234@clusterprofittracker.a6bkq5h.mongodb.net/?appName=ClusterProfitTracker'),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map