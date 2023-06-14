import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../interfaces/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  createPurchase(purchase: Purchase): Observable<any> {
    return this.http.post(`${this.BASE_URL}/purchase`, purchase)
  }

  createPurchaseWithoutCustomer(productId: string, purchase: Purchase): Observable<any> {
    return this.http.post(`${this.BASE_URL}/purchase/${productId}`, purchase);
  }

  getTopVisitingCustomers(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.get(`${this.BASE_URL}/purchase/top-visiting-customer`, { headers: headers })
  }

  getDataAmountToDash(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/dash`, { headers: headers })
  }
  getPaymentMethod(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase/payment-methods`, { headers: headers })
  }

}
