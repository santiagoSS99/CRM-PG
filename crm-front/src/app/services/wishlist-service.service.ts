import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistServiceService {


  constructor(private http: HttpClient) { }

  // getWishlist() {
  //   return this.http.get(environment.domainUrl).pipe(
  //     map((result: any[]) => {
  //       let productIds: any[] = []

  //       result.forEach(item => productIds.push(item.id))

  //       return productIds;
  //     })
  //   )
  // }

  // addToWishlist(productId) {
  //   return this.http.post(wishlistUrl, { id: productId })
  // }

  // removeFromWishlist(productId) {
  //   return this.http.delete(wishlistUrl + '/' + productId);
  // }
}
