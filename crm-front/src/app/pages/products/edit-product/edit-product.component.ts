import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
declare var $: any

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() product: any
  products: any
  // form!: FormGroup;
  // public producs: Product[] = []


  constructor(
    private readonly productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

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

    if(this.product.selled < 0 && !message){
      this.product.selled = 0;
      message = 'El número de productos vendidos debe ser un número positivo';
    }

    if(this.product.selled > this.product.stock && !message){
      this.product.selled = 0;
      message = 'El número de vendidos no puede ser mayor al stock';
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



  updateProduct(id: string) {

    if(!this.validateFields()){
      return;
    }

    let updateProduct = {
      product_name: this.product.product_name,
      purchaseprice: this.product.purchaseprice,
      price: this.product.price,
      description: this.product.description,
      stock: this.product.stock,
      selled: this.product.selled,
      provider: this.product.provider,
      images: this.product.images
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas actualizar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(updateProduct);
        this.productService.updateProduct(id, updateProduct).subscribe(
          res => {
            this.productService.reloadProducts();
            this.closeModal();
            if (res) {
              // Aquí puedes mostrar una alerta de éxito si lo deseas
            }
          }
        );
        
      }
    });
  }


  closeModal() {
    $(`#exampleModal  `).modal(`hide`);
  }
}
