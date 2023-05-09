import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {
  @Input() customer: any
  public token = localStorage.getItem('token')


  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  updateCustomer(id: string) {
    let updateCustomer: Customer = {
      name: this.customer.name,
      surnames: this.customer.price,
      email: this.customer.email,
      country: this.customer.country,
      // type: this.customer.type,
      t_number: this.customer.t_number,
      f_birthday: this.customer.f_birthday,
      notifications: this.customer.notifications
    }
    this.customerService.updateCustomer(id, updateCustomer, this.token).subscribe(res => console.log(res))
  }

}
