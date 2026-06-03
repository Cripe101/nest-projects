import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfitModule } from './sample-profit/infrastracture/profit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSaleModule } from './product-sale/infastracture/product-sale.module';
import { ProductModule } from './product/infastracture/product.module';
import { UserModule } from './user/infastracture/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/infastracture/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ProfitModule,
    ProductModule,
    ProductSaleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
