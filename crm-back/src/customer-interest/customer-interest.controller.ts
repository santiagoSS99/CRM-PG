import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerInterestService } from './customer-interest.service';
import { CreateCustomerInterestDto } from './dto/create-customer-interest.dto';
import { UpdateCustomerInterestDto } from './dto/update-customer-interest.dto';

@Controller('customer-interest')
export class CustomerInterestController {
  constructor(private readonly customerInterestService: CustomerInterestService) {}

  @Post()
  create(@Body() createCustomerInterestDto: CreateCustomerInterestDto) {
    return this.customerInterestService.create(createCustomerInterestDto);
  }

  @Get()
  findAll() {
    return this.customerInterestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerInterestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerInterestDto: UpdateCustomerInterestDto) {
    return this.customerInterestService.update(+id, updateCustomerInterestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerInterestService.remove(+id);
  }
}
