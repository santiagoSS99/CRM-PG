import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-prospection',
  templateUrl: './customer-prospection.component.html',
  styleUrls: ['./customer-prospection.component.scss']
})
export class CustomerProspectionComponent implements OnInit {

  id: any
  spinner = true
  token = localStorage.getItem('token')
  customer: any = {}
  data = false
  load_data = false

  constructor(
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = parseInt(params['id'], 10)
      }
    )
  }

}
