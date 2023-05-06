import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Customer } from '../interfaces/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}/customer`);
  }

  getCustomer(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.BASE_URL}/customer/${id}`);
  }

  createCustomer(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}/customer/register`, Customer)
  }

  createCustomerFromAdmin(Customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.BASE_URL}/customer`, Customer)
  }

  validateEmail(token: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json')
    return this.http.get(`${this.BASE_URL}/customer/verification/${token}`, { headers: headers })
  }

}
