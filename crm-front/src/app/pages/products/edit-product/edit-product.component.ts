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



  updateProduct(id: string) {
    let updateProduct = {
      product_name: this.product.product_name,
      purchaseprice: this.product.purchaseprice,
      price: this.product.price,
      description: this.product.description,
      stock: this.product.stock,
      selled: this.product.stock,
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
