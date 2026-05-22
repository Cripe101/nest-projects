import { Profit } from '../entities/profit.entity';

export abstract class ProfitRepository {
  abstract createProfit(profit: Profit): Promise<Profit>;
  abstract getAllProfits(): Promise<Profit[]>;
  abstract getProfitById(id: string): Promise<Profit | null>;
  abstract getTotalProfit(): Promise<{ totalProfit: number }>;
  abstract getTotalProfitByMonth(): Promise<{ totalProfit: number }>;
  abstract getTotalProfitByDay(): Promise<{ totalProfit: number }>;
  abstract updateProfit(id: string, profit: Profit): Promise<Profit>;
  abstract deleteProfit(id: string): Promise<Profit>;
  abstract getPhoneTotalProfit(): Promise<{ totalProfit: number }>;
  abstract getGcashTotalProfit(): Promise<{ totalProfit: number }>;
}
