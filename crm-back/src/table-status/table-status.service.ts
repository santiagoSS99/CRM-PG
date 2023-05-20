import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TableStatus } from './entities/table-status.entity';

@Injectable()
export class TableStatusService {

  constructor(
    @InjectRepository(TableStatus)
    private tableStatusRepository: Repository<TableStatus>
  ) { }

  async findAll() {
    const tableStatus = await this.tableStatusRepository.find()
    return tableStatus
  }

  findOne(id: number) {
    return `This action returns a #${id} tableStatus`;
  }
}
