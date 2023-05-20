import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableStatusService } from './table-status.service';
import { CreateTableStatusDto } from './dto/create-table-status.dto';
import { UpdateTableStatusDto } from './dto/update-table-status.dto';

@Controller('table-status')
export class TableStatusController {
  constructor(private readonly tableStatusService: TableStatusService) {}

  @Post()
  create(@Body() createTableStatusDto: CreateTableStatusDto) {
    return this.tableStatusService.create(createTableStatusDto);
  }

  @Get()
  findAll() {
    return this.tableStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableStatusDto: UpdateTableStatusDto) {
    return this.tableStatusService.update(+id, updateTableStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableStatusService.remove(+id);
  }
}
