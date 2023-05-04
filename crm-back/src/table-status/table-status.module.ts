import { Module } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { TableStatusController } from './table-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableStatus } from './entities/table-status.entity';

@Module({
  controllers: [TableStatusController],
  providers: [TableStatusService],
  imports: [TypeOrmModule.forFeature([TableStatus])]
})
export class TableStatusModule { }
