import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  edit = 'edit';
  shopping_cart = 'shopping_cart';

  filter = '';
  products: any;
  products_const: any;
  selectedProduct: any = {};
  subscription: Subscription;

  constructor(private productService: ProductService) { 
    this.subscription = this.productService.products.subscribe((prods) => {
      this.products = prods;
      this.products_const = prods;
    })
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }
  // selectedProduct
  ngOnInit(): void {
    this.productService.reloadProducts();
    this.getDataAsEcommerce()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  filterProduct() {
    if (this.filter) {
      var term = new RegExp(this.filter, 'i')
      this.products = this.products_const.filter((item: { product_name: string; }) => term.test(item.product_name))
    } else {
      this.products = this.products_const
    }
  }
}
