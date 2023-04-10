import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {

  private readonly logger = new Logger('SaleService');


  constructor(
    @InjectRepository(Sale)
    private readonly saleRepo: Repository<Sale>
  ) {

  }

  async create(createSaleDto: CreateSaleDto) {
    try {
      const { ...salesDetail } = createSaleDto;
      const sale = this.saleRepo.create({
        ...salesDetail
      });
      await this.saleRepo.save(sale)
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    this.logger.error(error)
    throw new InternalServerErrorException('unexpected error, please check the logs')
  }
}

