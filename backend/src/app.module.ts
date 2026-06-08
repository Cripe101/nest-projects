import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfitModule } from './module/sample-profit/infrastracture/profit.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSaleModule } from './module/product-sale/product-sale.module';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from './module/auth/auth.module';
import { InventoryModule } from './module/inventory/inventory.module';
import { ProductModule } from './module/product/product.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ProfitModule,
    ProductModule,
    ProductSaleModule,
    UserModule,
    AuthModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
