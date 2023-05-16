import { Module } from '@nestjs/common';
import { CustomerMailService } from './customer-mail.service';
import { CustomerMailController } from './customer-mail.controller';

@Module({
  controllers: [CustomerMailController],
  providers: [CustomerMailService]
})
export class CustomerMailModule {}
