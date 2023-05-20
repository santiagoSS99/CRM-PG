import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerMailService } from './customer-mail.service';
import { CreateCustomerMailDto } from './dto/create-customer-mail.dto';
import { UpdateCustomerMailDto } from './dto/update-customer-mail.dto';

@Controller('customer-mail')
export class CustomerMailController {
  constructor(private readonly customerMailService: CustomerMailService) { }

  @Post()
  create(@Body() createCustomerMailDto: CreateCustomerMailDto) {
    return this.customerMailService.create(createCustomerMailDto);
  }

  @Get()
  findAll() {
    return this.customerMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerMailDto: UpdateCustomerMailDto) {
    return this.customerMailService.update(+id, updateCustomerMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerMailService.remove(+id);
  }
}
