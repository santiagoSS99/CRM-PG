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
    purchaseprice: 0,
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

  validateFields():boolean{
    let message = '';

    if(!this.product.product_name){
      message = 'Debes ingresar el nombre del producto';
    }

    if(this.product.purchaseprice < 0 && !message){
      this.product.purchaseprice = 0;
      message = 'El precio de compra del producto debe ser un número positivo';
    }
    if(!this.product.price && !message){
      message = 'Debes ingresar el precio de venta del producto';
    }
    if(this.product.price < 0 && !message){
      this.product.price = 0;
      message = 'El precio de venta del producto debe ser un número positivo';
    }
    if(!this.product.description && !message){
      message = 'Debes ingresar la descripción del producto';
    }
    if(!this.product.stock && !message){
      message = 'Debes ingresar el stock del producto';
    }
    if(this.product.stock < 0 && !message){
      this.product.stock = 0;
      message = 'El stock del producto debe ser un número positivo';
    }

    if(message){
      Swal.fire({
        title: 'Error en Campo',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Salir'
      })
      return false;
    }
   

    return true;
  }

  submitForm() {
    if(!this.validateFields()){
      return;
    }
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
                    "purchaseprice": this.product.purchaseprice,
                    "description": this.product.description,
                    "stock": this.product.stock,
                    "images": images_test,
                    "provider": this.product.provider,
                    "selled": this.product.selled
                  };
                  this.productService.createProduct(product).subscribe((res) => {
                    this.productId = res!.id;
                    this.productService.reloadProducts();
                  });
                }
              });
            }
          }
        }
      })
    }else{
      Swal.fire({
        title: 'Falta cargar las imagenes',
        text: 'Debes cargar la imagen del producto',
        icon: 'warning',
      })
    }
  }
}
