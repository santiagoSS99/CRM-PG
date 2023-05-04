import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  createOrder(tableId: number, order: any) {
    return this.http.post(`${this.BASE_URL}/orders/${tableId}/orders`, order)
  }
}
