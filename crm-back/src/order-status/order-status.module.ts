import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order-status.entity';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService],
  imports: [TypeOrmModule.forFeature([OrderStatus])]
})
export class OrderStatusModule { }
