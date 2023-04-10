import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
