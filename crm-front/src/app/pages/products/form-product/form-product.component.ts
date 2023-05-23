import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'



@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {
  product: Product = {
    product_name: '',
    purchasePrice: 0,
    price: 0,
    description: '',
    stock: 0,
    provider: '',
    images: new FormData(),
    selled: 0,
  }
  productsData: any
  productId: any
  selectedFiles?: FileList | undefined;
  images!: string[];

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

  onFileChange(event: any) {
    console.log(event.target.files)
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files
  }

  submitForm() {
    let images_test: any = [];

    const formData = new FormData();
    if (this.selectedFiles) {
      Swal.fire({
        title: 'Are you sure to save this product?',
        text: '¡Product will be saved permantly!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save',
        cancelButtonText: 'Cancel'
      }).then((result: { isConfirmed: boolean }) => {
        if (result.isConfirmed) {
          if (this.selectedFiles) {
            for (let i = 0; i < this.selectedFiles.length; i++) {
              formData.append('images', this.selectedFiles[i]);
              this.productService.uploadImages(formData).subscribe((res: any) => {
                this.images = res.secureUrl;
                images_test.push(this.images);
                if (this.selectedFiles && i === this.selectedFiles.length - 1) {
                  let product = {
                    "product_name": this.product.product_name,
                    "price": this.product.price,
                    "purchasePrice": this.product.purchasePrice,
                    "description": this.product.description,
                    "stock": this.product.stock,
                    "images": images_test,
                    "provider": this.product.provider,
                    "selled": this.product.selled
                  };
                  this.productService.createProduct(product).subscribe((res) => {
                    this.productId = res!.id;
                  });
                }
              });
            }
          }
        }
      })
    }
  }
}
