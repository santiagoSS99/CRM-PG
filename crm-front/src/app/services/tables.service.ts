import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tables } from '../interfaces/tables';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  BASE_URL: string = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getTables(): Observable<Tables[]> {
    return this.http.get<Tables[]>(`${this.BASE_URL}/tables`)
  }

  createTable(Tables: Tables): Observable<Tables> {
    return this.http.post<Tables>(`${this.BASE_URL}/tables`, Tables)
  }

}
