import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    stock: 0,
    provider: '',
    images: [],
    selled: 0,
  }
  productsData: any
  productId: any
  selectedFiles?: FileList;

  // selectedFiles: FileList = [] as FileList;
  constructor(
    private productService: ProductService,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.getAllProducts()
    this.selectFiles(Event)
  }

  onFileChanged(event: any) {

  }

  getAllProducts() {
    return this.productService.getProducts().subscribe((res) => {
      console.log(res);
      this.productsData = res
    })
  }


  onFileChange(event: any) {
    console.log(event.target.files)
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

  submitForm() {
    let images_test = [];

    if (this.selectedFiles) {
      console.log("🚀", this.selectedFiles)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        images_test.push(this.selectedFiles[i].name);
      }
    }
    let product = {
      "product_name": this.product.product_name,
      "price": this.product.price,
      "description": this.product.description,
      "stock": this.product.stock,
      "images": images_test,
      "provider": this.product.provider,
      "selled": this.product.selled
    }
    console.log(this.product)
    this.productService.createProduct(product).subscribe((res) => {
      console.log(res);
      this.productId = res!.id
      console.log(this.productId);
    })
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;
    console.log("🚀 ~ file: form-product.component.ts:125 ~ FormProductComponent ~ selectFiles ~ this.selectedFiles", this.selectedFiles)

  }

}
