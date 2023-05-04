import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/interfaces/tables';
import { TablesFilterService } from 'src/app/services/tables-filter.service';
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
    table_status: 1
  }
  // text_to_search: string = '';

  tables: any
  selectedTable: any
  constructor(
    private tableService: TablesService,
    public tableListService: TablesFilterService
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

}
