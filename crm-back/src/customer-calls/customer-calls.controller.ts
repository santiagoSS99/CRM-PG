import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerCallsService } from './customer-calls.service';
import { CreateCustomerCallDto } from './dto/create-customer-call.dto';
import { UpdateCustomerCallDto } from './dto/update-customer-call.dto';

@Controller('customer-calls')
export class CustomerCallsController {
  constructor(private readonly customerCallsService: CustomerCallsService) {}

  @Post()
  create(@Body() createCustomerCallDto: CreateCustomerCallDto) {
    return this.customerCallsService.create(createCustomerCallDto);
  }

  @Get()
  findAll() {
    return this.customerCallsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCallsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerCallDto: UpdateCustomerCallDto) {
    return this.customerCallsService.update(+id, updateCustomerCallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCallsService.remove(+id);
  }
}
