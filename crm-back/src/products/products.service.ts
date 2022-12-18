import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {
  }


  async create(createProductDto: CreateProductDto) {

    try {
      const product = this.productRepo.create(createProductDto);
      await this.productRepo.save(product)
      return product
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  findAll() {
    return this.productRepo.find({});
  }

  async findOne(id: string) {

    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`product with id ${id} not found`)
    }

    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, please check the logs')
  }
}
