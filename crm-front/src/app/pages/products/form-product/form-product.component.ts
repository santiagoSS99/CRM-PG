import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  products: Product = {
    product_name: '',
    price: 0,
    description: '',
    imageURL: '',
    quantity: 0,
    provider: '',
    selled: 0,
  }
  productsData: any


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProducts()

    // this.submitForm()
  }

  getAllProducts() {
    return this.productService.getProducts().subscribe((res) => {
      console.log(res);
      this.productsData = res
    })
  }
  submitForm() {
    console.log(this.products)
    this.productService.createProduct(this.products).subscribe((res) => {
      console.log(res);
    })
  }
}
