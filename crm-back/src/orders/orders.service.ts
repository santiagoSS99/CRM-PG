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
  async create( createOrderDto: CreateOrderDto) {
    const { product, tableId, ...restOrder } = createOrderDto;
   
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
      // .leftJoinAndSelect('order.tables', 'tables')
      .getMany();
    return;
  }

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

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    let currentOrder: Order;
    currentOrder = await this.orderRepository.findOneBy({ id });

    if (!currentOrder) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    const {
      amount = currentOrder.amount,
      observations = currentOrder.observations,
      order_date = currentOrder.order_date,
      order_details = currentOrder.order_details,
      order_status = currentOrder.order_status,
      quantity = currentOrder.quantity,
      tableId = currentOrder.tableId
    } = updateOrderDto;

    await this.orderRepository.createQueryBuilder()
      .update(Order)
      .set({
        amount,
        observations,
        order_date,
        order_details,
        order_status,
        quantity,
        tableId
      })
      .where("id = :id", { id })
      .execute();

    currentOrder = await this.orderRepository.findOneBy({ id });
    if (!currentOrder) {
      throw new NotFoundException(`User with id ${id} not found`)
    }

    return { message: `Order with id ${id} updated succesfully`, currentOrder }
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
