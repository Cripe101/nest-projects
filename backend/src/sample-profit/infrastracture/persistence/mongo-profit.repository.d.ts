import { Model } from 'mongoose';
import { ProfitRepository } from '../../domain/repositories/profit.repository';
import { Profit } from '../../domain/entities/profit.entity';
import { UpdateProfitDto } from '../../presentation/dto/profit.dto';
export declare class MongoProfitRepository implements ProfitRepository {
    private readonly profitModel;
    constructor(profitModel: Model<Profit>);
    createProfit(profit: Profit): Promise<Profit>;
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
    getPhoneTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    getGcashTotalProfit(): Promise<{
        totalProfit: number;
    }>;
    updateProfit(id: string, updateProfitDto: UpdateProfitDto): Promise<import("mongoose").Document<unknown, {}, Profit, {}, import("mongoose").DefaultSchemaOptions> & Profit & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deleteProfit(id: string): Promise<Profit>;
}
