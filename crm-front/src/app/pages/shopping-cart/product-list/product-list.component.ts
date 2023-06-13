import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { WishlistServiceService } from 'src/app/services/wishlist-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: any
  wishlist: any

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistServiceService
  ) { }

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      res => {
        this.productList = res;
      })
  }

  // loadWishlist() {
  //   this.wishlistService.getWishlist().subscribe((productIds: any) => {
  //     this.wishlist = productIds
  //   })
  // }


}
