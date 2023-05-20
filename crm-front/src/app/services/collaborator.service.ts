import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${this.BASE_URL}/auth/login`, data, { headers: headers })
  }

}
