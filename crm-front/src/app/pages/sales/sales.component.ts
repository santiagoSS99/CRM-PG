import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/interfaces/tables';
import { TablesFilterService } from 'src/app/services/tables-filter.service';
import { TablesService } from 'src/app/services/tables.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  table: Tables = {
    table_number: 0,
    table_capacity: 0,
    table_status: 1,
  }

  filter = ''

  tables: any
  tables_const: any
  selectedTable: any
  subscription: Subscription;

  constructor(
    private tableService: TablesService,
    public tableListService: TablesFilterService
  ) { 
    this.subscription = this.tableService.tables.subscribe((tables) => {
      this.tables = tables;
      this.tables_const = tables;
    })
  }

  ngOnInit(): void {
    this.tableService.reloadTables()
    //this.getTables()
  }

  getTables() {
    this.tableService.getTables().subscribe((res) => {
      this.tables = res
      this.tables_const = this.table
      console.log(this.tables.table_status)
      console.log(res)
    })
  }

  createTable() {
    let table: Tables = {
      "table_number": this.table.table_number,
      "table_capacity": this.table.table_capacity,
      "table_status": this.table.table_status,
    }
    this.tableService.createTable(table).subscribe(res => console.log(res))
  }

  getTableById(id: any) {
    this.tableService.getTableById(id).subscribe((newTable) => {
      this.selectedTable = newTable;
      this.tableService.updateCurrentTable(newTable)
    })
  }

  // searchTable() {
  //   // Obtener el valor de búsqueda del campo de entrada de texto
  //   const searchInput = document.getElementById('search') as HTMLInputElement;
  //   console.log(searchInput)
  //   const searchValue = searchInput.value.trim().toUpperCase();
  //   console.log(searchValue)


  //   // Obtener todas las mesas de la página
  //   const tables = document.querySelectorAll('.table');
  //   console.log(tables)

  //   // Iterar sobre las mesas y ocultar las que no coinciden con el término de búsqueda
  //   tables.forEach(table => {
  //     console.log(table)
  //     const name = table.querySelector('.name')?.textContent?.trim().toUpperCase() || '';
  //     if (name.includes(searchValue)) {
  //       (table as HTMLElement).style.display = 'block';
  //     } else {
  //       (table as HTMLElement).style.display = 'none';
  //     }
  //   });
  // }
  searchTable() {
    // Obtener el valor de búsqueda del campo de entrada de texto
    const searchInput = document.getElementById('search') as HTMLInputElement;
    const searchValue = searchInput.value.toLowerCase();

    // Obtener todas las mesas de la página
    const tables = document.querySelectorAll('.table');

    // Iterar sobre las mesas y ocultar las que no coinciden con el término de búsqueda
    let foundMatch = false;
    tables.forEach(table => {
      const name = table.querySelector('.name')?.textContent?.toLowerCase() || '';
      if (name.includes(searchValue)) {
        (table as HTMLElement).style.display = 'block';
        foundMatch = true;
      } else {
        (table as HTMLElement).style.display = 'none';
      }
    });

    // Si no se encontró ninguna coincidencia, mostrar todas las mesas
    if (!foundMatch) {
      tables.forEach(table => {
        (table as HTMLElement).style.display = 'block';
      });
    }
  }

  filterTable() {
    if (this.filter) {
      var term = new RegExp(this.filter, 'i')
      this.table = this.tables_const.filter((item: { table_number: any; }) => term.test(item.table_number))
    } else {
      this.table = this.tables_const
    }
  }

}
