import { Module } from '@nestjs/common';
import { CustomerInterestService } from './customer-interest.service';
import { CustomerInterestController } from './customer-interest.controller';

@Module({
  controllers: [CustomerInterestController],
  providers: [CustomerInterestService]
})
export class CustomerInterestModule {}
