import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-reload-products',
  templateUrl: './live-reload-products.component.html',
  styleUrls: ['./live-reload-products.component.scss']
})
export class LiveReloadProductsComponent implements OnInit {

  products: any
  product: any;
  productImage: any;
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.products.subscribe((prods) => this.products = prods)
  }

  ngOnInit(): void {
    this.getProductData()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProductData() {
    this.productService.reloadProducts();
  }

}
