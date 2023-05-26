import { Injectable } from '@nestjs/common';
import { CreateOrderStatusDto } from './dto/create-order-status.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderStatus } from './entities/order-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderStatusService {

  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>
  ) { }

  async findAll() {
    const orderStatus = await this.orderStatusRepository.find()
    return orderStatus
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStatus`;
  }

  update(id: number, updateOrderStatusDto: UpdateOrderStatusDto) {
    return `This action updates a #${id} orderStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
