import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfitSchema } from './persistence/profit.schema';
import { ProfitController } from '../presentation/profit.controller';
import { ProfitRepository } from '../domain/repositories/profit.repository';
import { MongoProfitRepository } from './persistence/mongo-profit.repository';
import { ProfitUseCase } from '../application/use-cases/profit.use-case';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Profit',
        schema: ProfitSchema,
      },
    ]),
  ],
  controllers: [ProfitController],
  providers: [
    ProfitUseCase,
    { provide: ProfitRepository, useClass: MongoProfitRepository },
    // MongoProfitRepository,
  ],
})
export class ProfitModule {}
