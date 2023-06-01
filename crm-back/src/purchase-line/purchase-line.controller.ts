import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseLineService } from './purchase-line.service';
import { CreatePurchaseLineDto } from './dto/create-purchase-line.dto';
import { UpdatePurchaseLineDto } from './dto/update-purchase-line.dto';

@Controller('purchase-line')
export class PurchaseLineController {
  constructor(private readonly purchaseLineService: PurchaseLineService) { }

  @Post()
  create(@Body() createPurchaseLineDto: CreatePurchaseLineDto) {
    return this.purchaseLineService.create(createPurchaseLineDto);
  }

  @Get()
  findAll() {
    return this.purchaseLineService.findAll();
  }

  @Get('dash')
  findDataSalesPerMonth(res) {
    return this.purchaseLineService.findDataSalesPerMonth(res);
  }

  @Get('data-by-customer-product')
  async getPurchaseDataByCustomerAndProduct(): Promise<any[]> {
    return this.purchaseLineService.getPurchaseDataByCustomerAndProduct();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseLineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePurchaseLineDto: UpdatePurchaseLineDto) {
    return this.purchaseLineService.update(+id, updatePurchaseLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseLineService.remove(+id);
  }
}
