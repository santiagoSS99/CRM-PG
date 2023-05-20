import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerActivityService } from './customer-activity.service';
import { CreateCustomerActivityDto } from './dto/create-customer-activity.dto';
import { UpdateCustomerActivityDto } from './dto/update-customer-activity.dto';

@Controller('customer-activity')
export class CustomerActivityController {
  constructor(private readonly customerActivityService: CustomerActivityService) {}

  @Post()
  create(@Body() createCustomerActivityDto: CreateCustomerActivityDto) {
    return this.customerActivityService.create(createCustomerActivityDto);
  }

  @Get()
  findAll() {
    return this.customerActivityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerActivityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerActivityDto: UpdateCustomerActivityDto) {
    return this.customerActivityService.update(+id, updateCustomerActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerActivityService.remove(+id);
  }
}
