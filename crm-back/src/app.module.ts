import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
// import { typeOrmConfig } from './config/config';
import { ProductsModule } from './products/products.module';


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
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
