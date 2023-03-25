import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  edit = 'edit';
  shopping_cart = 'shopping_cart';

  constructor(private productService: ProductService) { }
  products: any
  selectedProduct: any = {};
  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
  // selectedProduct
  ngOnInit(): void {
    this.getDataAsEcommerce()
  }

  getDataAsEcommerce() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res
    })
  }

  getproductById(id: string) {
    this.productService.getProductsById(id).subscribe(res => {
      this.selectedProduct = res
    })

  }

}
