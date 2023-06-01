import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tables } from '../interfaces/tables';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  BASE_URL: string = 'http://localhost:3000/api'
  public _tables: BehaviorSubject<Tables[]>  = new BehaviorSubject<Tables[]>([]);
  public _currentTable: BehaviorSubject<Partial<Tables>> = new BehaviorSubject<Partial<Tables>>({});
  currentTable = this._currentTable.asObservable();
  tables = this._tables.asObservable();

  constructor(private http: HttpClient) { }

  updateCurrentTable(table: Tables){
    this._currentTable.next(table);
  }

  reloadTables(){
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

}
