import { Module } from '@nestjs/common';
import { CustomerCallsService } from './customer-calls.service';
import { CustomerCallsController } from './customer-calls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerCall } from './entities/customer-call.entity';

@Module({
  controllers: [CustomerCallsController],
  providers: [CustomerCallsService],
  imports: [TypeOrmModule.forFeature([CustomerCall])]
})
export class CustomerCallsModule { }
