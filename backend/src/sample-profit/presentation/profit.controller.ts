import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProfitDto, UpdateProfitDto } from './dto/profit.dto';
import { ProfitUseCase } from 'src/sample-profit/application/use-cases/profit.use-case';

@Controller('profits')
export class ProfitController {
  constructor(private readonly profitUseCase: ProfitUseCase) {}

  @Post()
  createProfit(@Body() dto: CreateProfitDto) {
    return this.profitUseCase.createProfit(dto);
  }

  @Get()
  getAllProfits() {
    return this.profitUseCase.getAllProfits();
  }

  @Get('total')
  getTotalProfit() {
    return this.profitUseCase.getTotalProfit();
  }

  @Get('month')
  getTotalProfitByMonth() {
    return this.profitUseCase.getTotalProfitByMonth();
  }

  @Get('day')
  getTotalProfitByDay() {
    return this.profitUseCase.getTotalProfitByDay();
  }

  @Get('phone')
  getPhoneTotalProfit() {
    return this.profitUseCase.getPhoneTotalProfit();
  }

  @Get('g-cash')
  getGcashTotalProfit() {
    return this.profitUseCase.getGcashTotalProfit();
  }

  @Get(':id')
  getProfitById(@Param('id') id: string) {
    return this.profitUseCase.getProfitById(id);
  }

  @Put(':id')
  updateProfit(
    @Param('id') id: string,
    @Body() updateProfitDto: UpdateProfitDto,
  ) {
    return this.profitUseCase.updateProfit(id, updateProfitDto);
  }

  @Delete(':id')
  deleteProfit(@Param('id') id: string) {
    return this.profitUseCase.deleteProfit(id);
  }
}
