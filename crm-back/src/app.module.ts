import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
// import { typeOrmConfig } from './config/config';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { CustomerModule } from './customer/customer.module';
import { FilesModule } from './files/files.module';
import { ChatController } from './chat/chat.controller';
import { ChatService } from './chat/chat.service';
import { AuthModule } from './auth/auth.module';


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
      // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true
    }),
    ProductsModule,
    CommonModule,
    CustomerModule,
    FilesModule,
    AuthModule
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class AppModule {
}
