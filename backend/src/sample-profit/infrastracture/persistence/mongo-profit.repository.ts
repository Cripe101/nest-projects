import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfitRepository } from '../../domain/repositories/profit.repository';
import { Profit } from '../../domain/entities/profit.entity';
import { UpdateProfitDto } from '../../presentation/dto/profit.dto';

@Injectable()
export class MongoProfitRepository implements ProfitRepository {
  constructor(
    @InjectModel(Profit.name)
    private readonly profitModel: Model<Profit>,
  ) {}

  async createProfit(profit: Profit): Promise<Profit> {
    const created = new this.profitModel(profit);

    return created.save();
  }

  async getAllProfits(): Promise<Profit[]> {
    const profit = await this.profitModel.find();

    return profit;
  }

  async getProfitById(id: string): Promise<Profit | null> {
    const profit = await this.profitModel.findById(id);

    if (!profit) {
      throw new NotFoundException('Profit not found');
    }

    return profit;
  }

  async getTotalProfit(): Promise<{ totalProfit: number }> {
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

  async getTotalProfitByMonth(): Promise<{ totalProfit: number }> {
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

  async getTotalProfitByDay(): Promise<{ totalProfit: number }> {
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

  async getPhoneTotalProfit(): Promise<{ totalProfit: number }> {
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

  async getGcashTotalProfit(): Promise<{ totalProfit: number }> {
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

  async updateProfit(id: string, updateProfitDto: UpdateProfitDto) {
    const toBeUpdatedProfit = await this.profitModel.findByIdAndUpdate(
      id,
      updateProfitDto,
      {
        returnDocument: 'after',
      },
    );

    if (!toBeUpdatedProfit) {
      throw new NotFoundException('Profit not found');
    }

    return toBeUpdatedProfit;
  }

  async deleteProfit(id: string): Promise<Profit> {
    const profit = await this.profitModel.findByIdAndDelete(id);

    if (!profit) {
      throw new NotFoundException('Profit not found');
    }

    return profit;
  }
}
