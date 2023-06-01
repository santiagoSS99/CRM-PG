import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Tables } from 'src/app/interfaces/tables';
import { TableStatusLabelMapping, TableStatus} from 'src/app/enums';
import { TablesService } from 'src/app/services/tables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.scss']
})
export class CreateTableComponent implements OnInit {
  public TableStatusLabelMapping = TableStatusLabelMapping;
  public tableStatuses = Object.values(TableStatus).filter(value => typeof value === 'number');;
  constructor(
    private tableService: TablesService
  ) { }

  table: Tables = {
    table_number: 0,
    table_capacity: 0,
    table_status: 1,
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
      })
    ).subscribe()
  }

  validateFields():boolean{
    let message = '';

    if(!this.table.table_capacity){
      message = 'Debes ingresar la capacidad de la mesa';
    }

    if(this.table.table_capacity < 0 && !message){
      this.table.table_capacity = 0;
      message = 'La capacidad de la mesa debe ser un número positivo';
    }

    if(!Object.values(TableStatus).includes(this.table.table_status) && !message){
      this.table.table_status = 1;
      message = 'El estado de la mesa deber ser un valor válido';
    }
  
    if(message){
      Swal.fire({
        title: 'Error en Campo',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Salir'
      })
      return false;
    }
   

    return true;
  }

  createTable() {

    if(!this.validateFields()){
      return;
    }

    Swal.fire({
      title: '¿Estas seguro de que deseas crear esta mesa?',
      text: 'La mesa será guardada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        let table = {
          table_number: this.tables,
          table_capacity: this.table.table_capacity,
          table_status: this.table.table_status+1,
          table_location: this.table.table_location
        }
        this.tableService.createTable(table).subscribe(() => {
          this.tableService.reloadTables();
        })
      }
    })
  }

}
