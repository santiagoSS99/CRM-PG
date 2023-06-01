import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { PaginatioonDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('create')
  // @UseGuards( AuthGuard() )
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginatioonDto) {
    console.log(paginationDto);
    return this.productsService.findAll(paginationDto);
  }

  // Funcin de busqueda por termino
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOnePlain(term);
  }

  @Patch('update/:id')
  // @UseGuards(AuthGuard())
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    console.log("Update Producto DTO")
    console.log(id)
    console.log(updateProductDto)
    console.log("Update Producto DTO Fin")
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.remove(id);
  }

  @Get('dash/productWithMostSales')
  getProductWithMostSales() {
    return this.productsService.getProductWithMostSales();
  }

  // @Get('dash/productsWithMostSales')
  // getProductsWithMostSales() {
  //   return this.productsService.getProductWithMostSales();
  // }

  @Get('dash/productsWithMostSales')
  async getProductsWithMostSales() {
    const products = await this.productsService.getProductsWithMostSales();
    return products;
  }
}
