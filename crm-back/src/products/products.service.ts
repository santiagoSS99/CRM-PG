import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuid } from 'uuid'

@Injectable()
export class ProductsService {
  private products: Product[]

  async create(createProductDto: CreateProductDto) {
    // const product: Product = {
    //   id: uuid(),
    //   product_name: createProductDto.product_name,
    //   price: createProductDto.price,
    //   description: createProductDto.description,
    //   quantity: createProductDto.quantity,
    //   imageURL: createProductDto.imageURL,
    //   provider: createProductDto.provider,
    //   barcode: createProductDto.barcode,
    //   createdAt: new Date().getTime()
    // }
    // this.products.push(product)
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
