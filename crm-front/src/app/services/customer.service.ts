import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Customer } from '../interfaces/customer';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  BASE_URL: string = 'http://localhost:3000/api'
  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }


  get refresh$() {
    return this._refresh$
  }
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}/customer`);
  }

  getCustomerById(id: number, token: any): Observable<Customer[]> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get<Customer[]>(`${this.BASE_URL}/customer/${id}`, { headers: headers });
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.BASE_URL}/customer/${id}`);
  }

  createCustomer(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}/customer/register`, Customer)
  }

  createCustomerFromAdmin(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}/customer`, Customer).
      pipe(
        tap(() => {
          this._refresh$.next()
        })
      )
  }

  validateEmail(token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json')
    return this.http.get(`${this.BASE_URL}/customer/verification/${token}`, { headers: headers })
  }

  updateCustomer(id: string, customer: Customer, token: any): Observable<any> {
    return this.http.patch<Customer>(`${this.BASE_URL}/customer/${id}`, customer, token)
  }

  deleteCustomer(id: number, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.delete<Customer>(`${this.BASE_URL}/customer/${id}`, { headers: headers }).
      pipe(
        tap(() => {
          this._refresh$.next()
        })
      )
  }

}
