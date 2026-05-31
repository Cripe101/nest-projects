import { ProfitRepository } from '../../domain/repositories/profit.repository';
import { CreateProfitDto, UpdateProfitDto } from '../../presentation/dto/profit.dto';
import { Profit } from '../../domain/entities/profit.entity';
export declare class ProfitUseCase {
    private readonly repository;
    constructor(repository: ProfitRepository);
    createProfit(dto: CreateProfitDto): Promise<Profit>;
    getAllProfits(): Promise<Profit[]>;
    getProfitById(id: string): Promise<Profit | null>;
    getTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getTotalProfitByMonth(): Promise<{
        totalProfit: number;
    }>;
    getTotalProfitByDay(): Promise<{
        totalProfit: number;
    }>;
    updateProfit(id: string, updateProfitDto: UpdateProfitDto): Promise<Profit>;
    deleteProfit(id: string): Promise<Profit>;
    getPhoneTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getGcashTotalProfit(): Promise<{
        totalProfit: number;
    }>;
}
