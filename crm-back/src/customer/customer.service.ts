import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { isUUID } from 'class-validator';

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

  async findAll() {
    const customers = await this.customerRepo.find();
    return customers;
  }

  async findOne(id: number) {
    let customer: Customer;
    customer = await this.customerRepo.findOneBy({ id: String(id) });


    if (!customer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return customer
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    let currentCustomer: Customer;
    currentCustomer = await this.customerRepo.findOneBy({ id: String(id) });
  
    if (!currentCustomer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    const {
      name = currentCustomer.name,
      surnames = currentCustomer.surnames,
      country = currentCustomer.country,
      email = currentCustomer.email,
      t_number = currentCustomer.t_number,
      gender = currentCustomer.gender,
      f_birthday = currentCustomer.f_birthday,
      notifications = currentCustomer.notifications
    } = updateCustomerDto;

    await this.customerRepo.createQueryBuilder()
      .update(Customer)
      .set({
        name,
        surnames,
        country,
        email,
        t_number,
        gender,
        f_birthday,
        notifications
      })
      .where("id = :id", { id })
      .execute();

    currentCustomer = await this.customerRepo.findOneBy({ id: String(id) });
    if (!currentCustomer) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return { message: `User with id ${id} updated succesfully`, customer: currentCustomer }
  }

  async remove(id: number) {
    try{
      const customer = await this.customerRepo.findOneBy({ id: String(id) });
      await this.customerRepo.remove(customer);
      return `This action removed the customer with id #${id}`;
    }catch(error){
      this.handleDBExceptions(error);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, please check the logs')
  }
}
