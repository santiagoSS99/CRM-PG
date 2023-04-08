import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CustomerModule } from './customer/customer.module';
import { FilesModule } from './files/files.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';
import { OrdersModule } from './orders/orders.module';
import { TablesModule } from './tables/tables.module';
import { SalesModule } from './sales/sales.module';
import { join } from 'path';
import { TableStatusModule } from './table-status/table-status.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      // host: 'localhost',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    }),
    ProductsModule,
    CommonModule,
    CustomerModule,
    FilesModule,
    AuthModule,
    ReservationsModule,
    OrdersModule,
    TablesModule,
    SalesModule,
    TableStatusModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class AppModule {
}
