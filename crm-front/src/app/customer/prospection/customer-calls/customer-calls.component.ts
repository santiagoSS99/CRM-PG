import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-calls',
  templateUrl: './customer-calls.component.html',
  styleUrls: ['./customer-calls.component.scss']
})
export class CustomerCallsComponent implements OnInit {

  id: any

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
