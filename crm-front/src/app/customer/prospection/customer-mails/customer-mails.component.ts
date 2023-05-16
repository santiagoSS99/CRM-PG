import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-mails',
  templateUrl: './customer-mails.component.html',
  styleUrls: ['./customer-mails.component.scss']
})
export class CustomerMailsComponent implements OnInit {

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
