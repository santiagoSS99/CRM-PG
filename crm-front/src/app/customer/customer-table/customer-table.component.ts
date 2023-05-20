import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  suscription: Subscription | undefined;

  public token = localStorage.getItem('token')

  @Input() customer: any

  customers: any = {};
  selectedCustomer: any = {}

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((res => {
      console.log(res)
      this.customers = res
    }))
  }

  getCustomerById(id: number) {
    this.customerService.getCustomerById(id, this.token).subscribe(res => {
      this.selectedCustomer = res
      // console.log(res)
    })
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id, this.token).subscribe(res => {
      console.log(res)
      this.customers = this.customers.filter((customer: any) => customer.id !== id);
      this.customerService.refresh$.next();
    })
  }

}
