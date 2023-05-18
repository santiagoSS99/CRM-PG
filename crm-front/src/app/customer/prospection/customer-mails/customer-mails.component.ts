import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-mails',
  templateUrl: './customer-mails.component.html',
  styleUrls: ['./customer-mails.component.scss']
})
export class CustomerMailsComponent implements OnInit {

  id: any
  token = localStorage.getItem('token');
  data = false
  load_data = true

  constructor(
    private _route: ActivatedRoute,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = parseInt(params['id'], 10)
        this.customerService.getCustomerById(this.id, this.token).subscribe(
          response => {
            console.log(response)
            if (response != undefined) {
              this.data = true;
              this.load_data = false;
              this.initData()
            }
          }
        )
      }
    )
  }

  initData() {

  }
}
