import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfitModule } from './sample-profit/infrastracture/profit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSaleModule } from './product-sale/infastracture/product-sale.module';
import { ProductModule } from './product/infastracture/product.module';
import { UserModule } from './user/infastracture/user.module';

@Module({
  imports: [
    ProfitModule,
    ProductModule,
    ProductSaleModule,
    UserModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI ??
        'mongodb+srv://admin:admin1234@clusterprofittracker.a6bkq5h.mongodb.net/?appName=ClusterProfitTracker',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
