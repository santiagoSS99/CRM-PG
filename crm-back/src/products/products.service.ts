import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { validate as isUUID } from 'uuid'
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common/exceptions';
import { NotFoundException } from '@nestjs/common';
// import { isUUID } from 'class-validator';
import { ProductImage, Product } from './entities';
import { PaginatioonDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');
  constructor(

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(ProductImage)
    private readonly productImageRepo: Repository<ProductImage>,

    private readonly dataSource: DataSource,

  ) {
  }

  async findAll(paginationDto: PaginatioonDto) {

    const { limit = 10, offset = 0 } = paginationDto
    const products = await this.productRepo.find({
      take: limit,
      skip: offset,
      relations: {
        images: true
      }
    });

    return products.map((product) => ({
      ...product,
      images: product.images.map(img => img.url)
    }))
  }

  async create(createProductDto: CreateProductDto) {

    try {

      const { images = [], ...productDetails } = createProductDto

      const product = this.productRepo.create({
        ...productDetails,
        images: images.map(image => this.productImageRepo.create({ url: image }))
      });
      await this.productRepo.save(product)
      return { ...product, images }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findOne(term: string) {
    let product: Product
    if (isUUID(term)) {
      product = await this.productRepo.findOneBy({ id: term })
    } else {
      // product = await this.productRepo.findOneBy({ slug: term })
      const queryBuilder = this.productRepo.createQueryBuilder('prod')
      product = await queryBuilder.where(`UPPER(product_name) = :title or slug = :slug`, {
        title: term.toUpperCase(),
        slug: term.toLowerCase(),
      })
        .leftJoinAndSelect('prod.images', 'prodImages')
        .getOne();
    }
    // const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`product with id ${term} not found`)
    }

    return product
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map(image => image.url)
    }
  }

  async updateOneProduct(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.preload({ id })
    console.log(product)
  }

  async update(id: string, updateProductDto: UpdateProductDto) {

    const { images, ...toUpdateRest } = updateProductDto

    const product = await this.productRepo.preload({ id, ...toUpdateRest });
    console.log(product)
    if (!product) {
      throw new NotFoundException(`product with ${id} not found`);
    }

    // create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {

      if (images) {
        await queryRunner.manager.delete(ProductImage, { product: { id } })

        product.images = images.map(image => this.productImageRepo.create({ url: image })
        )
      } else {

      }

      await queryRunner.manager.save(product)

      // await this.productRepo.save(product);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOnePlain(id)

    } catch (error) {
      await queryRunner.release();
      await queryRunner.rollbackTransaction()

      this.handleDBExceptions(error)
    }
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

  async deleteAllProducts() {
    const query = this.productImageRepo.createQueryBuilder('product')

    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  //Get One product with most sales
  async getProductWithMostSales(): Promise<Product[]> {
    return this.productRepo.find({
      order: {
        selled: 'DESC',
      },
      take: 1,
    });
  }

  //Get One product with sales
  async getProductsWithMostSales() {
    const products = await this.productRepo.find({
      order: {
        selled: 'DESC',
      },
    });

    const productNames = products.map(({ product_name }) => product_name);
    const selled = products.map(({ selled }) => selled);

    return ({ data: { productNames, selled } });

  }

}
