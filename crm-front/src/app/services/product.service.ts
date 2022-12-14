import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  BASE_URL: string = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/product`);
  }

  getProductsById(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/product/${id}`);
  }
  createProduct(Product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.BASE_URL}/product/create`, Product)
  }
  updateProduct(id: string, Product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.BASE_URL}/product/update?productID=${id}`, Product)
  }
  deleteProduct(id: string) {
    return this.http.delete<Product>(`${this.BASE_URL}/product/delete?productID=${id}`)
  }
}
