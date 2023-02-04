import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private productService: ProductService) { }
  products: any
  ngOnInit(): void {
    this.getDataAsEcommerce()
  }

  getDataAsEcommerce() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
    })
  }

}
