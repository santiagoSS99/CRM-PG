import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-calls',
  templateUrl: './customer-calls.component.html',
  styleUrls: ['./customer-calls.component.scss']
})
export class CustomerCallsComponent implements OnInit {

  id: any
  call: any = {
    result: '',
    date: new Date().toISOString().substring(0, 10),
    hour: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  public time = { hour: new Date().getHours(), minute: new Date().getMinutes() };
  public token = localStorage.getItem('token');

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
