import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-interests',
  templateUrl: './customer-interests.component.html',
  styleUrls: ['./customer-interests.component.scss']
})
export class CustomerInterestsComponent implements OnInit {

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
