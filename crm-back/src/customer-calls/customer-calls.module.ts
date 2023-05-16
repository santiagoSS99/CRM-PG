import { Module } from '@nestjs/common';
import { CustomerCallsService } from './customer-calls.service';
import { CustomerCallsController } from './customer-calls.controller';

@Module({
  controllers: [CustomerCallsController],
  providers: [CustomerCallsService]
})
export class CustomerCallsModule {}
