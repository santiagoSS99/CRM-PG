import { Component, OnInit } from '@angular/core';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { map } from 'rxjs';
import { Tables } from 'src/app/interfaces/tables';
import { TablesService } from 'src/app/services/tables.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure to create this table?',
      text: 'Table will be saved!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Create',
      cancelButtonText: 'Cancel'
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
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
    })
  }

}
