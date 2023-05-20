import { Injectable } from '@nestjs/common';
import { CreateTableStatusDto } from './dto/create-table-status.dto';
import { UpdateTableStatusDto } from './dto/update-table-status.dto';

@Injectable()
export class TableStatusService {
  create(createTableStatusDto: CreateTableStatusDto) {
    return 'This action adds a new tableStatus';
  }

  findAll() {
    return `This action returns all tableStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tableStatus`;
  }

  update(id: number, updateTableStatusDto: UpdateTableStatusDto) {
    return `This action updates a #${id} tableStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} tableStatus`;
  }
}
