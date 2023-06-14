import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any;
  @Input() addedToWishlist: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // this.loadProducts()
  }

  // loadProducts() {
  //   this.productService.getProducts().subscribe(
  //     res => {
  //       this.productItem = res
  //       console.log(this.productItem)
  //     }
  //   )
  // }



  // handleAddToCart() {
  //   this.cartService.addProductToCart(this.productItem).subscribe(() => {
  //     this.msg.sendMsg(this.productItem)
  //   })
  // }

  // handleAddToWishlist() {
  //   this.wishlistService.addToWishlist(this.productItem.id).subscribe(() => {
  //     this.addedToWishlist = true;
  //   })
  // }

  // handleRemoveFromWishlist() {
  //   this.wishlistService.removeFromWishlist(this.productItem.id).subscribe(() => {
  //     this.addedToWishlist = false;
  //   })
  // }

}
