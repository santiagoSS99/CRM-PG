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
}
