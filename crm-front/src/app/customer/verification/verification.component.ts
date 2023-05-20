import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  token = '';
  load = true;
  message = '';


  constructor(
    private _route: ActivatedRoute,
    public customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.token = params['token']
        if (this.token) {
          this.load = true
          this.customerService.validateEmail(this.token).subscribe(response => {
            console.log(response)
            this.load = false
            if (response.data != undefined) {
              this.message = 'Account verified succesfully'
            } else {
              this.message = response.data
            }
          })
        }
      }
    )
  }

}
