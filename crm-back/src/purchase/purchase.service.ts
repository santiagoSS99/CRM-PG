import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/products/entities';
import { Between, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>
  ) { }

  async create(customerId: string, productId: string, createPurchaseDto: CreatePurchaseDto) {
    const customer = await this.customerRepository.findOne({
      where: { t_number: customerId },
      relations: ['purchases']
    })

    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['purchases']
    })

    if (!customer) throw new NotFoundException(`Customer with id ${customerId} not found`);

    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);

    const total = product.price * createPurchaseDto.quantity
    console.log(total)

    const purchase = this.purchaseRepository.create({
      ...createPurchaseDto,
      product,
      customer,
      total
    })

    return this.purchaseRepository.save(purchase)
  }
  // Without customer register

  async createPurchaseWithoutCustomer(productId, createPurchaseDto) {
    const product = this.productRepository.findOne({
      where: { id: productId },
      relations: ['purchases']
    })

    if (!product) throw new NotFoundException(`Product with id ${productId} not found`)

    const purchaseWC = this.purchaseRepository.create({
      ...createPurchaseDto
    })

    return this.purchaseRepository.save(purchaseWC)
  }

  async findAll() {
    const purchases = await this.purchaseRepository.find()
    return purchases
  }

  async findAllToDashboard(res) {
    const today = new Date();
    const year = today.getFullYear();
    const firstyr = new Date(year, 0, 1);
    const lastyr = new Date(year, 11, 31, 23, 59, 59);

    const purchases = await this.purchaseRepository.find({
      where: {
        created_date: Between(firstyr, lastyr)
      }
    });

    const months = Array(12).fill(0);

    purchases.forEach(purchase => {
      const month = purchase.created_date.getMonth();
      months[month] += purchase.total;
    });

    return ({ data: months })
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
