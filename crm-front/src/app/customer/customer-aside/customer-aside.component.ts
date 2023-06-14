import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
@Component({
  selector: 'app-customer-aside',
  templateUrl: './customer-aside.component.html',
  styleUrls: ['./customer-aside.component.scss']
})
export class CustomerAsideComponent implements OnInit {

  id: any
  spinner = true
  token = localStorage.getItem('token')
  customer: any = {}
  data = false
  load_data = false

  constructor(
    private _route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = parseInt(params['id'], 10)
        this.spinner = true
        this.customerService.getCustomerById(this.id, this.token).subscribe(
          res => {
            console.log(res)
            if (res != undefined) {
              this.customer = res
              this.data = true
              this.load_data = false
            } else {
              this.data = true
              this.load_data = false
            }
          }
        )
      }
    )
  }

}
