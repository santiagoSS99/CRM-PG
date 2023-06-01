import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from '../interfaces/customer';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Call } from '../interfaces/call';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  BASE_URL: string = 'http://localhost:3000/api'
  private _refresh$ = new Subject<void>();
  public _currentCustomer: BehaviorSubject<Partial<Customer>> = new BehaviorSubject<Partial<Customer>>({});
  currentCustomer = this._currentCustomer.asObservable();


  constructor(private http: HttpClient) { }


  get refresh$() {
    return this._refresh$
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.BASE_URL}/customer`);
  }

  getCustomerByCellphone(cellphone: string): void {
    this.http.get<Customer>(`${this.BASE_URL}/customer/bytel/${cellphone}`).subscribe((customer: Customer)=>{
      this._currentCustomer.next(customer);
    })
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

  // Calls

  createCustomerCall(call: Call, token: any): Observable<Call> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.post<Call>(`${this.BASE_URL}/customer-calls`, call, { headers })
  }

  createCustomerMail(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.post(`${this.BASE_URL}/customer-mail`, data, { headers })
  }


  getCalls(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/customer-calls`, { headers })
  }

  getCallsByCustomer(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/customer-calls/${id}`, { headers })
  }

  ////////////////////

  getMails(token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/customer-mail`, { headers })
  }

  getMailsByCustomer(id: any, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token })
    return this.http.get(`${this.BASE_URL}/customer-mail/${id}`, { headers })
  }

}
