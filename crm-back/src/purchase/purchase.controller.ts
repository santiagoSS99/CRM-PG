import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post(':customerId/:productId')
  create(@Param('CustomerId') customerId: string, @Param('productId') productId: string, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(customerId, productId, createPurchaseDto);
  }
  // Create Without customer
  @Post(':productId')
  createWOC(
    @Param('productId') productId: string,
    @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.createPurchaseWithoutCustomer(productId, createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
