import { CreateProfitDto, UpdateProfitDto } from './dto/profit.dto';
import { ProfitUseCase } from '../application/use-cases/profit.use-case';
export declare class ProfitController {
    private readonly profitUseCase;
    constructor(profitUseCase: ProfitUseCase);
    createProfit(dto: CreateProfitDto): Promise<import("../domain/entities/profit.entity").Profit>;
    getAllProfits(): Promise<import("../domain/entities/profit.entity").Profit[]>;
    getTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getTotalProfitByMonth(): Promise<{
        totalProfit: number;
    }>;
    getTotalProfitByDay(): Promise<{
        totalProfit: number;
    }>;
    getPhoneTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getGcashTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getProfitById(id: string): Promise<import("../domain/entities/profit.entity").Profit | null>;
    updateProfit(id: string, updateProfitDto: UpdateProfitDto): Promise<import("../domain/entities/profit.entity").Profit>;
    deleteProfit(id: string): Promise<import("../domain/entities/profit.entity").Profit>;
}
