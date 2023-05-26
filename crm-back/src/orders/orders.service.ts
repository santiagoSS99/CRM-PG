import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tables } from 'src/tables/entities/table.entity';
import { Equal, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Tables)
    private tableRepository: Repository<Tables>,
  ) { }

  // create order with table assigned
  async create(tableId, createOrderDto: CreateOrderDto) {
    const { product, ...restOrder } = createOrderDto;

    console.log(tableId);
    console.log(product, 'im priduyctttt');
    const table = await this.tableRepository.findOne({
      where: { id: tableId },
      relations: ['orders']
    });

    if (!table) {
      throw new NotFoundException(`Table with id ${tableId} not found`);
    }

    const order = this.orderRepository.create({
      ...restOrder,
      product: product,
      table,
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

  // async getProductsByTableId(tableId: any) {

  //   const table = await this.tableRepository.find({
  //     where: { id: tableId }
  //   })

  //   console.log(table)
  //   const orders = await this.orderRepository.find({
  //     where: { table: tableId },
  //   });

  //   console.log(orders)

  //   if (!orders) {
  //     throw new NotFoundException(`No orders found for table with ID ${tableId}`);
  //   }

  //   return orders;
  // }

  async getProductsByTableId(tableId: any) {
    const orders = await this.orderRepository.find({
      where: {
        table: {
          id: tableId,
        },
        order_status: {
          id: "1", // Aquí puedes especificar el orderStatusId que deseas filtrar
        },
      },
    });

    if (orders.length === 0) {
      throw new NotFoundException(`No orders found for table with ID ${tableId}`);
    }

    return orders;
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
