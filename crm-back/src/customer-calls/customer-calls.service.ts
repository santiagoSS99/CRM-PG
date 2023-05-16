import { Injectable } from '@nestjs/common';
import { CreateCustomerCallDto } from './dto/create-customer-call.dto';
import { UpdateCustomerCallDto } from './dto/update-customer-call.dto';

@Injectable()
export class CustomerCallsService {
  create(createCustomerCallDto: CreateCustomerCallDto) {
    return 'This action adds a new customerCall';
  }

  findAll() {
    return `This action returns all customerCalls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerCall`;
  }

  update(id: number, updateCustomerCallDto: UpdateCustomerCallDto) {
    return `This action updates a #${id} customerCall`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerCall`;
  }
}
