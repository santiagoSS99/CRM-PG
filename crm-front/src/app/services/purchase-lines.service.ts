import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseLines } from '../interfaces/purchaselines';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseLinesService {

  // BASE_URL: string = 'http://localhost:3000/api'
  BASE_URL: string = environment.domainUrl



  constructor(private http: HttpClient) { }

  createPurchaseLine(purchaseLine: PurchaseLines, token: string): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.post(`${this.BASE_URL}/purchase-line`, purchaseLine, { headers: headers })
  }

  getPurchasesLinesByCustomer(token: string) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/data-by-customer-product`, { headers: headers });
  }

  getDataAmountToDash(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/dash`, { headers: headers })
  }

  getdataByCustomerProduct(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/data-by-customer-product`, { headers: headers })
  }

  getprofitTotal(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/total-profit`, { headers: headers })
  }
}
