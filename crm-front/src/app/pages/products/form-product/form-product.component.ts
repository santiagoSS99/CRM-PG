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
  products: Product = {
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
  selectedFiles?: FileList
  // progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;


  constructor(
    private productService: ProductService,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.getAllProducts()
  }

  onFileChanged(event: any) {

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

  uploadFiles(): void {

    this.submitForm()
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    // this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.productService.uploadImages(file).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            // this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.productService.getProducts();
          }
        },
        error: (err: any) => {
          // this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      });
    }
  }

  selectFiles(event: any): void {
    this.message = [];
    // this.progressInfos = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

}
