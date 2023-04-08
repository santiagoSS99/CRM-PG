import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Tables } from 'src/app/interfaces/tables';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {

  constructor(
    private tableService: TablesService
  ) { }

  table: Tables = {
    table_number: 0,
    table_capacity: 0,
    table_status: '',
    table_location: ''
  }
  tableId: number | any
  tables: any

  ngOnInit(): void {
    this.getTables()
  }

  getTables() {
    let totalTables: any
    this.tableService.getTables().pipe(
      map((tables: any) => {
        totalTables = tables.length + 1;
        this.tables = totalTables
        // console.log(totalTables)
        // return tables;
      })
    ).subscribe()
    // console.log(tablesTotal)
  }

  createTable() {
    let table = {
      table_number: this.tables,
      table_capacity: this.table.table_capacity,
      table_status: this.table.table_status,
      table_location: this.table.table_location
    }
    console.log(table)
    this.tableService.createTable(table).subscribe((res) => {
      // this.tableId = res
      console.log(res)
    })
  }

}
