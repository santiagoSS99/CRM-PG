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
  products: any
  form!: FormGroup;
  // selectedProduct: any = {}

  constructor(
    private readonly productService: ProductService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

  }
}
