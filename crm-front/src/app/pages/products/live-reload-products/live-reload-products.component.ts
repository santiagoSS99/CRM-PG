import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-live-reload-products',
  templateUrl: './live-reload-products.component.html',
  styleUrls: ['./live-reload-products.component.scss']
})
export class LiveReloadProductsComponent implements OnInit {

  products: any
  product: any;
  productImage: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductData()
  }

  getProductData() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
    })
  }

}
