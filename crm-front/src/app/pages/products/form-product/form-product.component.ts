import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
// import { FormData } from 'form-data';
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
  images: any;


  constructor(
    private productService: ProductService,
    private http: HttpClient,
  ) {
  }

  ngOnInit() {
    this.getAllProducts()
    // this.test()
  }

  onFileChanged(event: any) {
    this.images = event.target.files;
  }

  getAllProducts() {
    return this.productService.getProducts().subscribe((res) => {
      console.log(res);
      this.productsData = res
    })
  }
  submitForm() {

    const formData = new FormData();
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    this.productService.uploadImages(formData).subscribe(data => {
      console.log(data);
    })

    console.log(this.products)
    this.productService.createProduct(this.products).subscribe((res) => {
      console.log(res);
      this.productId = res!.id
      console.log(this.productId);
    })
  }
  // const formData = new FormData();

  // for (let i = 0; i < this.images.length; i++) {
  //   formData.append('images[]', this.images.item(i));
  // }
  // this.productService.uploadImages().subscribe((res) => {
  //   console.log(res, 'data res')
  // })


  // uploadFile(event: Event) {
  //   const images = (event.target as HTMLInputElement).files;
  //   if (images) {
  //     const formData = new FormData();
  //     for (let i = 0; i < images.length; i++) {
  //       formData.append('images', images[i]);
  //     }
  //     formData.append('productId', this.productId);

  //   }
  // }

}
