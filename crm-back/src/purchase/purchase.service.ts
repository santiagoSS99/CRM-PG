import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/products/entities';
import { Between, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseLine } from 'src/purchase-line/entities/purchase-line.entity';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto) {

    const { ...purchaseHeaderDetail } = createPurchaseDto

    const purchase = await this.purchaseRepository.create({
      ...purchaseHeaderDetail
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

  // async getPaymentMethodtoDash(){
  //   const method = await this.purchaseRepository.find({})

  //   const pmethod = method.map(({paymentMethod}) => paymentMethod)

  //   return
  // }

  async getPaymentMethodtoDash() {
    const purchases = await this.purchaseRepository.find({});
    const paymentMethods = purchases.map(({ paymentMethod }) => paymentMethod);

    // Calcular la frecuencia de cada método de pago
    const paymentMethodCounts = paymentMethods.reduce((counts, paymentMethod) => {
      counts[paymentMethod] = (counts[paymentMethod] || 0) + 1;
      return counts;
    }, {});

    // Ordenar los métodos de pago por frecuencia de mayor a menor
    // const sortedPaymentMethods = Object.entries(paymentMethodCounts).sort((a, b) => b[1] - a[1]);

    // Extraer los nombres de los métodos de pago
    // const paymentMethodNames = sortedPaymentMethods.map(([paymentMethod]) => paymentMethod);

    return { data: paymentMethodCounts };
  }

  // async getTopVisitingCustomers(): Promise<{ customerId: number; visitCount: number }[]> {
  //   const query = this.purchaseRepository.createQueryBuilder('purchase')
  //     .select('purchase.customerId', 'customerId')
  //     .addSelect('COUNT(purchase.customerId)', 'visitCount')
  //     .groupBy('purchase.customerId')
  //     .orderBy('visitCount', 'DESC')
  //     .limit(10);

  //   return query.getRawMany();
  // }

  async getTopVisitingCustomers(): Promise<{ customerId: number; visitCount: number; customerName: string }[]> {
    const query = this.purchaseRepository.createQueryBuilder('purchase')
      .select('purchase.customerId', 'customerId')
      .addSelect('COUNT(purchase.customerId)', 'visitCount')
      .addSelect('customer.name', 'customerName')
      .leftJoin(Customer, 'customer', 'customer.id = purchase.customerId')
      .groupBy('purchase.customerId')
      .orderBy('visitCount', 'DESC')
      .limit(10);

    return query.getRawMany();
  }

  async getPaymentMethod(): Promise<{ customerId: number; visitCount: number; customerName: string }[]> {
    const query = this.purchaseRepository.createQueryBuilder('purchase')
      .select('purchase.paymentMethod', 'paymentMethod')
      .addSelect('COUNT(purchase.paymentMethod)', 'countPayment')
      .groupBy('purchase.paymentMethod')
      .orderBy('paymentMethod', 'DESC')

    return query.getRawMany();
  }



}
