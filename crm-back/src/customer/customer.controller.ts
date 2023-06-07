import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post('register')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post()
  createFromAdmin(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createFromAdmin(createCustomerDto);
  }

  @Get('verification/:token')
  validateEmail(@Req() req, @Res() res) {
    return this.customerService.email_validation(req, res);
  }

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Get('bytel/:t_number')
  findOneByTelNum(@Param('t_number') t_number: string) {
    return this.customerService.findByTelNum(+t_number);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Get('gettotal/customer')
  getTotalCustomer() {
    return this.customerService.getCustomerCount()
  }
}
