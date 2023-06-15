import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  BASE_URL: string = environment.domainUrl

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(`${this.BASE_URL}/auth/login`, data, { headers: headers })
  }

}