import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesFilterService {
  text_to_search: string = '';
  constructor() { }
}
