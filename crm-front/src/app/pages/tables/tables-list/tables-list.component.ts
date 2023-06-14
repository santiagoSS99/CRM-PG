import { Component, Input, OnInit } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'tables-list-tables',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss']
})
export class TablesListComponent implements OnInit {

  tables: any = {}
  @Input() table: any
  selectedTable: any = {}


  constructor(
    private tablesService: TablesService
  ) { }

  ngOnInit(): void {
    this.getTables()
  }

  getTables() {
    this.tablesService.getTables().subscribe(
      res => {
        console.log(res)
        this.tables = res
      }
    )
  }

  getTableById(id: number) {
    console.log(id)
    this.tablesService.getTableById(id).subscribe(
      res => {
        this.selectedTable = res
      }
    )
  }

  deleteTable(id: number) {
    console.log(id)

  }

}
