import { Injectable } from '@nestjs/common';
import { CreateCustomerActivityDto } from './dto/create-customer-activity.dto';
import { UpdateCustomerActivityDto } from './dto/update-customer-activity.dto';

@Injectable()
export class CustomerActivityService {
  create(createCustomerActivityDto: CreateCustomerActivityDto) {
    return 'This action adds a new customerActivity';
  }

  findAll() {
    return `This action returns all customerActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerActivity`;
  }

  update(id: number, updateCustomerActivityDto: UpdateCustomerActivityDto) {
    return `This action updates a #${id} customerActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerActivity`;
  }
}
