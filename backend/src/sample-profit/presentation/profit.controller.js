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
exports.ProfitController = void 0;
const common_1 = require("@nestjs/common");
const profit_dto_1 = require("./dto/profit.dto");
const profit_use_case_1 = require("../application/use-cases/profit.use-case");
let ProfitController = class ProfitController {
    profitUseCase;
    constructor(profitUseCase) {
        this.profitUseCase = profitUseCase;
    }
    createProfit(dto) {
        return this.profitUseCase.createProfit(dto);
    }
    getAllProfits() {
        return this.profitUseCase.getAllProfits();
    }
    getTotalProfit() {
        return this.profitUseCase.getTotalProfit();
    }
    getTotalProfitByMonth() {
        return this.profitUseCase.getTotalProfitByMonth();
    }
    getTotalProfitByDay() {
        return this.profitUseCase.getTotalProfitByDay();
    }
    getPhoneTotalProfit() {
        return this.profitUseCase.getPhoneTotalProfit();
    }
    getGcashTotalProfit() {
        return this.profitUseCase.getGcashTotalProfit();
    }
    getProfitById(id) {
        return this.profitUseCase.getProfitById(id);
    }
    updateProfit(id, updateProfitDto) {
        return this.profitUseCase.updateProfit(id, updateProfitDto);
    }
    deleteProfit(id) {
        return this.profitUseCase.deleteProfit(id);
    }
};
exports.ProfitController = ProfitController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profit_dto_1.CreateProfitDto]),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "createProfit", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getAllProfits", null);
__decorate([
    (0, common_1.Get)('total'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getTotalProfit", null);
__decorate([
    (0, common_1.Get)('month'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getTotalProfitByMonth", null);
__decorate([
    (0, common_1.Get)('day'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getTotalProfitByDay", null);
__decorate([
    (0, common_1.Get)('phone'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getPhoneTotalProfit", null);
__decorate([
    (0, common_1.Get)('g-cash'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getGcashTotalProfit", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "getProfitById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, profit_dto_1.UpdateProfitDto]),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "updateProfit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProfitController.prototype, "deleteProfit", null);
exports.ProfitController = ProfitController = __decorate([
    (0, common_1.Controller)('profits'),
    __metadata("design:paramtypes", [profit_use_case_1.ProfitUseCase])
], ProfitController);
//# sourceMappingURL=profit.controller.js.map