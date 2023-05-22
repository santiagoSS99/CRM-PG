import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  // createPurchase(customerId: string, productId: string, token:string):Observable:<any> {
  //   let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token })
  //   return this.http.post(`${this.BASE_URL}/purchase/${customerId}`, {Headers: headers})
  // }

  getDataAmountToDash(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/purchase-line/dash`, { headers: headers })
  }

}
