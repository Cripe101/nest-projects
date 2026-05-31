"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfitModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const profit_schema_1 = require("./persistence/profit.schema");
const profit_controller_1 = require("../presentation/profit.controller");
const profit_repository_1 = require("../domain/repositories/profit.repository");
const mongo_profit_repository_1 = require("./persistence/mongo-profit.repository");
const profit_use_case_1 = require("../application/use-cases/profit.use-case");
let ProfitModule = class ProfitModule {
};
exports.ProfitModule = ProfitModule;
exports.ProfitModule = ProfitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'Profit',
                    schema: profit_schema_1.ProfitSchema,
                },
            ]),
        ],
        controllers: [profit_controller_1.ProfitController],
        providers: [
            profit_use_case_1.ProfitUseCase,
            { provide: profit_repository_1.ProfitRepository, useClass: mongo_profit_repository_1.MongoProfitRepository },
        ],
    })
], ProfitModule);
//# sourceMappingURL=profit.module.js.map