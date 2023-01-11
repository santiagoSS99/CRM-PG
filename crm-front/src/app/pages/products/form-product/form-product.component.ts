import { HttpClient } from '@angular/common/http';
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
    quantity: 0,
    provider: '',
    images: [],
    selled: 0,
  }
  productsData: any
  productId: any


  constructor(
    private productService: ProductService,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.getAllProducts()
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
      this.productId = res!.id
      console.log(this.productId);
    })
  }

  uploadFile(event: Event) {
    const images = (event.target as HTMLInputElement).files;
    if (images) {
      const formData = new FormData();
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
      formData.append('productId', this.productId);

    }
  }

}
