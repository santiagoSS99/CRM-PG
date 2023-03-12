import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productsgrid',
  templateUrl: './productsgrid.component.html',
  styleUrls: ['./productsgrid.component.scss']
})
export class ProductsgridComponent implements OnInit {

  products: any

  constructor(
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res
      console.log(res)
    })
  }

}
