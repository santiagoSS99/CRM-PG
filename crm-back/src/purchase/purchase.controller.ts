import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }
  // // Create Without customer
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

  @Get('payment-methods')
  async getPaymentMethodtoDash() {
    const paymentMethods = await this.purchaseService.getPaymentMethod();
    return paymentMethods;
  }

  @Get('top-visiting-customer')
  getTopVisiting() {
    return this.purchaseService.getTopVisitingCustomers()
  }
}
