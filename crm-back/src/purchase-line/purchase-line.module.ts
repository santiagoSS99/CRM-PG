import { Module } from '@nestjs/common';
import { PurchaseLineService } from './purchase-line.service';
import { PurchaseLineController } from './purchase-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseLine } from './entities/purchase-line.entity';
import { Product } from 'src/products/entities';

@Module({
  controllers: [PurchaseLineController],
  providers: [PurchaseLineService],
  imports: [TypeOrmModule.forFeature([PurchaseLine, Product])]
})
export class PurchaseLineModule { }
