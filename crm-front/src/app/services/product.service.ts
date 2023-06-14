import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = 'http://localhost:3000/api'
  public _products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  products = this._products.asObservable();

  constructor(private http: HttpClient) { }

  reloadProducts() {
    this.http.get<Product[]>(`${this.BASE_URL}/products`)
      .subscribe((newProducts: Product[]) => {
        this._products.next(newProducts)
      });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products`);
  }

  getProductsById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products/${id}`);
  }
  getImagesByName(imageName: string) {
    return this.http.get(`${this.BASE_URL}/files/product/${imageName}`, { responseType: 'blob' })
  }
  createProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/products/create`, Product)
  }
  updateProduct(id: string, Product: Product): Observable<Product> {
    console.log(id, Product);
    return this.http.patch<Product>(`${this.BASE_URL}/products/update/${id}`, Product)
  }
  deleteProduct(id: string) {
    // return this.http.delete<Product>(`${this.BASE_URL}/products/delete?productID=${id}`)
    return this.http.delete<Product>(`${this.BASE_URL}/products/${id}`)
  }
  uploadImages(x: any) {
    return this.http.post(`${this.BASE_URL}/files/product`, x);
  }
  productsWithSales(token: any): Observable<any> {
    return this.http.get(`${this.BASE_URL}/products/dash/productsWithMostSales`, token)
  }
  getTotalInvestment() {
    return this.http.get(`${this.BASE_URL}/products/gettotal/investment`)
  }
}
