import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  // BASE_URL: string = 'http://localhost:3000/api';
  BASE_URL: string = environment.domainUrl

  public _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  orders = this._orders.asObservable();

  constructor(private http: HttpClient) { }

  reloadOrders(tableId: number) {
    return this.http.get<Order[]>(`${this.BASE_URL}/orders/productsintable/${tableId}`);
  }

  createOrder(order: any) {
    return this.http.post(`${this.BASE_URL}/orders/`, order)
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.BASE_URL}/orders`);
  }

  updateOrder(id: Order["id"], order: Order): Observable<Order> {
    return this.http.patch<Order>(`${this.BASE_URL}/orders/${id}`, order)
  }
}
