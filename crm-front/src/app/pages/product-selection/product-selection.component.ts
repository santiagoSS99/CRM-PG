import { Component, OnInit, Input } from '@angular/core';
import { TablesService } from 'src/app/services/tables.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {

  @Input() tables: any

  constructor(
    private tableService: TablesService
  ) { }

  selectedTable: any

  ngOnInit(): void {
  }

  getTableById(id: any) {
    this.tableService.getTableById(id).subscribe(res => {
      this.selectedTable = res
      console.log(id)
    })
  }

}
