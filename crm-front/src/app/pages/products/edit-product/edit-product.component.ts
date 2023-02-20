import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  @Input() product: any
  // products: any
  // form!: FormGroup;
  public products: Product[] = []


  constructor(
    private readonly productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

  }



  updateProduct(id: string) {
    let updateProduct = {
      product_name: this.product.product_name,
      price: this.product.price,
      description: this.product.description,
      stock: this.product.stock,
      selled: this.product.stock,
      provider: this.product.provider,
      images: this.product.images
    }
    this.productService.updateProduct(id, updateProduct).subscribe(res => console.log(res))
  }
}
