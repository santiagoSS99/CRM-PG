import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseLineDto } from './dto/create-purchase-line.dto';
import { UpdatePurchaseLineDto } from './dto/update-purchase-line.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PurchaseLine } from './entities/purchase-line.entity';
import { Product } from 'src/products/entities';

@Injectable()
export class PurchaseLineService {

  constructor(
    @InjectRepository(PurchaseLine)
    private purchaseLineRepository: Repository<PurchaseLine>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  // async create(createPurchaseLineDto: CreatePurchaseLineDto) {
  //   const { products, ...purchaseLine } = createPurchaseLineDto

  //   const productFound = await this.productRepository.findOne({
  //     where: { id: products[0].id },
  //   });

  //   if (!productFound) throw new NotFoundException('No se encuentra el producto')

  //   console.log(productFound)
  //   console.log(createPurchaseLineDto)

  //   const total = productFound.price * createPurchaseLineDto.quantity

  //   const purchaseL = await this.purchaseLineRepo.create({
  //     ...purchaseLine,
  //     product: productFound,
  //     total,
  //   })
  //   console.log(purchaseL)

  //   return this.purchaseLineRepo.save(purchaseL)
  // }

  async create(createPurchaseLineDto: CreatePurchaseLineDto) {
    const { products, ...purchaseLine } = createPurchaseLineDto;

    const productPromises = products.map(async (productId: any) => {
      const productFound = await this.productRepository.findOne({
        where: { id: productId },
      });

      if (!productFound) throw new NotFoundException('No se encuentra el producto');

      const total = productFound.price * purchaseLine.quantity;

      return this.purchaseLineRepository.create({
        ...purchaseLine,
        product: productFound,
        total,
      });
    });

    const purchaseLines = await Promise.all(productPromises);

    return this.purchaseLineRepository.save(purchaseLines);
  }

  async findDataSalesPerMonth(res) {
    const today = new Date();
    const year = today.getFullYear();
    const firstyr = new Date(year, 0, 1);
    const lastyr = new Date(year, 11, 31, 23, 59, 59);

    const purchases = await this.purchaseLineRepository.find({
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




  findAll() {
    return `This action returns all purchaseLine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchaseLine`;
  }

  update(id: number, updatePurchaseLineDto: UpdatePurchaseLineDto) {
    return `This action updates a #${id} purchaseLine`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchaseLine`;
  }
}
