import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/products/entities';
import { PurchaseLine } from 'src/purchase-line/entities/purchase-line.entity';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [TypeOrmModule.forFeature([Customer, Product, Purchase, PurchaseLine])]
})
export class PurchaseModule { }
