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
exports.ProfitUseCase = void 0;
const common_1 = require("@nestjs/common");
const profit_repository_1 = require("../../domain/repositories/profit.repository");
const profit_entity_1 = require("../../domain/entities/profit.entity");
let ProfitUseCase = class ProfitUseCase {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async createProfit(dto) {
        const profit = new profit_entity_1.Profit(dto.amount, dto.description, new Date(dto.date));
        return this.repository.createProfit(profit);
    }
    async getAllProfits() {
        return this.repository.getAllProfits();
    }
    async getProfitById(id) {
        return this.repository.getProfitById(id);
    }
    async getTotalProfit() {
        return this.repository.getTotalProfit();
    }
    async getTotalProfitByMonth() {
        return this.repository.getTotalProfitByMonth();
    }
    async getTotalProfitByDay() {
        return this.repository.getTotalProfitByDay();
    }
    async updateProfit(id, updateProfitDto) {
        return this.repository.updateProfit(id, updateProfitDto);
    }
    async deleteProfit(id) {
        return this.repository.deleteProfit(id);
    }
    async getPhoneTotalProfit() {
        return this.repository.getPhoneTotalProfit();
    }
    async getGcashTotalProfit() {
        return this.repository.getGcashTotalProfit();
    }
};
exports.ProfitUseCase = ProfitUseCase;
exports.ProfitUseCase = ProfitUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profit_repository_1.ProfitRepository])
], ProfitUseCase);
//# sourceMappingURL=profit.use-case.js.map