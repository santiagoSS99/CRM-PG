import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tables } from 'src/tables/entities/table.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Tables)
    private tableRepository: Repository<Tables>,) { }

  // create order with table assigned
  async create(tableId, createOrderDto: CreateOrderDto) {
    console.log(tableId)
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['orders']
    })

    if (!table) throw new NotFoundException(`Table with id ${tableId} not found`)

    const order = this.orderRepository.create({
      ...createOrderDto,
      table
    });

    return this.orderRepository.save(order);
  }

  async findAll() {
    const orders = await this.orderRepository.
      createQueryBuilder('order')
      .leftJoinAndSelect('order.tables', 'tables')
      .getMany();
    console.log(orders)
    return;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
