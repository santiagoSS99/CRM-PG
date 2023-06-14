import { Component, Input, OnInit } from '@angular/core';
import { Tables } from 'src/app/interfaces/tables';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-edit-tables',
  templateUrl: './edit-tables.component.html',
  styleUrls: ['./edit-tables.component.scss']
})
export class EditTablesComponent implements OnInit {
  @Input() table: any
  token = localStorage.getItem('token')


  constructor(
    private tablesService: TablesService
  ) { }

  ngOnInit(): void {
  }

  updateTable(id: string) {
    let updateTable: Tables = {
      table_number: this.table.table_number,
      table_capacity: this.table.table_capacity,
      table_location: this.table.table_location,
    }
    this.tablesService.updateTable(id, updateTable, this.token).subscribe(
      res => {
        console.log(res)
      }
    )
  }
}
