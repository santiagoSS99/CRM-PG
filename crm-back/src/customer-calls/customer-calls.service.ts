import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCustomerCallDto } from './dto/create-customer-call.dto';
import { UpdateCustomerCallDto } from './dto/update-customer-call.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerCall } from './entities/customer-call.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class CustomerCallsService {

  private readonly logger = new Logger('CustomerCalls');

  constructor(
    @InjectRepository(CustomerCall)
    private readonly callRepo: Repository<CustomerCall>
  ) { }

  async create(createCustomerCallDto: CreateCustomerCallDto) {
    // return 'This action adds a new customerCall';
    try {
      const { ...call } = createCustomerCallDto
      const calls = this.callRepo.create({
        ...call
      })
      await this.callRepo.save(calls)
      return { calls, message: 'Call stored succesfully' }
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async findAll() {
    const calls = await this.callRepo.find()
    return { calls, message: 'retrieving all calls' };
  }

  async findOne(id: number) {

    const customerCall = await this.callRepo
      .createQueryBuilder('customerCall')
      .leftJoinAndSelect('customerCall.customer', 'customer')
      .where('customer.id = :customerId', { customerId: id }).getMany()

    return customerCall
  }

  update(id: number, updateCustomerCallDto: UpdateCustomerCallDto) {
    return `This action updates a #${id} customerCall`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerCall`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, please check the logs')
  }
}
