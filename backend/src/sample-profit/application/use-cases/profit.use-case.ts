import { Injectable } from '@nestjs/common';
import { Profit } from 'src/sample-profit/domain/entities/profit.entity';
import { ProfitRepository } from 'src/sample-profit/domain/repositories/profit.repository';
import {
  CreateProfitDto,
  UpdateProfitDto,
} from 'src/sample-profit/presentation/dto/profit.dto';

@Injectable()
export class ProfitUseCase {
  constructor(private readonly repository: ProfitRepository) {}

  async createProfit(dto: CreateProfitDto) {
    const profit = new Profit(dto.amount, dto.description, new Date(dto.date));

    return this.repository.createProfit(profit);
  }

  async getAllProfits() {
    return this.repository.getAllProfits();
  }

  async getProfitById(id: string) {
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

  async updateProfit(id: string, updateProfitDto: UpdateProfitDto) {
    return this.repository.updateProfit(id, updateProfitDto);
  }

  async deleteProfit(id: string) {
    return this.repository.deleteProfit(id);
  }

  async getPhoneTotalProfit() {
    return this.repository.getPhoneTotalProfit();
  }

  async getGcashTotalProfit() {
    return this.repository.getGcashTotalProfit();
  }
}
