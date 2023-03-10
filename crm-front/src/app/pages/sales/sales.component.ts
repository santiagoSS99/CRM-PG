import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/interfaces/tables';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  table: Tables = {
    table_number: 0,
    table_capacity: 0,
    table_status: ''
  }

  tables: any
  selectedTable: any
  constructor(
    private tableService: TablesService
  ) { }

  ngOnInit(): void {
    this.getTables()
  }

  getTables() {
    this.tableService.getTables().subscribe((res) => {
      this.tables = res
    })
  }

  createTable() {
    let table: Tables = {
      "table_number": this.table.table_number,
      "table_capacity": this.table.table_capacity,
      "table_status": this.table.table_status
    }
    this.tableService.createTable(table).subscribe(res => console.log(res))
  }

  getTableById(id: any) {
    this.tableService.getTableById(id).subscribe((res) => {
      this.selectedTable = res
      console.log(id)
    })
  }

}
