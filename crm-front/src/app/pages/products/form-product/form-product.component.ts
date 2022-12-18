import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  product: Product = {
    product_name: '',
    price: 0,
    description: '',
    imageURL: '',
    quantity: 0,
    provider: '',
    selled: 0
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    // this.submitForm()
  }

  submitForm() {
    console.log(this.product)
    this.productService.createProduct(this.product).subscribe((res) => {
      console.log(res);
    })
  }
}
