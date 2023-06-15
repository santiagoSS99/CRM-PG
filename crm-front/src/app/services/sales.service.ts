import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../interfaces/sale';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  // BASE_URL: string = 'http://localhost:3000/api'
  BASE_URL: string = environment.domainUrl


  constructor(private http: HttpClient) { }

  createSale(sale: Sale): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}/sales/sale`, sale);
  }

}
