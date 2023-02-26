import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tables } from './entities/table.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  controllers: [TablesController],
  providers: [TablesService],
  imports: [TypeOrmModule.forFeature([Tables, Reservation, Order])]
})
export class TablesModule { }
