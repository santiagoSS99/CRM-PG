import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tables } from '../interfaces/tables';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  // BASE_URL: string = 'http://localhost:3000/api'
  BASE_URL: string = environment.domainUrl

  public _tables: BehaviorSubject<Tables[]> = new BehaviorSubject<Tables[]>([]);
  public _currentTable: BehaviorSubject<Partial<Tables>> = new BehaviorSubject<Partial<Tables>>({});
  currentTable = this._currentTable.asObservable();
  tables = this._tables.asObservable();

  constructor(private http: HttpClient) { }

  updateCurrentTable(table: Tables) {
    this._currentTable.next(table);
  }

  updateTable(id: any, table: Tables, token: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token });
    return this.http.patch(`${this.BASE_URL}/tables/updateTable/${id}`, table, { headers: headers })
  }

  reloadTables() {
    this.http.get<Tables[]>(`${this.BASE_URL}/tables`).subscribe((newTables: Tables[]) => {
      this._tables.next(newTables)
    });
  }

  getTables(): Observable<Tables[]> {
    return this.http.get<Tables[]>(`${this.BASE_URL}/tables`)
  }

  createTable(Tables: Tables): Observable<Tables> {
    return this.http.post<Tables>(`${this.BASE_URL}/tables`, Tables)
  }

  getTableById(id: any) {
    return this.http.get<Tables>(`${this.BASE_URL}/tables/${id}`)
  }

  setOcuppiedTable(id: any, status: any): Observable<any> {
    return this.http.patch(`${this.BASE_URL}/tables/${id}`, status)
  }

  removeTable(id: any) {
    return this.http.delete(`${this.BASE_URL}/tables/${id}`)
  }

}
