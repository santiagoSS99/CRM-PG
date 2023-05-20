import { Injectable } from '@nestjs/common';
import { CreateCustomerInterestDto } from './dto/create-customer-interest.dto';
import { UpdateCustomerInterestDto } from './dto/update-customer-interest.dto';

@Injectable()
export class CustomerInterestService {
  create(createCustomerInterestDto: CreateCustomerInterestDto) {
    return 'This action adds a new customerInterest';
  }

  findAll() {
    return `This action returns all customerInterest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerInterest`;
  }

  update(id: number, updateCustomerInterestDto: UpdateCustomerInterestDto) {
    return `This action updates a #${id} customerInterest`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerInterest`;
  }
}
