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
exports.MongoProfitRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const profit_entity_1 = require("../../domain/entities/profit.entity");
let MongoProfitRepository = class MongoProfitRepository {
    profitModel;
    constructor(profitModel) {
        this.profitModel = profitModel;
    }
    async createProfit(profit) {
        const created = new this.profitModel(profit);
        return created.save();
    }
    async getAllProfits() {
        const profit = await this.profitModel.find();
        return profit;
    }
    async getProfitById(id) {
        const profit = await this.profitModel.findById(id);
        if (!profit) {
            throw new common_1.NotFoundException('Profit not found');
        }
        return profit;
    }
    async getTotalProfit() {
        const [summary] = await this.profitModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: '$amount' },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async getTotalProfitByMonth() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const [summary] = await this.profitModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfMonth,
                        $lt: endOfMonth,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: '$amount' },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async getTotalProfitByDay() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const [summary] = await this.profitModel.aggregate([
            {
                $match: {
                    date: {
                        $gte: startOfDay,
                        $lte: endOfDay,
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalProfit: {
                        $sum: '$amount',
                    },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async getPhoneTotalProfit() {
        const [summary] = await this.profitModel.aggregate([
            {
                $match: {
                    description: 'Phone',
                },
            },
            {
                $group: {
                    _id: null,
                    totalProfit: {
                        $sum: '$amount',
                    },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async getGcashTotalProfit() {
        const [summary] = await this.profitModel.aggregate([
            {
                $match: {
                    description: 'G-cash',
                },
            },
            {
                $group: {
                    _id: null,
                    totalProfit: {
                        $sum: '$amount',
                    },
                },
            },
        ]);
        return {
            totalProfit: summary?.totalProfit ?? 0,
        };
    }
    async updateProfit(id, updateProfitDto) {
        const toBeUpdatedProfit = await this.profitModel.findByIdAndUpdate(id, updateProfitDto, {
            returnDocument: 'after',
        });
        if (!toBeUpdatedProfit) {
            throw new common_1.NotFoundException('Profit not found');
        }
        return toBeUpdatedProfit;
    }
    async deleteProfit(id) {
        const profit = await this.profitModel.findByIdAndDelete(id);
        if (!profit) {
            throw new common_1.NotFoundException('Profit not found');
        }
        return profit;
    }
};
exports.MongoProfitRepository = MongoProfitRepository;
exports.MongoProfitRepository = MongoProfitRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(profit_entity_1.Profit.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoProfitRepository);
//# sourceMappingURL=mongo-profit.repository.js.map