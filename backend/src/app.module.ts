import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfitModule } from './sample-profit/infrastracture/profit.module';
import { ProductModule } from './infastracture/product.module';
import { ProductSaleModule } from './infastracture/persistence/product-sale.module';

@Module({
  imports: [
    ProfitModule,
    ProductModule,
    ProductSaleModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        'mongodb+srv://admin:admin1234@clusterprofittracker.a6bkq5h.mongodb.net/?appName=ClusterProfitTracker',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
