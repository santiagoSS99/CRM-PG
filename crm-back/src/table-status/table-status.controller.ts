import { Controller, Get, Param } from '@nestjs/common';
import { TableStatusService } from './table-status.service';

@Controller('table-status')
export class TableStatusController {
  constructor(private readonly tableStatusService: TableStatusService) { }


  @Get()
  findAll() {
    const tableStatus = this.tableStatusService.findAll();
    return tableStatus
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableStatusService.findOne(+id);
  }
}
