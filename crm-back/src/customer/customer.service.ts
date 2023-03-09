import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {

  private readonly logger = new Logger('CostumerService');

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>
  ) { }
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const { ...costumer } = createCustomerDto
      const client = this.customerRepo.create({
        ...costumer
      });
      await this.customerRepo.save(client)
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, please check the logs')
  }
}
