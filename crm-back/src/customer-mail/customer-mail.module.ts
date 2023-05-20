import { Module } from '@nestjs/common';
import { CustomerMailService } from './customer-mail.service';
import { CustomerMailController } from './customer-mail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerMail } from './entities/customer-mail.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Module({
  controllers: [CustomerMailController],
  providers: [CustomerMailService],
  imports: [TypeOrmModule.forFeature([CustomerMail, Customer])]
})
export class CustomerMailModule { }
