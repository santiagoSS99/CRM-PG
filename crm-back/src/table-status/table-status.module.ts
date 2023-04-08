import { Module } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { TableStatusController } from './table-status.controller';

@Module({
  controllers: [TableStatusController],
  providers: [TableStatusService]
})
export class TableStatusModule {}
