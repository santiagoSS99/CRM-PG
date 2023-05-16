import { Injectable } from '@nestjs/common';
import { CreateCustomerMailDto } from './dto/create-customer-mail.dto';
import { UpdateCustomerMailDto } from './dto/update-customer-mail.dto';

@Injectable()
export class CustomerMailService {
  create(createCustomerMailDto: CreateCustomerMailDto) {
    return 'This action adds a new customerMail';
  }

  findAll() {
    return `This action returns all customerMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerMail`;
  }

  update(id: number, updateCustomerMailDto: UpdateCustomerMailDto) {
    return `This action updates a #${id} customerMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerMail`;
  }
}
